using API.Models.Features;

namespace API.Models.Character
{
    public class CharacterAbilities
    {
        public int CharacterId { get; set; }
        public Feature Ability { get; set; }

        public string Note { get; set; }

    }
}
