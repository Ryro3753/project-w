namespace API.Models.Item
{
    public class ItemTypeDetailQuery
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public bool Equippable { get; set; }
        public string Tags { get; set; }
        public bool HasImage { get; set; }
        public string Username { get; set; }
        public string Features { get; set; }
        public string Attributes { get; set; }
    }
}
