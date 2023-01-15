using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Character
{
    public class CharacterCreationRequest
    {
        public string Name { get; set; }
        public int ClassId { get; set; }
        public int RaceId { get; set; }
        public string UserId { get; set; }
    }
}
