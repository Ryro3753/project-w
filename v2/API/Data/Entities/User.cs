using Data.Attributes;
using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("User", Schema = "Account")]
    public class User : EntityBase
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime LastActive { get; set; } = DateTime.UtcNow;

    }
}
