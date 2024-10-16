﻿namespace BEBookingYard.DTO
{
    public class OwnerDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public short Gender { get; set; }
        public short IsLocked { get; set; }
    }
}
