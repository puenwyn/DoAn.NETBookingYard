using BEBookingYard.Data;
using BEBookingYard.DTO;
using BEBookingYard.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace BEBookingYard.Repositories
{
    public interface IYardDetailRepository
    {
        YardDetailDTO GetYardDetailById(int id);
        IEnumerable<YardDetailDTO> GetAllYardDetails();
        void AddYardDetail(YardDetail yardDetail);
        void UpdateYardDetail(YardDetailDTO yardDetailDTO);
        void DeleteYardDetail(int id);
    }

    public class YardDetailRepository : IYardDetailRepository
    {
        private readonly ApplicationContext _applicationContext;

        public YardDetailRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public YardDetailDTO GetYardDetailById(int id)
        {
            var yardDetail = _applicationContext.YardDetails.FirstOrDefault(y => y.Id == id);

            if (yardDetail == null)
            {
                return null; // hoặc ném ra ngoại lệ tùy vào yêu cầu của bạn
            }

            return new YardDetailDTO
            {
                Id = yardDetail.Id,
                YardId = yardDetail.YardId,
                Name = yardDetail.Name,
                Location = yardDetail.Location,
                Description = yardDetail.Description,
                Capacity = yardDetail.Capacity,
                Price = yardDetail.Price,
                PricePeak = yardDetail.PricePeak,
                IsDelete = yardDetail.IsDelete
            };
        }

        public IEnumerable<YardDetailDTO> GetAllYardDetails()
        {
            return _applicationContext.YardDetails
                .Where(y => y.IsDelete == 0)
                .Include(y => y.YardImages)
                .Include(y => y.Amenities)
                .Include(y => y.Ratings)
                .Select(yard => new YardDetailDTO
                {
                    Id = yard.Id,
                    YardId = yard.YardId,
                    Name = yard.Name,
                    NameWithoutAccents = RemoveDiacritics(yard.Name),
                    Location = yard.Location,
                    Description = yard.Description,
                    Capacity = yard.Capacity,
                    Price = yard.Price,
                    PricePeak = yard.PricePeak,
                    //IsDelete = yard.IsDelete,
                    YardImages = yard.YardImages.Select(img => img.ImageURL).ToList(),
                    //Amenities = yard.Amenities.Select(a => a.Name).ToList(),
                    Ratings = yard.Ratings.Select(r => new RatingDTO
                    {
                        UserId = r.UserId,
                        Yard = r.Yard,
                        CreateAt = DateTime.UtcNow,
                        Comment = r.Comment,
                    }).ToList()

                }).ToList();
        }
        private static string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(NormalizationForm.FormD);
            var stringBuilder = new StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        }
        public void AddYardDetail(YardDetail yardDetail)
        {
            var newYardDetail = new YardDetail
            {
                YardId = yardDetail.YardId,
                Name = yardDetail.Name,
                Location = yardDetail.Location,
                Description = yardDetail.Description,
                Capacity = yardDetail.Capacity,
                Price = yardDetail.Price,
                PricePeak = yardDetail.PricePeak,
                IsDelete = yardDetail.IsDelete
            };
            _applicationContext.YardDetails.Add(newYardDetail);
            _applicationContext.SaveChanges();
        }

        public void UpdateYardDetail(YardDetailDTO yardDetailDTO)
        {
            var existingYardDetail = _applicationContext.YardDetails.FirstOrDefault(y => y.Id == yardDetailDTO.Id);
            if (existingYardDetail == null)
            {
                throw new InvalidOperationException("YardDetail not found");
            }

            existingYardDetail.YardId = yardDetailDTO.YardId;
            existingYardDetail.Name = yardDetailDTO.Name;
            existingYardDetail.Location = yardDetailDTO.Location;
            existingYardDetail.Description = yardDetailDTO.Description;
            existingYardDetail.Capacity = yardDetailDTO.Capacity;
            existingYardDetail.Price = (float)yardDetailDTO.Price;
            existingYardDetail.PricePeak = (float)yardDetailDTO.PricePeak;
            existingYardDetail.IsDelete = yardDetailDTO.IsDelete;

            _applicationContext.SaveChanges();
        }

        public void DeleteYardDetail(int id)
        {
            var existingYardDetail = _applicationContext.YardDetails.FirstOrDefault(y => y.Id == id);
            if (existingYardDetail == null)
            {
                throw new InvalidOperationException("YardDetail not found");
            }

            existingYardDetail.IsDelete = 1; // Đánh dấu là đã xóa thay vì xóa thực sự
            _applicationContext.SaveChanges();
        }
    }
}
