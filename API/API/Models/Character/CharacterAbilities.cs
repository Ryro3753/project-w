using API.Models.Features;

namespace API.Models.Character
{
    public class CharacterFeature
    {
        public int CharacterId { get; set; }
        public Feature Feature { get; set; }

        public string Note { get; set; }

    }
}
