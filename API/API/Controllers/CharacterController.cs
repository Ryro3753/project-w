using API.Models.Character;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : Controller
    {
        private readonly ICharacterService _characterService;
        public CharacterController(ICharacterService characterService)
        {
            _characterService = characterService;
        }

        [HttpGet("GetCharacterCreationBasics")]
        public async Task<CharacterBasics> GetCharacterCreationBasics(int characterId, string userId)
        {
            return await _characterService.GetCharacterCreationBasics(characterId, userId);
        }

        [HttpPost("CreateCharacter")]
        public async Task<CharacterBasics> CreateCharacter(CharacterCreationRequest request)
        {
            return await _characterService.CreateCharacter(request);
        }

        [HttpPost("UpdateCharacter")]
        public async Task<bool> UpdateCharacter(UpdateCharacterRequest request)
        {
            return await _characterService.UpdateCharacter(request);
        }

        [HttpGet("GetCharacterApperance")]
        public async Task<CharacterApperance> GetCharacterApperance(int characterId)
        {
            return await _characterService.GetCharacterApperance(characterId);
        }

    }
}
