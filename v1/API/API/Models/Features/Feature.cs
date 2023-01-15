using System.Collections.Generic;

namespace API.Models.Features
{
    public class Feature
    {
        public string Section { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public string Note { get; set; }
        public List<Requirement> Requirements { get; set; }
    }
}
