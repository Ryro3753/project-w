using API.Models.Character;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ICharacterService
    {
        Task<CharacterBasics> GetCharacterCreationBasics(int characterId, string userId);
        Task<CharacterBasics> CreateCharacter(CharacterCreationRequest request);
        Task<bool> UpdateCharacter(UpdateCharacterRequest request);
        Task<CharacterApperance> GetCharacterApperance(int characterId);
        string GetImageFolderPath();
        Task<bool> UpdateHasImage(int characterId);
        Task<bool> UpdateCharacterApperance(UpdateCharacterApperanceRequest request);
        Task<CharacterDescription> GetCharacterDescription(int characterId);
        Task<bool> UpdateCharacterDescription(CharacterDescription request);
        Task<IEnumerable<CharacterFeature>> GetCharacterAbilities(int characterId);
        Task<bool> UpdateCharacterAbilities(UpdateCharacterAbilitiesRequest request);
        Task<CharacterFeature> InsertCharacterFeature(InsertCharacterFeatureRequest request);
        Task<CharacterFeature> UpdateCharacterFeature(CharacterFeature request);
        Task<IEnumerable<CharacterFeature>> GetCharacterFeatures(int characterId, string note);
    }

    public class CharacterService : ICharacterService
    {
        private readonly IDbConnection _connection;
        private readonly IWebHostEnvironment _env;
        private readonly IFeatureService _featureService;

        public CharacterService(IDbConnection connection, IWebHostEnvironment env, IFeatureService featureService)
        {
            _connection = connection;
            _env = env;
            _featureService = featureService;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "CharacterImages");
        }

        public async Task<CharacterBasics> GetCharacterCreationBasics(int characterId, string userId)
        {
            return await _connection.QueryFirstOrDefaultAsync<CharacterBasics>("Select * from public.\"[CC]fn_getcharacterbasics\"(@characterid,@userid) ", new { characterid = characterId, userid = userId });
        }

        public async Task<CharacterBasics> CreateCharacter(CharacterCreationRequest request)
        {
            return await _connection.QuerySingleOrDefaultAsync<CharacterBasics>("Select * from public.\"[CC]fn_createcharacter\"(@charactername,@characterclassid,@characterraceid,@userid)", 
                new {
                    charactername = request.Name,
                    characterclassid = request.ClassId,
                    characterraceid = request.RaceId,
                    userid = request.UserId 
                });
        }

        public async Task<bool> UpdateCharacter(UpdateCharacterRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.\"[CC]fn_updatecharacter\"(@characterid,@name,@classid,@raceid)",
                new
                {
                    characterid = request.CharacterId,
                    name = request.Name,
                    classid = request.ClassId,
                    raceid = request.RaceId,
                });
        }

        public async Task<CharacterApperance> GetCharacterApperance(int characterId)
        {
            return await _connection.QueryFirstOrDefaultAsync<CharacterApperance>("Select * from public.\"[CC]fn_getcharacterapperance\"(@id) ", new { id = characterId });
        }

        public async Task<bool> UpdateCharacterApperance(UpdateCharacterApperanceRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.\"[CC]fn_updatecharacterapperance\"(@characterid,@weight,@height,@gender,@age,@hair,@eyes,@skin,@note)",
                new
                {
                    characterid = request.CharacterId,
                    weight = request.Weight,
                    height = request.Height,
                    gender = request.Gender,
                    age = request.Age,
                    hair = request.Hair,
                    eyes = request.Eyes,
                    skin = request.Skin,
                    note = request.Note
                });
        }

        public async Task<bool> UpdateHasImage(int characterId)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("SELECT * from public.\"[CC]fn_updatecharacterhasimage\"(@characterid, @hasimage)", new { characterid = characterId, hasimage = true });
        }

        public async Task<CharacterDescription> GetCharacterDescription(int characterId)
        {
            return await _connection.QueryFirstOrDefaultAsync<CharacterDescription>("Select * from public.\"[CC]fn_getcharacterdescription\"(@id) ", new { id = characterId });
        }

        public async Task<bool> UpdateCharacterDescription(CharacterDescription request)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.\"[CC]fn_updatecharacterdescription\"(@characterid,@background,@alignment,@faith,@personalitytraits,@ideals,@bonds,@flaws,@organization,@allies,@enemies,@backstory,@note)",
                new
                {
                    characterid = request.CharacterId,
                    background = request.Background,
                    alignment = request.Alignment,
                    faith = request.Faith,
                    personalitytraits = request.PersonalityTraits,
                    ideals = request.Ideals,
                    bonds = request.Bonds,
                    flaws = request.Flaws,
                    organization = request.Organization,
                    allies = request.Allies,
                    enemies = request.Enemies,
                    backstory = request.Backstory,
                    note = request.Note

                });
        }

        public async Task<IEnumerable<CharacterFeature>> GetCharacterAbilities(int characterId)
        {
            var data = await _connection.QueryAsync<CharacterFeatureQuery>("Select * from public.\"[CC]fn_getcharacterabilities\"(@id)", new { id = characterId });
            var returnData = new List<CharacterFeature>();
            foreach (var item in data)
            {
                returnData.Add(new CharacterFeature { Id = item.Id ,CharacterId = item.CharacterId, Feature = _featureService.ReadFeature(item.Feature), Note = item.Note });
            }
            return returnData;
        }
        public async Task<bool> UpdateCharacterAbilities(UpdateCharacterAbilitiesRequest request)
        {
            var res = true;

            foreach (var item in request.CharacterAbilities)
            {
                var result = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.\"[CC]fn_updatecharacterability\"(@characterid, @feature, @note)",
                    new
                    {
                        characterid = item.CharacterId,
                        feature = _featureService.UnreadFeature(item.Feature),
                        note = item.Note
                    });
                if (!result)
                    res = false;
            }

            return res;
        }

        public async Task<CharacterFeature> InsertCharacterFeature(InsertCharacterFeatureRequest request)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<CharacterFeatureQuery>("Select * from public.\"[CC]fn_insertcharacterfeature\"(@newcharacterid, @newfeature, @newnote)",
                new
                {
                    newcharacterid = request.CharacterId,
                    newfeature = _featureService.UnreadFeature(request.Feature),
                    newnote = request.Note
                });
            return new CharacterFeature
            {
                Id = data.Id,
                CharacterId = data.CharacterId,
                Feature = _featureService.ReadFeature(data.Feature),
                Note = data.Note
            };
        }

        public async Task<CharacterFeature> UpdateCharacterFeature(CharacterFeature request)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<CharacterFeatureQuery>("Select * from public.\"[CC]fn_updatecharacterfeature\"(@existid, @newcharacterid, @newfeature, @newnote)",
                new
                {
                    existid = request.Id,
                    newcharacterid = request.CharacterId,
                    newfeature = _featureService.UnreadFeature(request.Feature),
                    newnote = request.Note
                });
            return new CharacterFeature
            {
                Id = data.Id,
                CharacterId = data.CharacterId,
                Feature = _featureService.ReadFeature(data.Feature),
                Note = data.Note
            };
        }

        public async Task<IEnumerable<CharacterFeature>> GetCharacterFeatures(int characterId, string note)
        {
            var data = await _connection.QueryAsync<CharacterFeatureQuery>("Select * from public.\"[CC]fn_getcharacterfeatures\"(@getnote,@id)", new { getnote = note, id = characterId });
            var returnData = new List<CharacterFeature>();
            foreach (var item in data)
            {
                returnData.Add(new CharacterFeature { Id = item.Id, CharacterId = item.CharacterId, Feature = _featureService.ReadFeature(item.Feature), Note = item.Note });
            }
            return returnData;
        }
    }
}
