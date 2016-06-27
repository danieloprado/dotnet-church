using System.Collections.Generic;

namespace ChurchWeb.Domain.Entities
{
    public class User
    {
        protected User()
        {
            Churches = new List<ChurchUser>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; protected set; }

        public List<ChurchUser> Churches { get; set; }

        public User UpdatePasssword(string password)
        {
            this.Password = BCrypt.Net.BCrypt.HashPassword(password);
            return this;
        }

        public bool VerifyPassword(string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, this.Password);
        }

        public User AddToChurch(Church church, params string[] roles)
        {
            foreach (var role in roles)
            {
                this.Churches.Add(ChurchUser.Create(church, this, role));
            }

            return this;
        }

        public static User Create(string firstName, string lastName, string email, string password, Church church, params string[] roles)
        {
            var user = new User()
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email
            };

            user.UpdatePasssword(password);
            user.AddToChurch(church, roles);

            return user;
        }

    }
}
