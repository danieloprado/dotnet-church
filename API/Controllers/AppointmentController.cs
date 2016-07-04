using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChurchWeb.Config;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;
using ChurchWeb.Api.ViewModels;
using ChurchWeb.Domain.Entities;
using AutoMapper;
using ChurchWeb.CrossCutting.Exceptions;

namespace ChurchWeb.Api.Controllers
{
    [TokenAuthorize]
    [Route("api/[controller]")]
    public class AppointmentController : Controller
    {
        private readonly IAppointmentRepository _repository;
        private readonly IAppointmentService _service;
        private readonly IAuthService _authService;

        public AppointmentController(IAppointmentRepository repository, IAppointmentService service, IAuthService authService)
        {
            _repository = repository;
            _service = service;
            _authService = authService;
        }

        [HttpGet("")]
        public async Task<IActionResult> List()
        {
            var currentUser = _authService.GetCurrentUser();
            var result = await _repository.List(currentUser.ChurchId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = _authService.GetCurrentUser();
            var appointment = await _repository.Find(id, user.Id);
            return Ok(appointment);
        }

        [HttpPost("")]
        public async Task<IActionResult> Save([FromBody]AppointmentViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _authService.GetCurrentUser();
            var appointment = Appointment.Create(user, model.Title, model.Description, model.BeginDate, model.EndDate);
            Mapper.Map(model, appointment);

            appointment = await _service.Save(appointment);
            return Ok(appointment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                return Ok();

            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

    }
}
