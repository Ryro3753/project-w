namespace API.Extensions
{
    public static class CorsExtension
    {
        public static IServiceCollection AddCorsDetails(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            return services;
        }
    }
}