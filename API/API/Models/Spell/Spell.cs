namespace API.Models.Spell
{
    public class Spell
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string School { get; set; }
        public string CastingTime { get; set; }
        public bool Ritual { get; set; }
        public bool Concentration { get; set; }
        public string Username { get; set; }
    }
}
