using Data.Entities.Profile;

namespace Application.Services.Authentication
{
    public interface IUserService : IBaseEntityService<User>
    {
        Task<bool> IsUsernameExistsAsync(string username, CancellationToken cancellationToken);
        Task<bool> IsEmailExistsAsync(string email, CancellationToken cancellationToken);
        Task<User?> FindByUsername(string username, CancellationToken cancellationToken);
        Task<User?> FindByEmail(string email, CancellationToken cancellationToken);
    }
}
