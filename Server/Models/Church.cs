using System.Collections.Generic;

namespace ChurchWeb.Models
{
    public class Church
    {
        protected Church() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public List<ChurchUser> Users { get; set; }

        public static Church Create(string name)
        {
            return new Church()
            {
                Name = name
            };
        }
    }
}