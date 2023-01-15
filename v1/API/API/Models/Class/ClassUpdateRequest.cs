using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Class
{
    public class ClassUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string HitDie { get; set; }
        public string PrimaryAbility { get; set; }
        public string Saves { get; set; }
        public List<Feature> Features { get; set; }
    }
}
