using ChurchWeb.Providers.Interfaces;
using Services.Interfaces;
using System;
using ChurchWeb.ViewModels;
using System.Threading.Tasks;
using System.Linq;
using ChurchWeb.ViewModels.Account;
using Microsoft.AspNetCore.Mvc;

namespace ChurchWeb.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ITokenGenerator _jwtGenerator;
        private readonly IUserService _userService;

        private readonly UserToken _user;

        public AccountController(
            ITokenGenerator jwtGenerator = null,
            IUserService userService = null,
            UserToken user = null)
        {
            _jwtGenerator = jwtGenerator;
            _userService = userService;
            _user = user;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetForLogin(model.Email);

            if (user == null || !user.VerifyPassword(model.Password))
            {
                return BadRequest();
            }

            var churchRoles = user.Churches.GroupBy(x => x.ChurchId).First().ToList();

            var userToken = UserToken.Create(user, churchRoles, DateTime.Now.AddDays(-15));
            var token = _jwtGenerator.Generate(userToken);

            Response.Headers.Add("X-Token", token);

            return Ok(token);
        }

        [HttpGet("test")]
        [TokenAuthorize("admin")]
        public IActionResult Test()
        {
            return Ok(new { test = "ok", _user });
        }
    }
}
