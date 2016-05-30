
using System.Linq;
using ChurchWeb.Domain.Models;

namespace ChurchWeb.Data.Seeds
{
    public static class ChurchSeed
    {
        public static Church Seed(ChurchDbContext context)
        {
            if (!context.Churches.Any())
            {
              context.Churches.Add(Church.Create("ICB Sorocaba"));
              context.SaveChanges();
            }

            return context.Churches.Where(x => x.Name.Contains("ICB Sorocaba")).Single();
        }
    }
}