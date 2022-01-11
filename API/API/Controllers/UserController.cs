using API.Models.Login;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost("Authenticate")]
        public Task<AuthenticateResponse> Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            return response;
        }

        [HttpPost("Register")]
        public async Task<AuthenticateResponse> Register([FromBody] RegisterRequest request)
        {
            return await _userService.Register(request);
        }

    }
}
