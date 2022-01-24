namespace API.Models.Character
{
    public class UpdateCharacterRequest
    {
        public int CharacterId { get; set; }
        public string Name { get; set; }
        public int ClassId { get; set; }
        public int RaceId { get; set; }
    }
}
