using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Application.DTOs.UserDTOs
{
    public class UserResponseDTO
    {

        public string Username { get; set; }

        public string HashedPassword { get; set; }

        public string Email { get; set; } 

        public string PhoneNumber { get; set; } 

        public string FcmToken { get; set; }

        public string FullName { get; set; } 

        public DateTime DateOfBirth { get; set; } 

        public short Gender { get; set; }

        public string Address { get; set; } 
    }
}
