using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ChurchWeb.Config;
using ChurchWeb.Domain.Repositories;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Api.Controllers
{
    [Route("api/[controller]")]
    [TokenAuthorize]
    public class InformativeController : Controller
    {
        private readonly IInformativeRepository _informativeRepository;
        private readonly IAuthService _authService;

        public InformativeController(IInformativeRepository informativRepository, IAuthService authService)
        {
            _informativeRepository = informativRepository;
            _authService = authService;
        }

        [HttpGet("")]
        public async Task<IActionResult> List()
        {
            var currentUser = _authService.GetCurrentUser();
            var result = await _informativeRepository.List(currentUser.ChurchId);
            return Ok(result);
        }

    }
}
