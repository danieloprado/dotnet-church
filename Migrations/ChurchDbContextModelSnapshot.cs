using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ChurchWeb.Context;

namespace dotnet.Migrations
{
    [DbContext(typeof(ChurchDbContext))]
    partial class ChurchDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("ChurchWeb.Models.Church", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .HasColumnType("varchar(150)");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(150)");

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Phone")
                        .HasColumnType("varchar(20)");

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

            modelBuilder.Entity("ChurchWeb.Models.Informative", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ChurchId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("CreatorId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Message")
                        .IsRequired();

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("ChurchId");

                    b.HasIndex("CreatorId");

                    b.ToTable("Informative");
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

            modelBuilder.Entity("ChurchWeb.Models.Informative", b =>
                {
                    b.HasOne("ChurchWeb.Models.Church")
                        .WithMany()
                        .HasForeignKey("ChurchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ChurchWeb.Models.User")
                        .WithMany()
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
