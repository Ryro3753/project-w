using Data.Models;

namespace API.Extensions
{
    public static class AppSettings
    {
        public static WebApplicationBuilder AddAppSettingsValues(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<AppSettingsValues>(builder.Configuration.GetSection("AppValues"));
            builder.Services.AddOptions();
            return builder;
        }
    }
}