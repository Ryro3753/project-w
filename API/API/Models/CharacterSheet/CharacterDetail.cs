namespace API.Models.CharacterSheet
{
    public class CharacterDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public string Class { get; set; }
        public string Race { get; set; }
        public bool Inspiration { get; set; }
        public int CurrentHealth { get; set; }
        public int CurrentMana { get; set; }
        public int CurrentTempHealth { get; set; }
    }
}
