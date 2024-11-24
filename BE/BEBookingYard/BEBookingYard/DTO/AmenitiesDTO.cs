using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BEBookingYard.DTO
{
    [Table("AMENITIES")]
    public class AmenitiesDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? YardId { get; set; } // Dùng int? nếu nó có thể null
    }
}
