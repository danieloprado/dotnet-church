using System.Collections.Generic;
using System.Threading.Tasks;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Domain.Repositories
{
    public interface IInformativeRepository
    {
        Task<List<Informative>> List(int churchId);
    }
}