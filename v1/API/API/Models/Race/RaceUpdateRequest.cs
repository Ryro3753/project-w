using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Race
{
    public class RaceUpdateRequest
    {
        public int RaceId { get; set; }
        public string Name { get; set; }
        public int Speed { get; set; }
        public string Size { get; set; }
        public string Description { get; set; }
        public List<Feature> Features { get; set; }
    }
}
