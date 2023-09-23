using Data.Models.Authentication;

namespace Application.Services.Authentication
{
    public interface IAuthService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model, CancellationToken cancellationToken);
        Task<AuthenticateResponse> Register(RegisterRequest request, CancellationToken cancellationToken);
    }
}
