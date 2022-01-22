namespace API.Models.Character
{
    public class CharacterBasics
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int ClassId { get; set; }
        public int RaceId { get; set; }
        public string Username { get; set; }
    }
}
