namespace API.Models.Character
{
    public class CharacterFeatureQuery
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public string Feature { get; set; }
        public string Note { get; set; }
    }
}
