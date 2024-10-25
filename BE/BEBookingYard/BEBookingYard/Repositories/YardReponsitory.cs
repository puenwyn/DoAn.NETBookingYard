using BEBookingYard.Data;
using BEBookingYard.DTO;
using BEBookingYard.Models;

namespace BEBookingYard.Repositories
{
    public interface IYardReponsitory
    {
        IEnumerable<YardDTO> GetAll();
        YardDTO GetYardById(int id);
        void AddYard(Yard yard);
        void UpdateYard(YardDTO yard);
        void DeleteYard(int id);
        IEnumerable<YardDTO> GetYardByYardType(int yardType);

    }
    public class YardReponsitory : IYardReponsitory
    {

        private readonly YardContext _yardContext;

        public YardReponsitory(YardContext yardContext)
        {
            _yardContext = yardContext;
        }

        public IEnumerable<YardDTO> GetAll()
        {
            var yards = _yardContext.Yards.ToList();
            return yards
                .Where(y => y.Owner != 0 && y.IsDelete == 0)
                .Select(yard => new YardDTO
                {
                    Id = yard.Id,
                    YardType = yard.YardType,
                    Name = yard.Name,
                    NameTransformed = yard.NameTransformed,
                    Address = yard.Address,
                    Owner = yard.Owner,
                    Description = yard.Description,
                    isDelete = yard.IsDelete
                });
        }

        public YardDTO? GetYardById(int id)
        {
            var yard = _yardContext.Yards.FirstOrDefault(y => y.Id == id);
            if(yard == null)
            {
                return null;
            }
            return new YardDTO
            {
                Id = yard.Id,
                YardType = yard.YardType,
                Name = yard.Name,
                NameTransformed = yard.NameTransformed,
                Address = yard.Address,
                Owner = yard.Owner,
                Description = yard.Description,
                isDelete = yard.IsDelete
            };
        }
        public void AddYard(Yard yard)
        {
            if(_yardContext.Yards.Any(y => y.Name == yard.Name))
            {
                throw new Exception("Yard already exits");
            }
            _yardContext.Yards.Add(yard);
            _yardContext.SaveChanges();
        }

        public void DeleteYard(int id)
        {
            var existingYard = _yardContext.Yards.FirstOrDefault(y => y.Id == id);
            if (existingYard == null)
            {
                throw new InvalidOperationException("Yard not found");
            }
            existingYard.IsDelete = 1;
            _yardContext.SaveChanges();
        }


        public void UpdateYard(YardDTO yardDTO)
        {
            var existingYard = _yardContext.Yards.FirstOrDefault(y => y.Id == yardDTO.Id);
            if(existingYard == null)
            {
                throw new InvalidOperationException("Yard not found");
            }
            existingYard.YardType = yardDTO.YardType;
            existingYard.Name = yardDTO.Name;
            existingYard.NameTransformed = yardDTO.NameTransformed;
            existingYard.Address = yardDTO.Address;
            existingYard.Description = yardDTO.Description;
            existingYard.Owner = yardDTO.Owner;
            _yardContext.SaveChanges();   
        }

        public IEnumerable<YardDTO> GetYardByYardType(int yardType)
        {
            var yards = _yardContext.Yards.ToList();
            return yards
                .Where(y => y.Owner != 0 && y.IsDelete == 0 && y.YardType == yardType )
                .Select(yard => new YardDTO
                {
                    Id = yard.Id,
                    YardType = yard.YardType,
                    Name = yard.Name,
                    NameTransformed = yard.NameTransformed,
                    Address = yard.Address,
                    Owner = yard.Owner,
                    Description = yard.Description,
                    isDelete = yard.IsDelete
                });
        }
    }
}
