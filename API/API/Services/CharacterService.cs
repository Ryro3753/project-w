using API.Models.Character;
using Dapper;
using System.Data;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ICharacterService
    {
        Task<CharacterBasics> GetCharacterCreationBasics(int characterId, string userId);
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
            return await _connection.QueryFirstOrDefaultAsync<CharacterBasics>("Select * from public.\"[CC]fn_getcharacterbasics\" ", new { characterid = characterId, userid = userId });
        }


    }
}
