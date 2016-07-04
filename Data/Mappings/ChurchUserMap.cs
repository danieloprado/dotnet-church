using ChurchWeb.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChurchWeb.Data.Mappings
{
    internal static class ChurchUserMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<ChurchUser>();

            entity.ToTable("ChurchUser");
            entity.HasKey(e => new { e.UserId, e.ChurchId, e.Role });

            entity.HasOne(e => e.Church)
              .WithMany(e => e.Users)
              .HasForeignKey(e => e.ChurchId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.User)
              .WithMany(e => e.Churches)
              .HasForeignKey(e => e.UserId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Restrict);

        }
    }
}