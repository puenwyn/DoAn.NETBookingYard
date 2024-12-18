using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Owner : BaseEntity
    {
        public override int Id { get; set; }
        public string? Username { get; set; }
        public string? HashedPassword { get; set; }
        public string? FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public short? Gender { get; set; }
        public short? IsLocked { get; set; } = 0;
        [JsonIgnore]
        public ICollection<Yard>? Yards { get; set; }
    }
}
