using AutoMapper;
using ChurchWeb.Api.ViewModels;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Api
{
    public static class Config
    {
        public static void Mapper(IMapperConfiguration config)
        {
            config.CreateMap<InformativeViewModel, Informative>();
        }
    }
}