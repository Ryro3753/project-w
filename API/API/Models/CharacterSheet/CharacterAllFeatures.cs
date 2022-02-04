using API.Models.Character;
using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.CharacterSheet
{
    public class CharacterAllFeatures
    {
        public IEnumerable<Feature> RaceFeatures { get; set; }
        public IEnumerable<Feature> ClassFeatures { get; set; }
        public IEnumerable<CharacterFeature> CharacterFeatures { get; set; }

    }
}
