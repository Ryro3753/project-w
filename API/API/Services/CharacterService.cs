using API.Models.Character;
using Dapper;
using System.Data;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ICharacterService
    {
        Task<CharacterBasics> GetCharacterCreationBasics(int characterId, string userId);
        Task<CharacterBasics> CreateCharacter(CharacterCreationRequest request);
        Task<bool> UpdateCharacter(UpdateCharacterRequest request);
    }

    public class CharacterService : ICharacterService
    {
        private readonly IDbConnection _connection;

        public CharacterService(IDbConnection connection)
        {
            _connection = connection;
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
            return await _connection.QuerySingleOrDefaultAsync<bool>("Select * from public.\"[CC]fn_updatecharacter\"(@characterid,@name,@classid,@raceid)",
                new
                {
                    characterid = request.CharacterId,
                    name = request.Name,
                    classid = request.ClassId,
                    raceid = request.RaceId,
                });
        }


    }
}
