using API.Models.Character;
using API.Models.CharacterSheet;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ICharacterSheetService
    {
        Task<CharacterAll> GetAll(int characterId);
        Task<bool> UpdateCharacterDetails(UpdateCharacterDetailRequest request);
    }

    public class CharacterSheetService : ICharacterSheetService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;
        private readonly ICharacterService _characterService;

        public CharacterSheetService(IDbConnection connection, IFeatureService featureService, ICharacterService characterService)
        {
            _connection = connection;
            _featureService = featureService;
            _characterService = characterService;
        }

        public async Task<CharacterAll> GetAll(int characterId)
        {
            var data = new CharacterAll
            {
                Apperance = await _characterService.GetCharacterApperance(characterId),
                Description = await _characterService.GetCharacterDescription(characterId),
                Features = await GetAllCharacterFeatures(characterId),
                Detail = await GetCharacterDetail(characterId),
                ClassColor = await GetCharacterClassColor(characterId)
            };

            return data;
        }

        public async Task<CharacterAllFeatures> GetAllCharacterFeatures(int characterId)
        {
            var data = new CharacterAllFeatures();

            var basicFeatures = await _connection.QueryFirstOrDefaultAsync<CharacterBasicFeaturesQuery>("Select * from public.\"[CS]fn_getcharacterraceandclassfeatures\"(@id)", new { id = characterId });

            data.ClassFeatures = _featureService.ReadFeatures(basicFeatures.ClassFeatures);
            data.RaceFeatures = _featureService.ReadFeatures(basicFeatures.RaceFeatures);
            data.CharacterFeatures =  await _characterService.GetCharacterFeatures(characterId, null);

            return data;
        }

        public async Task<CharacterDetail> GetCharacterDetail(int characterId)
        {
            return await _connection.QueryFirstOrDefaultAsync<CharacterDetail>("Select * from public.\"[CS]fn_getcharacterdetails\"(@id)", new { id = characterId });
        }

        public async Task<string> GetCharacterClassColor(int characterId)
        {
            return await _connection.QueryFirstOrDefaultAsync<string>("Select * from public.\"[CS]fn_getcharacterclasscolor\"(@id)", new { id = characterId });
        }

        public async Task<bool> UpdateCharacterDetails(UpdateCharacterDetailRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.\"[CS]fn_updatecharacterdetails\"(@characterid,@inspiration,@health,@tempHealth,@mana)",
                new {
                    characterid = request.CharacterId,
                    inspiration = request.Inspiration,
                    health = request.CurrentHealth,
                    tempHealth = request.CurrentTempHealth,
                    mana = request.CurrentMana
                });
        }
    }
}
