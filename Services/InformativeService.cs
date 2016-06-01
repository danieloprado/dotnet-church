
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

    }
}