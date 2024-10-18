using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Repositories;

namespace BEBookingYard.Services
{
    public interface IYardDetailService
    {
        IEnumerable<YardDetailDTO> GetAllYardDetails();
        YardDetailDTO GetYardDetailById(int id);
        void AddYardDetail(YardDetail yardDetail);
        void UpdateYardDetail(YardDetailDTO yardDetailDTO);
        void DeleteYardDetail(int id);
    }

    public class YardDetailService : IYardDetailService
    {
        private readonly IYardDetailRepository _yardDetailRepository;

        public YardDetailService(IYardDetailRepository yardDetailRepository)
        {
            _yardDetailRepository = yardDetailRepository;
        }

        public IEnumerable<YardDetailDTO> GetAllYardDetails()
        {
            // Lấy danh sách tất cả sân không bị xóa
            return _yardDetailRepository.GetAllYardDetails().Where(y => y.IsDelete == 0);

        }

        public YardDetailDTO GetYardDetailById(int id)
        {
            // Lấy thông tin chi tiết sân theo ID
            var yardDetail = _yardDetailRepository.GetYardDetailById(id);
            if (yardDetail == null || yardDetail.IsDelete == 1) // Kiểm tra nếu sân đã bị xóa
            {
                throw new KeyNotFoundException($"YardDetail with ID {id} not found.");
            }
            return yardDetail;
        }

        public void AddYardDetail(YardDetail yardDetail)
        {
            if (yardDetail == null)
            {
                throw new ArgumentNullException(nameof(yardDetail), "YardDetail cannot be null.");
            }
            _yardDetailRepository.AddYardDetail(yardDetail);
        }

        public void UpdateYardDetail(YardDetailDTO yardDetailDTO)
        {
            if (yardDetailDTO == null)
            {
                throw new ArgumentNullException(nameof(yardDetailDTO), "YardDetail cannot be null.");
            }
           
            _yardDetailRepository.UpdateYardDetail(yardDetailDTO);
        }

        public void DeleteYardDetail(int id)
        {
            var existingYardDetail = _yardDetailRepository.GetYardDetailById(id);
            if (existingYardDetail == null)
            {
                throw new InvalidOperationException("Yard detail not found.");
            }
            existingYardDetail.IsDelete = 1; // Đánh dấu là xóa
            _yardDetailRepository.UpdateYardDetail(existingYardDetail);
        }
    }
}
