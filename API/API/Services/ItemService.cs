using System.Data;
using System.Threading.Tasks;
using API.Models.Item;
using Dapper;

namespace API.Services
{
    public interface IItemService
    {
    }

    public class ItemService : IItemService
    {
        private readonly IDbConnection _connection;

        public ItemService(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<bool> GetItemsByUserId(string userId)
        {
            var result = await _connection.QueryAsync<ItemQuery>("", new { userid = userId });
            return true;
        }

    }
}
