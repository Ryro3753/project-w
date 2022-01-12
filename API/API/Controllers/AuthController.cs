using API.Models.Login;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Authenticate")]
        public Task<AuthenticateResponse> Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            return response;
        }

        [HttpPost("Register")]
        public async Task<AuthenticateResponse> Register([FromBody] RegisterRequest request)
        {
            return await _authService.Register(request);
        }
    }
}
