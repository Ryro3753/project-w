using System.Collections.Generic;

namespace API.Models.Login
{
    public class RaceDetailQuery
    {
        public int RaceId { get; set; }
        public string Description { get; set; }
        public int Speed { get; set; }
        public string Size { get; set; }
        public string Features { get; set; }

    }
}
