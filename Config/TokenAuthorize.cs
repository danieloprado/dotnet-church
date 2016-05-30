using System;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Config
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
            var authService = context.HttpContext.RequestServices.GetService<IAuthService>();

            try
            {
                var token = authService.GetCurrentUser();

                if (token == null)
                {
                    context.Result = new StatusCodeResult(401);
                    return;
                }

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