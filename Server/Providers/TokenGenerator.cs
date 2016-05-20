using ChurchWeb.Providers.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.Options;

namespace ChurchWeb.Providers
{
    public class TokenGenerator : ITokenGenerator
    {
        private string _secretKey;

        public TokenGenerator(IOptions<Config.AppSettings> config)
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

    public class TokenJsonSerializer : JwtDnx.IJsonSerializer
    {
        public T Deserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }

        public string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj, new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}
