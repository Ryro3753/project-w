﻿using System.Collections.Generic;

namespace API.Models.Login
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
