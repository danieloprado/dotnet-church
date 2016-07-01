using ChurchWeb.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChurchWeb.Data.Mappings
{
    internal static class ChurchMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<Church>();

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
              .IsRequired()
              .HasColumnType("varchar(100)");

            entity.Property(e => e.Email)
              .HasColumnType("varchar(150)");

            entity.Property(e => e.Phone)
              .HasColumnType("varchar(20)");

            entity.Property(e => e.Address)
              .HasColumnType("varchar(150)");

            entity.Property(e => e.Latitude);
            entity.Property(e => e.Longitude);

            entity.HasMany(e => e.Users)
              .WithOne(e => e.Church)
              .HasForeignKey(e=> e.UserId)
              .OnDelete(DeleteBehavior.Restrict);

        }
    }
}