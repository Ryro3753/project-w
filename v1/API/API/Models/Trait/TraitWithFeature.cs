using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Trait
{
    public class TraitWithFeature
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Username { get; set; }
        public IEnumerable<Feature> Features { get; set; }
    }
}
