using API.Data;
using API.Middleware;

namespace API.Extensions
{
    public static class MiddlewareExtensions
    {
        public static WebApplication UseAllMiddlewares(this WebApplication webApp)
        {
            webApp.UseMiddleware<JwtMiddleware>();
            return webApp;
        }
    }
}