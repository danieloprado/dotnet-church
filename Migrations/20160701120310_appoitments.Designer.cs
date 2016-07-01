using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ChurchWeb.Data;

namespace dotnet.Migrations
{
    [DbContext(typeof(ChurchDbContext))]
    [Migration("20160701120310_appoitments")]
    partial class appoitments
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20896");

            modelBuilder.Entity("ChurchWeb.Domain.Entities.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BeginDate");

                    b.Property<int>("ChurchId");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(1000)");

                    b.Property<DateTime?>("EndDate");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("ChurchId");

                    b.ToTable("Appointment");
                });

            modelBuilder.Entity("ChurchWeb.Domain.Entities.Church", b =>
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

            modelBuilder.Entity("ChurchWeb.Domain.Entities.ChurchUser", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("ChurchId");

                    b.Property<string>("Role");

                    b.HasKey("UserId", "ChurchId", "Role");

                    b.HasIndex("ChurchId");

                    b.HasIndex("UserId");

                    b.ToTable("ChurchUser");
                });

            modelBuilder.Entity("ChurchWeb.Domain.Entities.Informative", b =>
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

            modelBuilder.Entity("ChurchWeb.Domain.Entities.User", b =>
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

            modelBuilder.Entity("ChurchWeb.Domain.Entities.Appointment", b =>
                {
                    b.HasOne("ChurchWeb.Domain.Entities.Church")
                        .WithMany()
                        .HasForeignKey("ChurchId");
                });

            modelBuilder.Entity("ChurchWeb.Domain.Entities.ChurchUser", b =>
                {
                    b.HasOne("ChurchWeb.Domain.Entities.Church")
                        .WithMany()
                        .HasForeignKey("ChurchId");

                    b.HasOne("ChurchWeb.Domain.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("ChurchWeb.Domain.Entities.Informative", b =>
                {
                    b.HasOne("ChurchWeb.Domain.Entities.Church")
                        .WithMany()
                        .HasForeignKey("ChurchId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ChurchWeb.Domain.Entities.User")
                        .WithMany()
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
