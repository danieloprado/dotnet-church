using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChurchWeb.Config;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;
using ChurchWeb.Api.ViewModels;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Api.Controllers
{
    [TokenAuthorize]
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

        [HttpPost("")]
        public async Task<IActionResult> Save([FromBody]InformativeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _authService.GetCurrentUser();
            var informative = Informative.Create(user, model.Title, model.Date, model.Message);

            informative = await _service.Save(informative);
            return Ok(informative);
        }

    }
}
