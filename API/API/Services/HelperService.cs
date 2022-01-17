using API.Models.Features;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IHelperService
    {
        Task<string> CheckUsernameReturnUserId(string username);
    }

    public class HelpterService : IHelperService
    {
        private readonly IDbConnection _connection;

        public HelpterService(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<string> CheckUsernameReturnUserId(string username)
        {
            var isValidUsername = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_checkvalidusername(@username)", new { username });
            if (!isValidUsername)
                throw new Exception("Invalid Username");

            var userId = await _connection.QueryFirstOrDefaultAsync<string>("Select * from public.fn_getuseridbyusername(@username)", new { username });
            if (userId == null)
                throw new Exception("Invalid Username");

            return userId;
        }
    }
}
