﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class YardType : BaseEntity
    {
        public override int Id { get; set; }
        public string? Name { get; set; }
        public short? IsDelete { get; set; } = 0;
        [JsonIgnore]
        public ICollection<Yard>? Yards { get; set; }
    }
}