using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class YardDetail : BaseEntity
    {
        public override int Id { get; set; }
        public int? YardId { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public int? Capacity { get; set; }
        public float? Price { get; set; }
        public float? PricePeak { get; set; }
        public short? IsDelete { get; set; } = 0;
        [JsonIgnore]
        public Yard? Yard { get; set; }
        [JsonIgnore]
        public ICollection<Booking>? Bookings { get; set; }
    }
}
