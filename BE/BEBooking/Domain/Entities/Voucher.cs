using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Voucher : BaseEntity
    {
        public override int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public float Discount { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public short? IsDelete { get; set; } = 0;
    }
}
