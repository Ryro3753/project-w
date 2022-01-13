using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models.Login
{
    public class RaceDetail
    {
        public int RaceId { get; set; }
        public string Description { get; set; }
        public int Speed { get; set; }
        public string Size { get; set; }
        public string Features { get; set; }

    }
}
