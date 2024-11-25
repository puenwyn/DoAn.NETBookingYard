using BEBookingYard.Data;
using BEBookingYard.DTO;
using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BEBookingYard.Repositories
{
    public interface IYardRepository
    {
        IEnumerable<YardDTO> GetAll();
        YardDTO GetYardById(int id);
        void AddYard(Yard yard);
        void UpdateYard(YardDTO yardDTO);
        void DeleteYard(int id);
        void AddYardDetail(YardDetail yardDetail);
        public void AddYardImage(YardImage yardImage);
        public void DeleteYardImage(int imageId);
        void UpdateYardDetail(YardDetailDTO yardDetailDTO);
        void DeleteYardDetail(int id);
        IEnumerable<YardDetail> GetYardDetailsByYardId(int yardId); 
    }

    public class YardRepository : IYardRepository
    {
        private readonly YardContext _yardContext;

        public YardRepository(YardContext yardContext)
        {
            _yardContext = yardContext;
        }

        public IEnumerable<YardDetail> GetYardDetailsByYardId(int yardId)
        {
            return _yardContext.YardDetail.Where(y => y.YardId == yardId).ToList();
        }
        public void AddYard(Yard yard)
        {
            // Kiểm tra nếu tên sân đã tồn tại
            if (_yardContext.Yards.Any(x => x.Name == yard.Name))
            {
                throw new Exception("Yard name already exists");
            }
            _yardContext.Yards.Add(yard);
            _yardContext.SaveChanges();
        }

        public void AddYardImage(YardImage yardImage)
        {
            _yardContext.YardImage.Add(yardImage);
            _yardContext.SaveChanges();
        }

        public void DeleteYardImage(int imageId)
        {
            var existingImage = _yardContext.YardImage.FirstOrDefault(x => x.Id == imageId);
            if (existingImage == null)
            {
                throw new InvalidOperationException("Yard image not found");
            }

            // Optionally, you can delete the physical file from the server if needed
            var filePath = Path.Combine("wwwroot/images", existingImage.ImageURL);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _yardContext.YardImage.Remove(existingImage);
            _yardContext.SaveChanges();
        }

        public void AddYardDetail(YardDetail yardDetail)
        {
            _yardContext.YardDetail.Add(yardDetail);
            _yardContext.SaveChanges();
        }

        public void UpdateYardDetail(YardDetailDTO yardDetailDTO)
        {
            var existingYardDetail = _yardContext.YardDetail.FirstOrDefault(x => x.Id == yardDetailDTO.Id);
            if (existingYardDetail == null)
            {
                throw new InvalidOperationException("Yard detail not found");
            }

            // Update properties
            existingYardDetail.YardId = yardDetailDTO.YardId; // Assuming YardId is part of the DTO
            existingYardDetail.Name = yardDetailDTO.Name;
            existingYardDetail.Location = yardDetailDTO.Location;
            existingYardDetail.Description = yardDetailDTO.Description;
            existingYardDetail.Capacity = yardDetailDTO.Capacity;
            existingYardDetail.Price = yardDetailDTO.Price;
            existingYardDetail.PricePeak = yardDetailDTO.PricePeak;
            existingYardDetail.IsDelete = yardDetailDTO.IsDelete;

            _yardContext.SaveChanges(); // Save changes to the database
        }

        public void DeleteYardDetail(int id)
        {
            var existingYardDetail = _yardContext.YardDetail.FirstOrDefault(x => x.Id == id);
            if (existingYardDetail == null)
            {
                throw new InvalidOperationException("Yard detail not found");
            }

            // Set IsDelete to 1 to mark as deleted
            existingYardDetail.IsDelete = 1;
            _yardContext.SaveChanges();
        }

        public IEnumerable<YardDTO> GetAll()
        {
                return _yardContext.Yards
                .Where(y => y.IsDelete == 0)  // Lọc các yard không bị xóa
                .Include(y => y.YardImages) // Tải hình ảnh liên quan
                .Include(y => y.Amenities) // Tải tiện nghi liên quan
                .Include(y => y.Ratings) // Tải đánh giá liên quan nếu cần
                 .Include(y => y.Details)
                .Select(yard => new YardDTO
                {
                    Id = yard.Id,
                    YardType = yard.YardType,
                    Name = yard.Name,
                    NameTransformed = yard.NameTransformed,
                    Address = yard.Address,
                    Description = yard.Description,
                    //IsDelete = yard.IsDelete,
                    
                    YardImages = yard.YardImages.Select(img => img.ImageURL).ToList(),
                    Ratings = yard.Ratings.Select(r => new RatingDTO
                    {
                        Comment = r.Comment,
                    }).ToList(),
                    //Amenities = yard.Amenities.Select(a => new AmenitiesDTO
                    //{
                    //    Id = a.Id,
                    //    Name = a.Name
                    //}).ToList(), // Thêm tiện nghi vào DTO
                    Details = yard.Details.Select(r => new YardDetailDTO
                    {   
                        YardId = r.YardId,
                        Name = r.Name,
                        Location = r.Location,
                        Description = r.Description,
                        Capacity = r.Capacity,
                        Price = r.Price,
                        PricePeak = r.PricePeak,
                    }).ToList(),
                }).ToList();
        }


        public YardDTO? GetYardById(int id)
        {
            var yard = _yardContext.Yards.FirstOrDefault(x => x.Id == id);
            if (yard == null)
            {
                return null;
            }
            return new YardDTO
            {
                Id = yard.Id,
                YardType = yard.YardType,
                Name = yard.Name,
                Address = yard.Address,
                Description = yard.Description,
               
                //IsDelete = yard.IsDelete
            };
        }


        public void UpdateYard(YardDTO yardDTO)
        {
            var existingYard = _yardContext.Yards.FirstOrDefault(x => x.Id == yardDTO.Id);
            if (existingYard == null)
            {
                throw new InvalidOperationException("Yard not found");
            }
            existingYard.YardType = yardDTO.YardType;
            existingYard.Name = yardDTO.Name;
            existingYard.Address = yardDTO.Address;
            existingYard.Description = yardDTO.Description;
            //existingYard.IsDelete = yardDTO.IsDelete;

            _yardContext.SaveChanges();
        }

        public void DeleteYard(int id)
        {
            var yard = _yardContext.Yards.FirstOrDefault(x => x.Id == id);
            if (yard == null)
            {
                throw new InvalidOperationException("Yard not found");
            }
            _yardContext.Yards.Remove(yard);
            _yardContext.SaveChanges();
        }
    }
}
