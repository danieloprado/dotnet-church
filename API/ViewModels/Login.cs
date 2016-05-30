using System.ComponentModel.DataAnnotations;

namespace ChurchWeb.Api.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}