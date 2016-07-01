using ChurchWeb.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChurchWeb.Data.Mappings
{
    internal static class AppointmentMap
    {
        public static void Map(ModelBuilder builder)
        {
            var entity = builder.Entity<Appointment>();

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Title)
              .IsRequired()
              .HasColumnType("varchar(100)");

            entity.Property(e => e.Description)
              .HasColumnType("varchar(1000)");

            entity.Property(e => e.BeginDate)
              .IsRequired();

            entity.Property(e => e.EndDate);

            entity.HasOne(e => e.Church)
              .WithMany()
              .HasForeignKey(e => e.ChurchId)
              .OnDelete(DeleteBehavior.Restrict);
        }
    }
}