using API.Models.Trait;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TraitController : Controller
    {
        private readonly ITraitService _traitService;
        public TraitController(ITraitService traitService)
        {
            _traitService = traitService;
        }
        [HttpGet("GetAllTraitsByUserId")]
        public async Task<IEnumerable<Trait>> GetAllTraitsByUserId(string userId)
        {
            return await _traitService.GetAllTraitsByUserId(userId);
        }

        
    }
}
