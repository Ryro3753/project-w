namespace Data.Models
{
    public class AppSettingsValues
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string JWTSecret { get; set; }
    }
}
