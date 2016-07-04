using System;

namespace ChurchWeb.Domain.Entities
{
    public class Appointment
    {
        protected Appointment() { }

        //PK
        public int Id { get; set; }

        //FK
        public int ChurchId { get; protected set; }
        public Church Church { get; protected set; }

        //Props
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime? EndDate { get; set; }

        public static Appointment Create(UserToken user, string title, string description, DateTime beginDate, DateTime? endDate = null)
        {
            return new Appointment()
            {
                ChurchId = user.ChurchId,
                Title = title,
                Description = description,
                BeginDate = beginDate,
                EndDate = endDate
            };
        }
    }
}