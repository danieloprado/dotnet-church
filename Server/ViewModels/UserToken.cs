using System;
using System.Collections.Generic;
using ChurchWeb.Models;
using Newtonsoft.Json;
using System.Linq;

namespace ChurchWeb.ViewModels
{
    public class UserToken
    {
        private UserToken()
        {
        }

        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int ChurchId { get; set; }

        public List<string> Roles { get; set; }

        [JsonIgnoreAttribute]
        public DateTime Expiration
        {
            get
            {
                return JwtDnx.JwtDnxExtentions.ToDateTiemUtc(Exp);
            }
            set
            {
                Exp = JwtDnx.JwtDnxExtentions.ToUnixTimeSeconds(value);
            }
        }

        public long Exp { get; set; }

        public static UserToken Create(User user, List<ChurchUser> roles, DateTime expiration)
        {
            return new UserToken()
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ChurchId = roles.First().ChurchId,
                Roles = roles.Select(x => x.Role).ToList(),
                Expiration = expiration
            };
        }
    }
}