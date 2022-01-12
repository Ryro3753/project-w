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
            var qq = await _context.Users.FirstOrDefaultAsync(i => i.Id == "dfd6d48c-5fe8-4d9e-afa8-d02fc865dcb0");
            var qqq = _context.Campaigns;
            var t = _context.Users.Join(_context.Campaigns, user => user.Id, c => c.CreatedUserId, (user, c) => new
            {
                userId = c.CreatedUserId,
                userName = user.Username,
                campaignName = c.Name
            }).Select(x => new Za {
                userId = x.userId,
                userName = x.userName,
                campaignName = x.campaignName
            }).ToList();
            var z = t;
            return await _context.Users.FirstOrDefaultAsync(i => i.Id == Id);
        }

    }

    public class Za
    {
        public string userId { get; set; }
        public string userName { get; set; }
        public string campaignName { get; set; }
    }
}
