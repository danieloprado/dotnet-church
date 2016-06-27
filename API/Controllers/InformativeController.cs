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
    public class InformativeController : Controller
    {
        private readonly IInformativeRepository _repository;
        private readonly IInformativeService _service;
        private readonly IAuthService _authService;

        public InformativeController(IInformativeRepository repository, IInformativeService service, IAuthService authService)
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
            var informative = await _repository.Find(id, user.Id);
            return Ok(informative);
        }

        [HttpPost("")]
        public async Task<IActionResult> Save([FromBody]InformativeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _authService.GetCurrentUser();
            var informative = Informative.Create(user, model.Title, model.Date, model.Message);
            Mapper.Map(model, informative);

            informative = await _service.Save(informative);
            return Ok(informative);
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
