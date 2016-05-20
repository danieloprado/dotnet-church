using System.ComponentModel.DataAnnotations;

namespace ChurchWeb.ViewModels.Account
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}