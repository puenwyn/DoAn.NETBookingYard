using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class AmenitiesOfYard
    {
        public int YardId { get; set; }
        public int AmenityId { get; set; }
        [JsonIgnore]
        public Yard? Yard { get; set; }
        [JsonIgnore]
        public Amenity? Amenity { get; set; }
    }
}
