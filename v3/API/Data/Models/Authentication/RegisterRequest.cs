using System.ComponentModel.DataAnnotations;

namespace Data.Models.Authentication
{
    public class RegisterRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
