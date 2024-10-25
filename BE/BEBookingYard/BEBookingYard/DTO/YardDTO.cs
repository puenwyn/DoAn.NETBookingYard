namespace BEBookingYard.DTO
{
    public class YardDTO
    {
        public int Id { get; set; }
        public int? YardType { get; set; }
        public string? Name { get; set; }
        public string? NameTransformed { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public int? Owner {  get; set; }
        //public int? Amenity { get; set; }
        public short isDelete { get; set; }


    }
}
