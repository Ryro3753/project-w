using API.Models.Character;
using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.CharacterSheet
{
    public class CharacterAll
    {
        public CharacterDetail Detail { get; set; }
        public CharacterApperance Apperance { get; set; }
        public CharacterDescription Description { get; set; }
        public CharacterAllFeatures Features { get; set; }
    }
}
