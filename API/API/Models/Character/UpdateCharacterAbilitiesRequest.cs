using System.Collections.Generic;

namespace API.Models.Character
{
    public class UpdateCharacterAbilitiesRequest
    {
        public List<CharacterAbilities> CharacterAbilities { get; set; }
    }
}
