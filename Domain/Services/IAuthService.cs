
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Domain.Services
{
    public interface IAuthService
    {
        UserToken GetCurrentUser();
    }
}