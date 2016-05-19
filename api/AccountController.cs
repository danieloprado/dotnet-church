using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ChurchWeb
{
    public class AccountController : Controller
    {
        public async Task<IActionResult> Index()
        {
            return Ok("OK!");
        }
    }
}