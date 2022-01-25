using API.Models.Character;
using Dapper;
using Microsoft.AspNetCore.Hosting;
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
    }

    public class CharacterService : ICharacterService
    {
        private readonly IDbConnection _connection;
        private readonly IWebHostEnvironment _env;

        public CharacterService(IDbConnection connection, IWebHostEnvironment env)
        {
            _connection = connection;
            _env = env;
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
            return await _connection.QueryFirstOrDefaultAsync<CharacterApperance>("Select * from public.\"[CC]fn_getcharacterapperance\"(@characterid) ", new { characterid = characterId });
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
    }
}
