using API.Data;
using API.Models.Login;
using Dapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IRaceService
    {
        Task<IEnumerable<Race>> GetAllRacesByUserId(string userId);
    }

    public class RaceService : IRaceService
    {
        private readonly IDbConnection _connection;

        public RaceService(IDbConnection connection)
        {
            _connection = connection;

        }

        public async Task<IEnumerable<Race>> GetAllRacesByUserId(string userId)
        {
            return await _connection.QueryAsync<Race>("Select * from public.fn_getracesbyuserid(@userid)", new { userid = userId });
        }
    }
}
