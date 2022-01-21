namespace API.Models.Spell
{
    public class SpellUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Level { get; set; }
        public string School { get; set; }
        public string CastingType { get; set; }
        public string CastingTime { get; set; }
        public string CastingDescription { get; set; }
        public string Duration { get; set; }
        public string Components { get; set; }
        public string ComponentsDescription { get; set; }
        public string Range { get; set; }
        public bool Concentration { get; set; }
        public bool Ritual { get; set; }
        public int Mana { get; set; }
    }
}
