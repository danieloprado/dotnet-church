using Microsoft.AspNetCore.Http;
using System;
using ChurchWeb.Domain.Entities;
using ChurchWeb.Domain.Services;

namespace ChurchWeb.Services
{
    public class AuthService : IAuthService
    {
        private readonly IHttpContextAccessor _httpAccessor;
        private readonly ITokenService _tokenGenerator;

        private UserToken _currentUser = null;
        private bool _userChecked = false;

        public AuthService(
            IHttpContextAccessor httpAccessor,
            ITokenService tokenGenerator)
        {
            _httpAccessor = httpAccessor;
            _tokenGenerator = tokenGenerator;
        }


        public UserToken GetCurrentUser()
        {
            if (_userChecked)
            {
                return _currentUser;
            }

            _currentUser = DecodeToken();
            return _currentUser;
        }

        private UserToken DecodeToken()
        {
            try
            {
                var authHeader = _httpAccessor.HttpContext.Request.Headers["Authorization"];

                if (string.IsNullOrWhiteSpace(authHeader))
                {
                    return null;
                }

                return _tokenGenerator.Decode<UserToken>(authHeader.ToString().Split(' ')[1]);
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return null;
            }
            finally
            {
                _userChecked = true;
            }

        }

    }
}