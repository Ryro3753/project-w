using API.Models.Login;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("UserUploadImage")]
        public async Task<bool> UserUploadImage(string Id)
        {
            var imageFilePath = Id + ".png";
            imageFilePath = Path.Combine(_userService.GetImageFolderPath(), imageFilePath);

            using var stream = System.IO.File.Create(imageFilePath);

            foreach (var item in Request.Form.Files)
            {
                await item.CopyToAsync(stream);
            }

            return await _userService.UpdateHasImage(Id);
        }

        [HttpGet("GetUser")]
        public async Task<User> GetUser(string Id)
        {
            return await _userService.GetUser(Id);
        }
    }
}
