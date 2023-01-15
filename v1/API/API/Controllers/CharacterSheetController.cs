using API.Models.Character;
using API.Models.CharacterSheet;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterSheetController : Controller
    {
        private readonly ICharacterSheetService _characterSheetService;
        public CharacterSheetController(ICharacterSheetService characterSheetService)
        {
            _characterSheetService = characterSheetService;
        }

       [AllowAnonymous]
       [HttpGet("GetAll")]
       public async Task<CharacterAll> GetAll(int characterId)
       {
            return await _characterSheetService.GetAll(characterId);
       }
       [HttpPost("UpdateCharacterDetails")]
        public async Task<bool> UpdateCharacterDetails([FromBody] UpdateCharacterDetailRequest request)
        {
            return await _characterSheetService.UpdateCharacterDetails(request);
        }

    }
}
