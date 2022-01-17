using API.Models.Race;
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
    }

    public class TraitService : ITraitService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;

        public TraitService(IDbConnection connection, IFeatureService featureService)
        {
            _connection = connection;
            _featureService = featureService;
        }

        public async Task<IEnumerable<Trait>> GetAllTraitsByUserId(string userId)
        {
            var result = await _connection.QueryAsync<Trait>("Select * from public.fn_gettraitsbyuserid(@userid)", new { userid = userId });
            return result;
        }

    }
}
