using AutoMapper;
using ChurchWeb.Api.ViewModels;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Api
{
    public static class Config
    {
        public static void Mapper(IMapperConfiguration config)
        {
            config.CreateMap<AppointmentViewModel, Appointment>();
            config.CreateMap<InformativeViewModel, Informative>();
        }
    }
}