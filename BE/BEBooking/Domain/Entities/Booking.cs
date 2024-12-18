using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Booking : BaseEntity
    {
        public override int Id { get; set; }
        public string? UserId { get; set; }
        public int? YardDetailId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? Status { get; set; }
        public string? Note { get; set; }
        public string? QRCode { get; set; }
        public short? IsDelete { get; set; } = 0;
        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public YardDetail? YardDetail { get; set; }
    }
}
