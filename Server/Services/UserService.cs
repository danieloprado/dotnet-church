using ChurchWeb.Context;
using ChurchWeb.Models;
using Services.Interfaces;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly ChurchDbContext _context;

        public UserService(ChurchDbContext context)
        {
            _context = context;
            System.Console.Write("seed!");
            context.Seed();
        }

        public async Task<User> GetForLogin(string email)
        {
            return await _context.Users.Include(x=> x.Churches)
                .SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}