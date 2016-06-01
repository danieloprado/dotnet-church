using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ChurchWeb.Domain.Services;
using ChurchWeb.Api.ViewModels;
using ChurchWeb.Config;
using ChurchWeb.Domain.Models;
using ChurchWeb.Domain.Repositories;

namespace ChurchWeb.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;

        public AuthController(
            ITokenService tokenService,
            IUserRepository userRepository)
        {
            _tokenService = tokenService;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetForLogin(model.Email);

            if (user == null || !user.VerifyPassword(model.Password))
            {
                return BadRequest();
            }

            var churchRoles = user.Churches.GroupBy(x => x.ChurchId).First().ToList();

            var userToken = UserToken.CreateForApp(user, churchRoles);
            var token = _tokenService.Generate(userToken);

            Response.Headers.Add("X-Token", token);
            return Ok(token);
        }

        [HttpGet("test")]
        [TokenAuthorize("admin")]
        public IActionResult Test()
        {
            return Ok(new { test = "ok" });
        }
    }
}
