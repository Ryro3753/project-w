using Application.Services.Authentication;
using Data.Models.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("Authentication")]
    [AllowAnonymous]
    public class AuthenticationController : Controller
    {
        public IAuthService _authService { get; set; }
        public AuthenticationController(IAuthService authService) {
            _authService = authService;
        }

        [HttpPost("Register")]
        public async Task<AuthenticateResponse> Register(RegisterRequest request, CancellationToken cancellationToken)
        {
            return await _authService.Register(request, cancellationToken);
        }

        [HttpPost("Authenticate")]
        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request, CancellationToken cancellationToken)
        {
            return await _authService.Authenticate(request, cancellationToken);
        }
    }
}
