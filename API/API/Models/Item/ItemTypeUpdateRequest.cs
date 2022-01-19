using API.Models.Features;
using System.Collections.Generic;

namespace API.Models.Item
{
    public class ItemTypeUpdateRequest
    {
        public int ItemTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public bool Equippable { get; set; }
        public string Tags { get; set; }
        public bool HasIamge { get; set; }
        public List<Feature> Features { get; set; }
        public List<ItemAttribute> Attributes { get; set; }
    }
}
