using ChurchWeb.Context.Mappings;
using ChurchWeb.Context.Seeds;
using ChurchWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Context
{
    public class ChurchDbContext : DbContext
    {
        protected ChurchDbContext()
        {
        }

        public ChurchDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Church> Churches { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
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