using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ResponseLoginDTO
    {
        public bool IsSuccess { get; set; } = false;
        public string? JwtToken { get; set; }
        public string? Message { get; set; }
    }
}
