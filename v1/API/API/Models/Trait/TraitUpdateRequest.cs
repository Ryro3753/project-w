using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Trait
{
    public class TraitUpdateRequest
    {
        public int TraitId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Feature> Features { get; set; }
    }
}
