namespace Data.Models.Source
{
    public class Source
    {
        public string Section { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public string Note { get; set; }
        public List<SourceRequirement> Requirements { get; set; }
    }
}
