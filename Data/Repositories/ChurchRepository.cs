using System.Linq;
using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;
using ChurchWeb.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data.Repository
{
    public class ChurchRepository : IChurchRepository
    {
        private readonly ChurchDbContext _context;

        public ChurchRepository(ChurchDbContext context)
        {
            _context = context;
        }

        public async Task<Church> Find(int id)
        {
            return await _context.Churches
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }
    }

}