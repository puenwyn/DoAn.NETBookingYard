using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Payment : BaseEntity
    {
        public override int Id { get; set; }
        public string? BookingIds { get; set; }
        public string? PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }
        public int? VoucherId { get; set; }
        public float Total { get; set; }
        public short? IsDelete { get; set; } = 0;
        [JsonIgnore]
        public Voucher? Voucher { get; set; }
    }
}
