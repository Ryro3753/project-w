using DataLayer.Entities;

namespace Data.Entities.Profile
{
    public class User : EntityBase
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
    }
}
