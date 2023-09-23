using Data.Entities;

namespace Data.Models.Authentication
{
    public class AuthenticateResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            Email = user.Email;
            Username = user.Username;
            Token = token;
        }
    }
}
