
using System.Linq;

namespace ChurchWeb.Context.Seeds
{
    public static class UserSeed
    {
        public static Models.User Seed(ChurchDbContext context, Models.Church church)
        {
            var user = context.Users.SingleOrDefault(x => x.Email == "danieloprado@outlook.com");

            if (user != null)
            {
                return user;
            }

            user = Models.User.Create("Daniel", "Prado", "danieloprado@outlook.com", "1234", church, "admin");
            context.Users.Add(user);
            context.SaveChanges();

            return user;
        }
    }
}