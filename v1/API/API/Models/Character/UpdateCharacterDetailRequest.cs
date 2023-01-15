namespace API.Models.Character
{
    public class UpdateCharacterDetailRequest
    {
        public int CharacterId { get; set; }
        public bool Inspiration { get; set; }
        public int CurrentHealth { get; set; }
        public int CurrentMana { get; set; }
        public int CurrentTempHealth { get; set; }
    }
}
