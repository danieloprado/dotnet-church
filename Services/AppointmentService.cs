
using System.Threading.Tasks;
using AutoMapper;
using ChurchWeb.CrossCutting.Exceptions;
using ChurchWeb.Domain.Entities;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _repository;
        private readonly IAuthService _authService;

        public AppointmentService(IAppointmentRepository repository, IAuthService authService)
        {
            _repository = repository;
            _authService = authService;
        }

        public async Task<Appointment> Save(Appointment model)
        {
            var user = _authService.GetCurrentUser();
            var appointment = await _repository.Find(model.Id, user.ChurchId);

            if (appointment == null)
            {
                return await _repository.Create(model);
            }

            Mapper.Map(model, appointment);
            return await _repository.Update(model);
        }

        public async Task Delete(int id)
        {
            var user = _authService.GetCurrentUser();
            var appointment = await _repository.Find(id, user.ChurchId);

            if (appointment == null)
            {
                throw new NotFoundException();
            }

            await _repository.Delete(appointment);
        }
    }
}