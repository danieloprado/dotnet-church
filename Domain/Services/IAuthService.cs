
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Domain.Services
{
    public interface IAuthService
    {
        UserToken GetCurrentUser();
    }
}