
using System.Linq;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Data.Seeds
{
    public static class UserSeed
    {
        public static User Seed(ChurchDbContext context, Church church)
        {
            var user = context.Users.SingleOrDefault(x => x.Email == "danieloprado@outlook.com");

            if (user != null)
            {
                return user;
            }

            user = User.Create("Daniel", "Prado", "danieloprado@outlook.com", "1234", church, "admin");
            context.Users.Add(user);
            context.SaveChanges();

            return user;
        }
    }
}