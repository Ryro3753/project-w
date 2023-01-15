using System.ComponentModel.DataAnnotations;

namespace API.Models.Login
{
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

}