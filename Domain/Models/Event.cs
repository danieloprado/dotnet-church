using System;
using System.Collections.Generic;

namespace ChurchWeb.Domain.Models
{
    public class Event
    {
        protected Event() { }

        //PK
        public int Id { get; set; }

        //FK
        public int ChurchId { get; protected set; }
        public Church Church { get; protected set; }
        public List<Informative> Informatives { get; set; }

        //Props
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}