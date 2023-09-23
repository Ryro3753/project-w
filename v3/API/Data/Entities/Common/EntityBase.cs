using MongoDB.Bson.Serialization.Attributes;

namespace DataLayer.Entities
{
    public abstract class EntityBase
    {
        [BsonId]
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
