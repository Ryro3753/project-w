namespace API.Models.Character
{
    public class CharacterApperance
    {
        public int CharacterId { get; set; }
        public string Gender { get; set; }
        public string Eyes { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public string Hair { get; set; }
        public string Skin { get; set; }
        public string Age { get; set; }
        public string Note { get; set; }
        public bool HasImage { get; set; }
    }
}
