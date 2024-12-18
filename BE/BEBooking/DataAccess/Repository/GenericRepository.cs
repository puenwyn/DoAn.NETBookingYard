using DataAccess.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class GenericRepository<T> where T : class
    {
        private readonly BookingDbContext _bookingDbContext;
        public GenericRepository(BookingDbContext bookingDbContext)
        {
            _bookingDbContext = bookingDbContext;
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression = null, IEnumerable<Expression<Func<T, object>>> includeProperties = null)
        {
            IQueryable<T> query = _bookingDbContext.Set<T>();
            if (expression != null)
            {
                query = query.Where(expression);
            }
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }
            return await query.ToListAsync();
        }


        public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> expression, IEnumerable<Expression<Func<T, object>>> includeProperties = null)
        {
            IQueryable<T> query = _bookingDbContext.Set<T>();
            if (expression != null)
            {
                query = query.Where(expression);
            }
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }
            return await query.SingleOrDefaultAsync();
        }

        public async Task Create(T entity)
        {
            await _bookingDbContext.Set<T>().AddAsync(entity);
        }

        public void Update(T entity)
        {
            _bookingDbContext.Set<T>().Attach(entity);
            _bookingDbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _bookingDbContext.Set<T>().Attach(entity);
            _bookingDbContext.Entry(entity).State = EntityState.Deleted;
        }

        public async Task Commit()
        {
            await _bookingDbContext.SaveChangesAsync();
        }
    }
}
