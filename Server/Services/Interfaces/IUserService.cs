using System.Threading.Tasks;
using ChurchWeb.Models;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetForLogin(string email);
    }
}