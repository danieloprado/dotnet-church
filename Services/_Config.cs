using Microsoft.Extensions.DependencyInjection;
using ChurchWeb.Domain.Services;
using AutoMapper;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Services
{
    public static class Config
    {
        public static void DependencyInjection(IServiceCollection services)
        {
            services.AddScoped<IAppointmentService, AppointmentService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IInformativeService, InformativeService>();
            services.AddScoped<IUserService, UserService>();
        }

        public static void Mapper(IMapperConfiguration config)
        {
            config.CreateMap<Informative, Informative>()
                .ForMember(m=> m.ChurchId, opt=> opt.Ignore())
                .ForMember(m=> m.Church, opt=> opt.Ignore())
                .ForMember(m=> m.CreatedDate, opt=> opt.Ignore())
                .ForMember(m=> m.UpdatedDate, opt=> opt.Ignore());
        }
    }
}