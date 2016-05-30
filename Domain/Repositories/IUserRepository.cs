using System.Threading.Tasks;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetForLogin(string email);
    }
}