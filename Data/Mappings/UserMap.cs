using ChurchWeb.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChurchWeb.Data.Mappings
{
    internal static class UserMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<User>();

            entity.ToTable("User");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
              .ValueGeneratedOnAdd();

            entity.Property(e => e.FirstName)
              .IsRequired()
              .HasColumnType("varchar(50)");

            entity.Property(e => e.LastName)
              .IsRequired()
              .HasColumnType("varchar(50)");

            entity.Property(e => e.Email)
              .IsRequired()
              .HasColumnType("varchar(120)");

            entity.Property(e => e.Password)
              .IsRequired()
              .HasColumnType("varchar(72)");

            entity.HasMany(e => e.Churches)
              .WithOne(e => e.User)
              .HasForeignKey(e => e.UserId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.Email)
              .IsUnique();
        }
    }
}