using API.Data;
using API.Models.Login;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
        private readonly DataContext _context;

        public UserService(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "ProfileImages");
        }

        public async Task<bool> UpdateHasImage(string Id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == Id);
            user.HasImage = true;

            await _context.SaveChangesAsync();

            return user.HasImage;
        }

        public async Task<User> GetUser(string Id)
        {
            return await _context.Users.FirstOrDefaultAsync(i => i.Id == Id);
        }

    }
}
