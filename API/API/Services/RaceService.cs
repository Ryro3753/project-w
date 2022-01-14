﻿using API.Models.Race;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IRaceService
    {
        Task<IEnumerable<Race>> GetAllRacesByUserId(string userId);
        Task<RaceDetail> GetRaceDetail(int raceId);
    }

    public class RaceService : IRaceService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;

        public RaceService(IDbConnection connection, IFeatureService featureService)
        {
            _connection = connection;
            _featureService = featureService;
        }

        public async Task<IEnumerable<Race>> GetAllRacesByUserId(string userId)
        {
            return await _connection.QueryAsync<Race>("Select * from public.fn_getracesbyuserid(@userid)", new { userid = userId });
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
    }
}
