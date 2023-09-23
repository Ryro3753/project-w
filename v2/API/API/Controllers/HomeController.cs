using API.Data;
using Data.Attributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("R")]
    public class HomeController : Controller
    {
        AppDbContext _context;
        public HomeController(AppDbContext dbContext)
        {
            _context = dbContext;
        }

        [Authorize]
        [HttpGet]
        public void z()
        {
            var z = _context.Users.ToList();
        }
    }
}
