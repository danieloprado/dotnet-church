using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ChurchWeb.Config
{
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


