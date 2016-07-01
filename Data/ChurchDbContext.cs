using ChurchWeb.Data.Mappings;
using ChurchWeb.Data.Seeds;
using ChurchWeb.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data
{
    public class ChurchDbContext : DbContext
    {
        protected ChurchDbContext()
        {
        }

        public ChurchDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<Church> Churches { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Informative> Informatives { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            AppointmentMap.Map(builder);
            ChurchMap.Map(builder);
            ChurchUserMap.Map(builder);
            InformativeMap.Map(builder);
            UserMap.Map(builder);

            base.OnModelCreating(builder);
        }

        public void Seed()
        {
            var church = ChurchSeed.Seed(this);
            UserSeed.Seed(this, church);
        }

    }
}