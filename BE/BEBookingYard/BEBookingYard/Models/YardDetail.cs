using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace BEBookingYard.Models
{
    [Table("YARD_DETAIL")]
    public class YardDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int YardId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Location is required")]
        public string Location { get; set; }

        [StringLength(1024, ErrorMessage = "Description can't be longer than 1024 characters")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Capacity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Capacity must be greater than 0")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number")]
        public float Price { get; set; }

        [Required(ErrorMessage = "Price during peak hours is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price during peak hours must be a positive number")]
        public float PricePeak { get; set; }

        [Required(ErrorMessage = "IsDelete is required")]
        public short IsDelete { get; set; }

    }
}
