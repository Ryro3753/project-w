using System.ComponentModel.DataAnnotations;

namespace DataLayer.Entities
{
    public abstract class EntityBase
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
