﻿using API.Models.Race;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IRaceService
    {
        Task<IEnumerable<Race>> GetAllRacesByUserId(string userId);
        Task<RaceDetail> GetRaceDetail(int raceId);
        Task<bool> UpdateRace(RaceUpdateRequest request);
        Task<Race> InsertRace(OnlyUserId request);
        Task<bool> UpdateHasImage(int raceId);
        string GetImageFolderPath();
    }

    public class RaceService : IRaceService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;
        private readonly IWebHostEnvironment _env;

        public RaceService(IDbConnection connection, IFeatureService featureService, IWebHostEnvironment env)
        {
            _connection = connection;
            _featureService = featureService;
            _env = env;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "RaceImages");
        }

        public async Task<IEnumerable<Race>> GetAllRacesByUserId(string userId)
        {
            var result = await _connection.QueryAsync<Race>("Select * from public.fn_getracesbyuserid(@userid)", new { userid = userId });
            return result;
        }

        public async Task<RaceDetail> GetRaceDetail(int raceId)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<RaceDetailQuery>("SELECT * from public.fn_getracedetails(@Id)", new { Id = raceId });
            if (data == null)
                return null;
            var result = new RaceDetail
            {
                RaceId = data.RaceId,
                Description = data.Description,
                Size = data.Size,
                Speed = data.Speed,
                Features = _featureService.ReadFeatures(data.Features)
            };
            return result;
        }

        public async Task<bool> UpdateRace(RaceUpdateRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_updaterace(@id,@name,@speed,@size,@description,@features)", new { 
                id = request.RaceId,
                name = request.Name,
                speed = request.Speed,
                size = request.Size,
                description = request.Description,
                features = _featureService.UnreadFeatures(request.Features)
            } );
        }

        public async Task<Race> InsertRace(OnlyUserId request)
        {
            return await _connection.QueryFirstOrDefaultAsync<Race>("SELECT * from public.fn_insertrace(@userid)",new { userid = request.UserId });
        }

        public async Task<bool> UpdateHasImage(int raceId)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("SELECT * from public.fn_updateracehasimage(@raceid, @hasimage)", new { raceid = raceId, hasimage = true });
        }
    }
}
