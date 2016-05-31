
using System.Threading.Tasks;
using AutoMapper;
using ChurchWeb.Domain.Models;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Services
{
    public class InformativeService : IInformativeService
    {
        private readonly IInformativeRepository _repository;

        public InformativeService(IInformativeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Informative> Save(Informative model)
        {
            var informative = await _repository.Find(model.Id);

            if (informative == null)
            {
                return await _repository.Create(model);
            }

            Mapper.Map(model, informative);
            return await _repository.Update(model);
        }

    }
}