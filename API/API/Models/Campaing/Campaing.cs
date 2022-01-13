using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models.Login
{
    [Table("tb_Campaign")]
    public class Campaign
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsOver { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedUserId { get; set; }


    }
}
