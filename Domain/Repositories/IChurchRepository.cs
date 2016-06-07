using System.Threading.Tasks;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Domain.Repositories
{
    public interface IChurchRepository
    {
        Task<Church> Find(int id);
    }
}