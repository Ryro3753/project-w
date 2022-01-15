using API.Models.Login;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IUserService
    {
        string GetImageFolderPath();
        Task<bool> UpdateHasImage(string Id);
        Task<User> GetUser(string Id);
    }

    public class UserService : IUserService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IDbConnection _connection;

        public UserService(IDbConnection connection, IWebHostEnvironment env)
        {
            _connection = connection;
            _env = env;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "ProfileImages");
        }

        public async Task<bool> UpdateHasImage(string Id)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("SELECT * from public.fn_getuser(@userid, @hasimage)", new { userid = Id, hasimage = true });
        }

        public async Task<User> GetUser(string Id)
         {
            var result = await _connection.QueryFirstOrDefaultAsync<User>("SELECT * from public.fn_getuser(@userid)", new { userid = Id });
            return result;
        }

    }
}
