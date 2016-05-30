namespace ChurchWeb.Domain.Services
{
    public interface ITokenService
    {
        string Generate(object payload);

        T Decode<T>(string token);
    }
}