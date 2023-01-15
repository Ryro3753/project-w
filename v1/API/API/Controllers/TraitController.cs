using API.Models.Common;
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

        [HttpGet("GetTrait")]
        public async Task<TraitWithFeature> GetTrait(int traitId)
        {
            return await _traitService.GetTrait(traitId);
        }

        [HttpPost("InsertTrait")]
        public async Task<TraitWithFeature> InsertTrait(OnlyUserId request)
        {
            return await _traitService.InsertTrait(request);
        }

        [HttpPost("UpdateTrait")]
        public async Task<TraitWithFeature> UpdateTrait(TraitUpdateRequest request)
        {
            return await _traitService.UpdateTrait(request);
        }

        [HttpPost("ShareTrait")]
        public async Task<bool> ShareTrait(ShareRequest request)
        {
            return await _traitService.ShareTrait(request);
        }

        [HttpDelete("DeleteTrait")]
        public async Task<bool> DeleteTrait(int TraitId, string UserId)
        {
            return await _traitService.DeleteTrait(TraitId, UserId);
        }

        [HttpGet("GetTraitsWithDetails")]
        public async Task<IEnumerable<TraitWithFeature>> GetTraitsWithDetails(string userId)
        {
            return await _traitService.GetTraitsWithDetails(userId);
        }

    }
}
