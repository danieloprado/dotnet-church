using ChurchWeb.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet.Migrations
{
    [DbContext(typeof(ChurchDbContext))]
    [Migration("20160525120103_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("ChurchWeb.Models.Church", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Church");
                });

            modelBuilder.Entity("ChurchWeb.Models.ChurchUser", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("ChurchId");

                    b.Property<string>("Role");

                    b.HasKey("UserId", "ChurchId", "Role");

                    b.HasIndex("ChurchId");

                    b.HasIndex("UserId");

                    b.ToTable("ChurchUser");
                });

            modelBuilder.Entity("ChurchWeb.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(120)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(72)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("ChurchWeb.Models.ChurchUser", b =>
                {
                    b.HasOne("ChurchWeb.Models.Church")
                        .WithMany()
                        .HasForeignKey("ChurchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ChurchWeb.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
