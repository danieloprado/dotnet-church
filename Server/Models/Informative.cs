using System;

namespace ChurchWeb.Models
{
    public class Informative
    {
        protected Informative() { }

        //PK
        public int Id { get; set; }

        //FK
        public int ChurchId { get; protected set; }
        public Church Church { get; protected set; }

        public int CreatorId { get; protected set; }
        public User Creator{ get; protected set; }

        //Props
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }

        public DateTime CreatedDate { get; protected set; }
        public DateTime UpdatedDate { get; set; }

        public static Informative Create(int creatorId,int churchId, string title, DateTime date, string message)
        {
            return new Informative()
            {
                CreatorId = creatorId,
                ChurchId = churchId,
                Title = title,
                Date = date,
                Message = message,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };
        }
    }
}