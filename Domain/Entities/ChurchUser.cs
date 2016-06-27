namespace ChurchWeb.Domain.Entities
{
    public class ChurchUser
    {
        protected ChurchUser() { }

        public int ChurchId { get; protected set; }

        public Church Church { get; set; }

        public int UserId { get; protected set; }

        public User User { get; set; }

        public string Role { get; set; }

        public static ChurchUser Create(Church church, User user, string role)
        {
            return new ChurchUser
            {
                Church = church,
                User = user,
                Role = role
            };
        }

    }
}