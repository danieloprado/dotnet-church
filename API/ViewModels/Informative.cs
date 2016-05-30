using System;
using System.ComponentModel.DataAnnotations;

namespace ChurchWeb.Api.ViewModels
{
    public class InformativeViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Message { get; set; }
    }
}