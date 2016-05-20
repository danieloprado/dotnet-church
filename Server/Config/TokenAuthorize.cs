using System;
using Microsoft.Extensions.DependencyInjection;
using ChurchWeb.Providers.Interfaces;
using ChurchWeb.Providers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ChurchWeb
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class TokenAuthorize : ActionFilterAttribute
    {
        private readonly List<string> _roles;

        public TokenAuthorize(params string[] roles)
        {
            _roles = roles.ToList();
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var tokenGenerator = context.HttpContext.ApplicationServices.GetService<ITokenGenerator>();
            var authToken = context.HttpContext.Request.Headers["Authorization"];

            try
            {
                var token = UserTokenProvider.Decode(authToken, tokenGenerator);

                if (_roles.Any() && !token.Roles.Any(r => _roles.Contains(r)))
                {
                    context.Result = new StatusCodeResult(403);
                    return;
                }
            }
            catch (Exception)
            {
                context.Result = new StatusCodeResult(401);
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}