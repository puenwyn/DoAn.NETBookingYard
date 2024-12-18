using Domain.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Abstract
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(EmailSetting email, bool IsBodyHtml);
    }
}
