using API.Models.Common;
using API.Models.Spell;
using API.Models.Trait;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SpellController : Controller
    {
        private readonly ISpellService _spellService;
        public SpellController(ISpellService spellService)
        {
            _spellService = spellService;
        }

        [HttpGet("GetAllSpellsByUserId")]
        public async Task<IEnumerable<Spell>> GetAllSpellsByUserId(string userId)
        {
            return await _spellService.GetAllSpellsByUserId(userId);
        }

        [HttpGet("GetSpell")]
        public async Task<SpellDetail> GetSpell(int spellId, string userId)
        {
            return await _spellService.GetSpell(spellId, userId);
        }

        [HttpPost("InsertSpell")]
        public async Task<Spell> InsertSpell(OnlyUserId request)
        {
            return await _spellService.InsertSpell(request);
        }

        [HttpPost("UpdateSpell")]
        public async Task<SpellDetail> UpdateSpell(SpellUpdateRequest request)
        {
            return await _spellService.UpdateSpell(request);
        }

        [HttpPost("ShareSpell")]
        public async Task<bool> ShareSpell(ShareRequest request)
        {
            return await _spellService.ShareSpell(request);
        }

        [HttpDelete("DeleteSpell")]
        public async Task<bool> DeleteSpell(int SpellId, string UserId)
        {
            return await _spellService.DeleteSpell(SpellId, UserId);
        }



    }
}
