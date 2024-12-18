using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ResponseDatatable<T>
    {
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<T> Results { get; set; } = Enumerable.Empty<T>();
        public ResponseDatatable(int totalRecords, IEnumerable<T> results, int pageSize = 10)
        {
            TotalRecords = totalRecords;
            Results = results;
            TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);
        }
    }
}
