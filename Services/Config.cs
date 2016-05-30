using Microsoft.Extensions.DependencyInjection;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Services
{
    public static class Config
    {
        public static void DependencyInjection(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IInformativeService, InformativeService>();
            services.AddScoped<IUserService, UserService>();
        }

    }
}