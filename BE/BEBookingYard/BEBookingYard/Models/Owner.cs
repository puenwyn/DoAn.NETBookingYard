using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("OWNERS")]
    public class Owner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, ErrorMessage = "Username can't be longer than 50 characters")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "HashedPassword is required")]
        public string? HashedPassword { get; set; }

        [Required(ErrorMessage = "FullName is required")]
        [StringLength(100, ErrorMessage = "FullName can't be longer than 100 characters")]
        public string? FullName { get; set; }
                               
        [Required(ErrorMessage = "DateOfBirth is required")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(500, ErrorMessage = "Address can't be longer than 500 characters")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required")]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "Invalid PhoneNumber")]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        [Range(0, 1, ErrorMessage = "Gender must be 0 or 1")]
        public short Gender { get; set; }

        [Required(ErrorMessage = "IsLocked is required")]
        [Range(0, 1, ErrorMessage = "IsLocked must be 0 or 1")]
        public short IsLocked { get; set; }

    }
}
