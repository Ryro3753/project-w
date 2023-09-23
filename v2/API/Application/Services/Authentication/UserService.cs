using API.Data;
using Data.Attributes;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Authentication
{
    [Scoped]
    public class UserService : IUserService
    {
        AppDbContext _context;
        public UserService(AppDbContext context) {
            _context = context;
        }

        public async Task<User> GetUser(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Users.FirstOrDefaultAsync(i => i.Id == id, cancellationToken);
        }
    }
}
