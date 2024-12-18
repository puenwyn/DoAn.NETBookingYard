using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Rating : BaseEntity
    {
        public override int Id { get; set; }
        public string? UserId { get; set; }
        public int? YardId { get; set; }
        public int? RatingValue { get; set; }
        public string? Comment { get; set; }
        public int? RatingId { get; set; }
        public DateTime? CreateAt { get; set; }
        public short? IsDelete { get; set; } = 0;
        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public Yard? Yard { get; set; }
        [JsonIgnore]
        public Rating? RatingPrev { get; set; }
    }
}
