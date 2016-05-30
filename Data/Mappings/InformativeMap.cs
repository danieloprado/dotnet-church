using ChurchWeb.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data.Mappings
{
    internal static class InformativeMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<Informative>();

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Title)
                .IsRequired()
                .HasColumnType("varchar(100)");

            entity.Property(e => e.Date)
                .IsRequired();

            entity.Property(e => e.Message)
                .IsRequired();

            //FK
            entity.HasOne(e => e.Church)
                .WithMany()
                .HasForeignKey(e => e.ChurchId);

            entity.HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatorId);

        }
    }
}