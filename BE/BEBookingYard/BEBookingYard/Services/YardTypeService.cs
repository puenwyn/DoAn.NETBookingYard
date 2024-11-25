using BEBookingYard.Models;
using BEBookingYard.Repositories;

namespace BEBookingYard.Services
{
    public class YardTypeService
    {
        private readonly IYardTypeRepository _yardTypeRepository;

        public YardTypeService(IYardTypeRepository yardTypeRepository)
        {
            _yardTypeRepository = yardTypeRepository;
        }

        public IEnumerable<YardType> GetAllYardTypes()
        {
            return _yardTypeRepository.GetAllYardTypes();
        }

        public YardType GetYardTypeById(int id)
        {
            return _yardTypeRepository.GetYardTypeById(id);
        }

        public void AddYardType(YardType yardType)
        {
            if (yardType == null)
            {
                throw new ArgumentNullException(nameof(yardType), "Yard type cannot be null");
            }
            _yardTypeRepository.AddYardType(yardType);
        }

        public void UpdateYardType(YardType yardType)
        {
            if (yardType == null)
            {
                throw new ArgumentNullException(nameof(yardType), "Yard type cannot be null");
            }
            _yardTypeRepository.UpdateYardType(yardType);
        }

        public IEnumerable<YardType> GetYardTypesByName(string name)
        {
            return _yardTypeRepository.GetYardTypesByName(name);
        }
    }
}
