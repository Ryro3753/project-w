using API.Models.Common;
using API.Models.Features;
using API.Models.Trait;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITraitService
    {
        Task<IEnumerable<Trait>> GetAllTraitsByUserId(string userId);
        Task<TraitWithFeature> GetTrait(int traitId);
        Task<TraitWithFeature> InsertTrait(OnlyUserId request);
        Task<TraitWithFeature> UpdateTrait(TraitUpdateRequest request);
        Task<bool> ShareTrait(ShareRequest request);
        Task<bool> DeleteTrait(int TraitId, string UserId);
        Task<IEnumerable<TraitWithFeature>> GetTraitsWithDetails(string userId);
    }

    public class TraitService : ITraitService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;
        private readonly IHelperService _helperService;

        public TraitService(IDbConnection connection, IFeatureService featureService, IHelperService helperService)
        {
            _connection = connection;
            _featureService = featureService;
            _helperService = helperService;
        }

        public async Task<IEnumerable<Trait>> GetAllTraitsByUserId(string userId)
        {
            var result = await _connection.QueryAsync<Trait>("Select * from public.fn_gettraitsbyuserid(@userid)", new { userid = userId });
            return result;
        }

        public async Task<TraitWithFeature> GetTrait(int traitId)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<TraitQuery>("Select * from public.fn_gettrait(@traitid)", new { traitid = traitId });
            return new TraitWithFeature
            {
                Id = data.Id,
                Description = data.Description,
                Name = data.Name,
                Username = data.Username,
                Features = _featureService.ReadFeatures(data.Features)
            };
        }

        public async Task<TraitWithFeature> InsertTrait(OnlyUserId request)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<Trait>("Select * from public.fn_inserttrait(@userid)", new { userid = request.UserId });
            return new TraitWithFeature
            {
                Id = data.Id,
                Name = data.Name,
                Description = data.Description,
                Username = data.Username,
                Features = new List<Feature>()
            };
        }

        public async Task<TraitWithFeature> UpdateTrait(TraitUpdateRequest request)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<TraitQuery>("Select * from public.fn_updatetrait(@traitid,@newname,@newdescription,@newfeatures)",
                new { traitid = request.TraitId, newname = request.Name, newdescription = request.Description, newfeatures = _featureService.UnreadFeatures(request.Features) });
            return new TraitWithFeature
            {
                Id = data.Id,
                Name = data.Name,
                Description = data.Description,
                Username = data.Username,
                Features = _featureService.ReadFeatures(data.Features)
            };
        }

        public async Task<bool> ShareTrait(ShareRequest request)
        {
            var userId = await _helperService.CheckUsernameReturnUserId(request.Username);

            var shareTrait = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_sharetrait(@traitid, @userid)", new { traitid = request.ObjectId, userid = userId });
            if (!shareTrait)
                throw new Exception(String.Format("This trait already shared with {0}", request.Username));

            return shareTrait;
        }

        public async Task<bool> DeleteTrait(int TraitId, string UserId)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_deletetrait(@traitid, @userid)", new { traitid = TraitId, userid = UserId });
            if (!result)
                throw new Exception("You do not have permission to delete this trait");
            return result;
        }

        public async Task<IEnumerable<TraitWithFeature>> GetTraitsWithDetails(string userId)
        {
            var data = await _connection.QueryAsync<TraitQuery>("Select * from public.fn_gettraitsanddetailsbyuserid(@userid)", new { userid = userId });
            var returnData = new List<TraitWithFeature>();
            foreach (var item in data)
            {
                returnData.Add(new TraitWithFeature { Id = item.Id, Description = item.Description, Name = item.Name, Username = item.Username, Features = _featureService.ReadFeatures(item.Features)});
            }
            return returnData;
        }


    }
}
