using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class YardImage : BaseEntity
    {
        public override int Id { get; set; }
        public int? YardId { get; set; }
        public byte[]? ImageURL { get; set; }
        [JsonIgnore]
        public Yard? Yard { get; set; }
    }
}
