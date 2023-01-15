using System.Collections.Generic;

namespace API.Models.Character
{
    public class UpdateCharacterAbilitiesRequest
    {
        public List<CharacterFeature> CharacterAbilities { get; set; }
    }
}
