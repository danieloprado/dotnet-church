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

        public async Task<Informative> Find(int id)
        {
            return await _context.Informatives.Where(x => x.Id == id).SingleOrDefaultAsync();
        }

        public async Task<List<Informative>> List(int churchId)
        {
            return await _context.Informatives
                .Where(x=> x.ChurchId == churchId)
                .ToListAsync();
        }

        public async Task<Informative> Create(Informative informative)
        {
            _context.Informatives.Add(informative);
            await _context.SaveChangesAsync();

            return informative;
        }

        public async Task<Informative> Update(Informative informative)
        {
            _context.Entry(informative).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return informative;
        }
    }
}