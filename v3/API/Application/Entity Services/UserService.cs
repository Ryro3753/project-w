using Application.Services.Authentication;
using Data.Attributes;
using Data.Entities.Profile;
using Data.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Application.Entity_Services
{
    [Singleton]
    public class UserService : BaseEntityService<User>, IUserService
    {

        public UserService(IOptions<AppSettingsValues> appSettinValues) :base(appSettinValues, "Users")
        {

        }

        public async Task<bool> IsUsernameExistsAsync(string username, CancellationToken cancellationToken)
        {
            var user = await _collection.FindAsync(i => i.Username == username, null, cancellationToken);
            return await user.FirstOrDefaultAsync(cancellationToken) != null;
        }

        public async Task<bool> IsEmailExistsAsync(string email, CancellationToken cancellationToken)
        {
            var user = await _collection.FindAsync(i => i.Email == email, null, cancellationToken);
            return await user.FirstOrDefaultAsync(cancellationToken) != null;
        }

        public async Task<User?> FindByUsername(string username, CancellationToken cancellationToken)
        {
            var collection = await _collection.FindAsync(i => i.Username == username, null, cancellationToken);
            return await collection.FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<User?> FindByEmail(string email, CancellationToken cancellationToken)
        {
            var collection = await _collection.FindAsync(i => i.Email == email, null, cancellationToken);
            return await collection.FirstOrDefaultAsync(cancellationToken);
        }
    }
}
