using System;
using System.ComponentModel.DataAnnotations;

namespace ChurchWeb.Api.ViewModels
{
    public class AppointmentViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        public DateTime BeginDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}