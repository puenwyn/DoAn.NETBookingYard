using BEBookingYard.DTO;
using BEBookingYard.Models;
using BEBookingYard.Repositories;

namespace BEBookingYard.Services
{
    public class YardService
    {
        private readonly IYardReponsitory _yardReponsitory;

        public YardService(IYardReponsitory yardReponsitory)
        {
            _yardReponsitory = yardReponsitory;
        }

        public IEnumerable<YardDTO> GetAll()
        {
            return _yardReponsitory.GetAll();
        }

        public YardDTO GetById(int id) 
        {
            return _yardReponsitory.GetYardById(id);
        }

        public void AddYard(Yard yard)
        {
            if(yard == null)
            {
                throw new ArgumentNullException(nameof(yard), "Yard cannot be null");
            }
            _yardReponsitory.AddYard(yard);
        }

        public void UpdateYard(YardDTO yardDTO)
        {
            if (yardDTO == null)
            {
                throw new ArgumentNullException(nameof(yardDTO), "Yard cannot be null");
            }
            _yardReponsitory.UpdateYard(yardDTO);
        }

        public void DeleteYard(int id)
        {
            if (id == null)
            {
                throw new ArgumentNullException("Id null");
            }
            _yardReponsitory.DeleteYard(id);
        }
    }
}
