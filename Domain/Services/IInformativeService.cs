
using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Domain.Services
{
    public interface IInformativeService
    {
        Task<Informative> Save(Informative model);

        Task Delete(int id);
    }
}