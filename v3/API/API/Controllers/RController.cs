using Application.Services.Authentication;
using Data.Entities.Profile;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("R")]
    public class RController : Controller
    {
        IUserService _userService;
        public RController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Q")]
        public async Task<IEnumerable<User>> Q(CancellationToken cancellationToken)
        {
            return await _userService.GetAsync(cancellationToken);
        }
    }
}
