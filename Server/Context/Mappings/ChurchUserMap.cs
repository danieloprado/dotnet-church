using ChurchWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Context.Mappings
{
    public static class ChurchUserMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<ChurchUser>();

            entity.HasKey(e => new { e.UserId, e.ChurchId, e.Role });

            entity.HasOne(e => e.Church)
              .WithMany(e => e.Users)
              .HasForeignKey(e => e.ChurchId)
              .IsRequired();

            entity.HasOne(e => e.User)
              .WithMany(e => e.Churches)
              .HasForeignKey(e => e.UserId)
              .IsRequired();

        }
    }
}