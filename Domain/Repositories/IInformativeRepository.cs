using System.Collections.Generic;
using System.Threading.Tasks;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Domain.Repositories
{
    public interface IInformativeRepository
    {
        Task<Informative> Find(int id, int churchId);

        Task<List<Informative>> List(int churchId);

        Task<Informative> Create(Informative informative);

        Task<Informative> Update(Informative informative);

        Task Delete(Informative informative);
    }
}