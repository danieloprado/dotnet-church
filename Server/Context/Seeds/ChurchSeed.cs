
using System.Linq;

namespace ChurchWeb.Context.Seeds
{
    public static class ChurchSeed
    {
        public static Models.Church Seed(ChurchDbContext context)
        {
            if (!context.Churches.Any())
            {
              context.Churches.Add(Models.Church.Create("ICB Sorocaba"));
              context.SaveChanges();
            }

            return context.Churches.Where(x => x.Name.Contains("ICB Sorocaba")).Single();
        }
    }
}