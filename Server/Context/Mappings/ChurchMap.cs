using ChurchWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Context.Mappings
{
    public static class ChurchMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<Church>();

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
              .IsRequired()
              .HasColumnType("varchar(100)");

            entity.HasMany(e => e.Users)
              .WithOne(e => e.Church)
              .HasForeignKey(e=> e.UserId);

        }
    }
}