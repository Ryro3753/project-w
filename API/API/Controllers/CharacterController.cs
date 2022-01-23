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


    }
}
