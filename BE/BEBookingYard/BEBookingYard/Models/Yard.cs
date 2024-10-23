using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.Models
{
    [Table("YARDS")]
    public class Yard
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Yard type is required")]
        public int? YardType { get; set; }


        [Required(ErrorMessage = "Yard name is required")]
        [StringLength(50, ErrorMessage = "Yard name can't be longer than 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Yard name transfomed is required")]
        [StringLength(50, ErrorMessage = "Yard name transfomed can't be longer than 50 characters")]
        public string? NameTransformed { get; set; }

        //[Required(ErrorMessage = "Address is required")]
        [StringLength(50, ErrorMessage = "Address can't be longer than 50 characters")]
        public string? Address { get; set; }
        
        [StringLength(1024, ErrorMessage = "Description can't be longer than 1024 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Owner is required")]
        public int? Owner {  get; set; }

        //[Required(ErrorMessage = "Amenity is required")]
        //public int? Amenity { get; set; }

        [Required(ErrorMessage = "IsDelete is required")]
        [Range(0, 1, ErrorMessage = "IsDelete must be 0 or 1")]
        public short IsDelete { get; set; }
    }
}
