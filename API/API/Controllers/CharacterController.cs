using API.Models.Character;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
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

        [HttpPost("UpdateCharacterApperance")]
        public async Task<bool> UpdateCharacterApperance(UpdateCharacterApperanceRequest request)
        {
            return await _characterService.UpdateCharacterApperance(request);
        }

        [HttpPost("CharacterUploadImage")]
        public async Task<bool> CharacterUploadImage(int characterId)
        {
            var imageFilePath = characterId.ToString() + ".png";
            imageFilePath = Path.Combine(_characterService.GetImageFolderPath(), imageFilePath);

            using var stream = System.IO.File.Create(imageFilePath);

            foreach (var item in Request.Form.Files)
            {
                await item.CopyToAsync(stream);
            }

            return await _characterService.UpdateHasImage(characterId);
        }

        [HttpGet("GetCharacterDescription")]
        public async Task<CharacterDescription> GetCharacterDescription(int characterId)
        {
            return await _characterService.GetCharacterDescription(characterId);
        }

        [HttpPost("UpdateCharacterDescription")]
        public async Task<bool> UpdateCharacterDescription(CharacterDescription request)
        {
            return await _characterService.UpdateCharacterDescription(request);
        }

        [HttpGet("GetCharacterAbilities")]
        public async Task<IEnumerable<CharacterFeature>> GetCharacterAbilities(int characterId)
        {
            return await _characterService.GetCharacterAbilities(characterId);
        }

        [HttpPost("UpdateCharacterAbilities")]
        public async Task<bool> UpdateCharacterAbilities(UpdateCharacterAbilitiesRequest request)
        {
            return await _characterService.UpdateCharacterAbilities(request);
        }

        [HttpPost("InsertCharacterFeature")]
        public async Task<CharacterFeature> InsertCharacterFeature(InsertCharacterFeatureRequest request)
        {
            return await _characterService.InsertCharacterFeature(request);
        }

        [HttpPost("UpdateCharacterFeature")]
        public async Task<CharacterFeature> UpdateCharacterFeature(CharacterFeature request)
        {
            return await _characterService.UpdateCharacterFeature(request);
        }

        [HttpGet("GetCharacterFeatures")]
        public async Task<IEnumerable<CharacterFeature>> GetCharacterFeatures(int characterId, string note)
        {
            return await _characterService.GetCharacterFeatures(characterId, note);
        }

        [HttpDelete("DeleteCharacterFeatures")]
        public async Task<bool> DeleteCharacterFeatures(int featureId)
        {
            return await _characterService.DeleteCharacterFeatures(featureId);
        }

        [HttpGet("GetCharacters")]
        public async Task<IEnumerable<Character>> GetCharacters(string userId)
        {
            return await _characterService.GetCharacters(userId);
        }

    }
}
