using Data.Entities;

namespace Application.Services.Authentication
{
    public interface IUserService
    {
        Task<User> GetUser(Guid id, CancellationToken cancellationToken);
    }
}
