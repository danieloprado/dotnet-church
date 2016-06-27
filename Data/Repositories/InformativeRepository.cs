using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;
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

        public async Task<Informative> Find(int id, int churchId)
        {
            return await _context.Informatives
                .Where(x => x.Id == id && x.ChurchId == churchId)
                .SingleOrDefaultAsync();
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
            await _context.SaveChangesAsync();
            return informative;
        }

        public async Task Delete(Informative informative)
        {
            _context.Informatives.Remove(informative);
            await _context.SaveChangesAsync();
        }
    }
}