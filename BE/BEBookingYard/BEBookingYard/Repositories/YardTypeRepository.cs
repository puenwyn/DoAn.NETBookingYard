using BEBookingYard.Data;
using BEBookingYard.Models;
using Microsoft.IdentityModel.Tokens;

namespace BEBookingYard.Repositories
{
    public interface IYardTypeRepository
    {
        IEnumerable<YardType> GetAllYardTypes();
        YardType GetYardTypeById(int id);
        IEnumerable<YardType> GetYardTypesByName(string name);
        void AddYardType(YardType yardType);
        void UpdateYardType(YardType yardType);
    }

    public class YardTypeRepository : IYardTypeRepository
    {
        private readonly ApplicationContext _applicationContext;

        public YardTypeRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public IEnumerable<YardType> GetAllYardTypes() 
        {
            return _applicationContext.YardTypes.ToList();
        }

        public YardType? GetYardTypeById(int id)
        {
            var yard_type = _applicationContext.YardTypes.FirstOrDefault(x => x.Id == id);
            return yard_type;
        }

        public void AddYardType(YardType yardType)
        {
            if (_applicationContext.YardTypes.Any(x => x.Name == yardType.Name))
            {
                throw new Exception("Yard type already exists");
            }
            _applicationContext.YardTypes.Add(yardType);
            _applicationContext.SaveChanges();
        }

        public void UpdateYardType(YardType yardType)
        {
            if (_applicationContext.YardTypes.Any(x => x.Name == yardType.Name))
            {
                throw new Exception("Yard type already exists");
            }
            var existingYardType = _applicationContext.YardTypes.FirstOrDefault(x => x.Id == yardType.Id);
            if (existingYardType == null)
            {
                throw new Exception("Yard type is not exists");
            }
            existingYardType.Name = yardType.Name;
            existingYardType.IsDelete = yardType.IsDelete;
            _applicationContext.SaveChanges();
        }

        public IEnumerable<YardType> GetYardTypesByName(string name)
        {
            if (name.IsNullOrEmpty())
            {
                return _applicationContext.YardTypes.ToList();
            }
            return _applicationContext.YardTypes.Where(x => x.Name.Contains(name) && x.IsDelete == 0);
        }
    }
}
