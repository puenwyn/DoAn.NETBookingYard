using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Wishlist
    {
        public string? UserId { get; set; }
        public int? YardId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public Yard? Yard { get; set; }
    }
}
