using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISendEmailService
    {
        Task<string> SendOtp(string email);
        Task<string> VerifyOtp(string email, string otp);
    }
}
