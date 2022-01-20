namespace API.Models.Class
{
    public class ClassDetailQuery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string HitDie { get; set; }
        public string PrimaryAbility { get; set; }
        public string Saves { get; set; }
        public string Features { get; set; }
        public bool HasImage { get; set; }
        public string Username { get; set; }
    }
}
