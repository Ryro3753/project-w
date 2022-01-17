using API.Models.Race;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
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

        [HttpPost("UpdateRace")]
        public async Task<bool> UpdateRace(RaceUpdateRequest request)
        {
            return await _raceService.UpdateRace(request);
        }

        [HttpPost("InsertRace")]
        public async Task<Race> InsertRace(OnlyUserId request)
        {
            return await _raceService.InsertRace(request);
        }

        [HttpPost("RaceUploadImage")]
        public async Task<bool> RaceUploadImage(int raceId)
        {
            var imageFilePath = raceId.ToString() + ".png";
            imageFilePath = Path.Combine(_raceService.GetImageFolderPath(), imageFilePath);

            using var stream = System.IO.File.Create(imageFilePath);

            foreach (var item in Request.Form.Files)
            {
                await item.CopyToAsync(stream);
            }

            return await _raceService.UpdateHasImage(raceId);
        }

        [HttpPost("ShareRace")]
        public async Task<bool> ShareRace([FromBody] ShareRequest request)
        {
            return await _raceService.ShareRace(request);
        }

        [HttpDelete("DeleteRace")]
        public async Task<bool> DeleteRace(int RaceId, string UserId)
        {
            return await _raceService.DeleteRace(RaceId,  UserId );
        }
        
    }
}
