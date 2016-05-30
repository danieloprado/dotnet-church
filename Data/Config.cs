using ChurchWeb.Data.Repository;
using ChurchWeb.Domain.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ChurchWeb.Data
{
    public static class Config
    {
        public static void DependencyInjection(IServiceCollection services)
        {
            services.AddScoped<IInformativeRepository, InformativeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

    }
}