using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetForLogin(string email);
    }
}