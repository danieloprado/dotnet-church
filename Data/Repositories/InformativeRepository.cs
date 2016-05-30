using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChurchWeb.Domain.Models;
using ChurchWeb.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data.Repository
{
    public class InformativeRepository : IInformativeRepository
    {
        private readonly ChurchDbContext _context;

        public InformativeRepository(ChurchDbContext context)
        {
            _context = context;
        }

         public async Task<List<Informative>> List(int churchId)
        {
            return await _context.Informatives
                .Where(x=> x.ChurchId == churchId)
                .ToListAsync();
        }
    }
}