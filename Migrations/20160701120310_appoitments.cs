using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet.Migrations
{
    public partial class appoitments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChurchUser_Church_ChurchId",
                table: "ChurchUser");

            migrationBuilder.DropForeignKey(
                name: "FK_ChurchUser_User_UserId",
                table: "ChurchUser");

            migrationBuilder.CreateTable(
                name: "Appointment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:Serial", true),
                    BeginDate = table.Column<DateTime>(nullable: false),
                    ChurchId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(type: "varchar(1000)", nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    Title = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointment_Church_ChurchId",
                        column: x => x.ChurchId,
                        principalTable: "Church",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointment_ChurchId",
                table: "Appointment",
                column: "ChurchId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChurchUser_Church_ChurchId",
                table: "ChurchUser",
                column: "ChurchId",
                principalTable: "Church",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChurchUser_User_UserId",
                table: "ChurchUser",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChurchUser_Church_ChurchId",
                table: "ChurchUser");

            migrationBuilder.DropForeignKey(
                name: "FK_ChurchUser_User_UserId",
                table: "ChurchUser");

            migrationBuilder.DropTable(
                name: "Appointment");

            migrationBuilder.AddForeignKey(
                name: "FK_ChurchUser_Church_ChurchId",
                table: "ChurchUser",
                column: "ChurchId",
                principalTable: "Church",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChurchUser_User_UserId",
                table: "ChurchUser",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
