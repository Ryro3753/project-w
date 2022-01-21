using API.Models.Class;
using API.Models.Common;
using API.Models.Race;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IClassService
    {
        Task<IEnumerable<CharacterClass>> GetAllClassesByUserId(string userId);
        Task<ClassDetail> GetClassDetail(int classId);
        Task<bool> UpdateClass(ClassUpdateRequest request);
        Task<CharacterClass> InsertClass(OnlyUserId request);
        Task<bool> UpdateHasImage(int classId);
        string GetImageFolderPath();
        Task<bool> ShareClass(ShareRequest request);
        Task<bool> DeleteClass(int ClassId, string UserId);
    }

    public class ClassService : IClassService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;
        private readonly IWebHostEnvironment _env;
        private readonly IHelperService _helperService;

        public ClassService(IDbConnection connection, IFeatureService featureService, IWebHostEnvironment env, IHelperService helperService)
        {
            _connection = connection;
            _featureService = featureService;
            _env = env;
            _helperService = helperService;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "ClassImages");
        }

        public async Task<IEnumerable<CharacterClass>> GetAllClassesByUserId(string userId)
        {
            var result = await _connection.QueryAsync<CharacterClass>("Select * from public.fn_getclassesbyuserid(@userid)", new { userid = userId });
            return result;
        }

        public async Task<ClassDetail> GetClassDetail(int classId)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<ClassDetailQuery>("SELECT * from public.fn_getclass(@Id)", new { Id = classId });
            if (data == null)
                return null;
            var result = new ClassDetail
            {
                Id = data.Id,
                Name = data.Name,
                Description = data.Description,
                Color = data.Color,
                HitDie = data.HitDie,
                HasImage = data.HasImage,
                PrimaryAbility = data.PrimaryAbility,
                Saves = data.Saves,
                Username = data.Username,
                Features = _featureService.ReadFeatures(data.Features)
            };
            return result;
        }

        public async Task<bool> UpdateClass(ClassUpdateRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_updateclass(@classid,@newname,@newdescription,@newcolor,@newhitdie,@newprimaryability,@newsaves,@newfeatures)", new {
                classid = request.Id,
                newname = request.Name,
                newdescription = request.Description,
                newcolor = request.Color,
                newhitdie = request.HitDie,
                newprimaryability = request.PrimaryAbility,
                newsaves = request.Saves,
                newfeatures = _featureService.UnreadFeatures(request.Features)
            } );
        }

        public async Task<CharacterClass> InsertClass(OnlyUserId request)
        {
            return await _connection.QueryFirstOrDefaultAsync<CharacterClass>("SELECT * from public.fn_insertclass(@userid)",new { userid = request.UserId });
        }

        public async Task<bool> UpdateHasImage(int classId)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("SELECT * from public.fn_updateclasshasimage(@classid, @hasimage)", new { classid = classId, hasimage = true });
        }

        public async Task<bool> ShareClass(ShareRequest request)
        {
            var userId = await _helperService.CheckUsernameReturnUserId(request.Username);

            var shareClass = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_shareclass(@classid, @userid)", new { classid = request.ObjectId, userid = userId });
            if (!shareClass)
                throw new Exception(String.Format("This class already shared with {0}", request.Username));

            return shareClass;
        }

        public async Task<bool> DeleteClass(int ClassId, string UserId)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_deleteclass(@classid, @userid)", new { classid = ClassId, userid = UserId });
            if (!result)
                throw new Exception("You do not have permission to delete this class");
            return result;
        }

    }
}
