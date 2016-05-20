using Microsoft.Extensions.DependencyInjection;
using ChurchWeb.ViewModels;
using System;
using ChurchWeb.Providers.Interfaces;
using Microsoft.AspNetCore.Http;

namespace ChurchWeb.Providers
{
    public static class UserTokenProvider
    {
        public static UserToken Resolve(IServiceProvider services)
        {
            var httpAccessor = services.GetService<IHttpContextAccessor>();
            var tokenGenerator = services.GetService<ITokenGenerator>();

            var authHeader = httpAccessor.HttpContext.Request.Headers["Authorization"];

            try
            {
                return Decode(authHeader, tokenGenerator);
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return null;
            }
        }

        public static UserToken Decode(string authHeader, ITokenGenerator tokenGenerator)
        {
            if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.Contains(" "))
            {
                throw new ArgumentException(nameof(authHeader));
            }

            return tokenGenerator.Decode<UserToken>(authHeader.ToString().Split(' ')[1]);
        }
    }
}