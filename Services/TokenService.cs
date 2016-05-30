using ChurchWeb.Config;
using ChurchWeb.Domain.Services;
using Microsoft.Extensions.Options;

namespace ChurchWeb.Services
{
    public class TokenService : ITokenService
    {
        private string _secretKey;

        public TokenService(IOptions<AppSettings> config)
        {
            JwtDnx.JsonWebToken.JsonSerializer = new TokenJsonSerializer();
            _secretKey = config.Value.JwtSecret;
        }

        public string Generate(object payload)
        {
            return JwtDnx.JsonWebToken.Encode(payload, _secretKey, JwtDnx.JwtHashAlgorithm.HS256);
        }

        public T Decode<T>(string token)
        {
            return JwtDnx.JsonWebToken.DecodeToObject<T>(token, _secretKey);
        }
    }


}
