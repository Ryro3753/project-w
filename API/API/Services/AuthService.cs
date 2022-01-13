using API.Data;
using API.Models.Login;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IAuthService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
        Task<User> GetById(string id);
        Task<AuthenticateResponse> Register(RegisterRequest request);
    }

    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;
        private readonly IDbConnection _connection;

        public AuthService(IOptions<AppSettings> appSettings, IDbConnection connection)
        {
            _connection = connection;
            _appSettings = appSettings.Value;
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
        {
            var user = await _connection.QueryFirstOrDefaultAsync<User>("SELECT * from public.fn_getuserwithauth(@username)", new { username = request.Username });

            if (user == null) 
            {
                throw new Exception("Invalid Username");
            } 

            if(!HashPasswordComparison(request.Password, user.Password))
            {
                throw new Exception("Invalid Password");

            }

            var token = GenerateJwtToken(user);

            user.LastActive = DateTime.Now;

            await _connection.QueryAsync("Select * from fn_updateuserlastactive(@userId)", new { userId = user.Id });

            return new AuthenticateResponse(user, token);
        }

        public async Task<User> GetById(string Id)
        {
            return await _connection.QueryFirstOrDefaultAsync<User>("SELECT * from public.fn_getuser(@userid)", new { userid = Id });
        }

        public async Task<AuthenticateResponse> Register(RegisterRequest request)
        {
            var alreadyExists = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_checkuseralreadyexists(@username,@email)", new { username = request.Username, email = request.Email });
            if (alreadyExists)
                throw new Exception("This Email or Username already been taken.");


            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                Username = request.Username,
                Password = Hash(request.Password),
                CreatedDate = DateTime.Now,
                LastActive = DateTime.Now,
                HasImage = false
            };

            await _connection.QueryAsync("Select * from public.fn_register(@id,@username,@email,@password,@createddate,@lastactive,@hasimage", new
            {
                id = newUser.Id,
                username = newUser.Username,
                email = newUser.Email,
                password = newUser.Password,
                createddate = newUser.CreatedDate,
                lastactive = newUser.LastActive,
                hasimage = newUser.HasImage
            });

            var auth = await Authenticate(new AuthenticateRequest { Password = request.Password, Username = newUser.Username });

            return auth; 

        }

        private static string  Hash(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string hashedPassword = Convert.ToBase64String(hashBytes);

            return hashedPassword;
        }

        private static bool HashPasswordComparison(string enteredPassword, string storedPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(storedPassword);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    throw new UnauthorizedAccessException();
                }
            }
            return true;
        }
        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
