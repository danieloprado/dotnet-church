
using System.Threading.Tasks;
using AutoMapper;
using ChurchWeb.CrossCutting.Exceptions;
using ChurchWeb.Domain.Entities;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Services
{
    public class InformativeService : IInformativeService
    {
        private readonly IInformativeRepository _repository;
        private readonly IAuthService _authService;

        public InformativeService(IInformativeRepository repository, IAuthService authService)
        {
            _repository = repository;
            _authService = authService;
        }

        public async Task<Informative> Save(Informative model)
        {
            var user = _authService.GetCurrentUser();
            var informative = await _repository.Find(model.Id, user.ChurchId);

            if (informative == null)
            {
                return await _repository.Create(model);
            }

            Mapper.Map(model, informative);
            return await _repository.Update(model);
        }

        public async Task Delete(int id)
        {
            var user = _authService.GetCurrentUser();
            var informative = await _repository.Find(id, user.ChurchId);

            if (informative == null)
            {
                throw new NotFoundException();
            }

            await _repository.Delete(informative);
        }
    }
}