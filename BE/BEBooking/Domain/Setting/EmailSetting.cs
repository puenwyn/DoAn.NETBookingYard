using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Setting
{
    public class EmailSetting
    {
        // Địa chỉ người nhận
        public string To { get; set; }
        // Tên người nhận
        public string Name { get; set; }
        // Tiêu đề
        public string Subject { get; set; }
        // Nội dung
        public string Content { get; set; }
        public List<string> CC { get; set; } = new List<string>();
        public List<string> AttachmentFiles { get; set; } = new List<string>();
    }
}
