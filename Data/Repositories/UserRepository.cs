using System.Threading.Tasks;
using ChurchWeb.Domain.Models;
using ChurchWeb.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ChurchDbContext _context;

        public UserRepository(ChurchDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetForLogin(string email)
        {
            return await _context.Users.Include(x=> x.Churches)
                .SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}