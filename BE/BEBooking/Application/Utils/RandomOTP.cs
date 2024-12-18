using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utils
{
    public class RandomOTP
    {
        public static string GenerateOTP ()
        {
            Random random = new();
            return random.Next(100000, 999999).ToString();
        }
    }
}
