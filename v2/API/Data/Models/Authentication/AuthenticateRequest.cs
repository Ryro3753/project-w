using System.ComponentModel.DataAnnotations;

namespace Data.Models.Authentication
{
    public class AuthenticateRequest
    {
        [Required]
        public string UsernameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }

    }

}