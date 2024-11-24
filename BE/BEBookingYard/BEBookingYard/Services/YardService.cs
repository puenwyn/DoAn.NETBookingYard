using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Repositories;

namespace BEBookingYard.Services
{
    public class YardService
    {
        private readonly IYardRepository _yardRepository;

        public YardService(IYardRepository yardRepository)
        {
            _yardRepository = yardRepository;
        }

        // Lấy tất cả sân
        public IEnumerable<YardDTO> GetAll()
        {
            return _yardRepository.GetAll();
        }

        // Lấy sân theo ID
        public YardDTO GetYardById(int id)
        {
            return _yardRepository.GetYardById(id);
        }
        public IEnumerable<YardDetail> GetYardDetailsByYardId(int yardId)
        {
            return _yardRepository.GetYardDetailsByYardId(yardId);
        }

        // Thêm sân mới
        public void AddYard(Yard yard)
        {
            if (yard == null)
            {
                throw new ArgumentNullException(nameof(yard), "Yard cannot be null");
            }
            _yardRepository.AddYard(yard);
        }

        public void AddYardImages(int yardId, List<string> imageUrls)
        {
            foreach (var url in imageUrls)
            {
                // Assuming you have a YardImage model and a method to save it
                var yardImage = new YardImage
                {
                    YardId = yardId,
                    ImageURL = url
                };

                _yardRepository.AddYardImage(yardImage); // Ensure you implement this in your repository
            }
        }

        public void DeleteYardImage(int imageId)
        {
            _yardRepository.DeleteYardImage(imageId); // Call the repository method to delete the image
        }

        public void AddYardDetail(YardDetail yardDetail)
        {
            _yardRepository.AddYardDetail(yardDetail);
        }

        public void UpdateYardDetail(YardDetailDTO yardDetailDTO)
        {
            _yardRepository.UpdateYardDetail(yardDetailDTO); // Call repository method
        }

        public void DeleteYardDetail(int id)
        {
            _yardRepository.DeleteYardDetail(id); // Call repository method
        }

        // Cập nhật thông tin sân
        public void UpdateYard(YardDTO yardDTO)
        {
            if (yardDTO == null)
            {
                throw new ArgumentNullException(nameof(yardDTO), "Yard cannot be null");
            }
            _yardRepository.UpdateYard(yardDTO);
        }
    }
}
