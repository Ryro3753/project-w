using Microsoft.AspNetCore.Diagnostics;

namespace API.Extensions
{
    public static class ExceptionDetailExtension
    {
        public static WebApplication UseExceptionDetailPlainer(this WebApplication webApp)
        {
            webApp.UseExceptionHandler(c => c.Run(async context =>
            {
                var exception = context.Features
                    .Get<IExceptionHandlerPathFeature>()
                    .Error;
                await context.Response.WriteAsJsonAsync(exception.Message);
            }));
            return webApp;
        }
    }
}