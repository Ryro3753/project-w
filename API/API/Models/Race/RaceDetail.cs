using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Race
{
    public class RaceDetail
    {
        public int RaceId { get; set; }
        public string Description { get; set; }
        public int Speed { get; set; }
        public string Size { get; set; }
        public IEnumerable<Feature> Features { get; set; }

    }
}
