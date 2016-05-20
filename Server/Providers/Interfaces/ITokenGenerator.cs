namespace ChurchWeb.Providers.Interfaces
{
    public interface ITokenGenerator
    {
        string Generate(object payload);

        T Decode<T>(string token);
    }
}