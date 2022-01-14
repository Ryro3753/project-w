using API.Models.Race;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RaceController : Controller
    {
        private readonly IRaceService _raceService;
        public RaceController(IRaceService raceService)
        {
            _raceService = raceService;
        }
        [HttpGet("GetAllRacesByUserId")]
        public async Task<IEnumerable<Race>> GetAllRacesByUserId(string userId)
        {
            return await _raceService.GetAllRacesByUserId(userId);
        }

        [HttpGet("GetRaceDetail")]
        public async Task<RaceDetail> GetRaceDetail(int raceId)
        {
            return await _raceService.GetRaceDetail(raceId);
        }
    }
}
