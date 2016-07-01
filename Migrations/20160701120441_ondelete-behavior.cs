using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet.Migrations
{
    public partial class ondeletebehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Informative_Church_ChurchId",
                table: "Informative");

            migrationBuilder.DropForeignKey(
                name: "FK_Informative_User_CreatorId",
                table: "Informative");

            migrationBuilder.AddForeignKey(
                name: "FK_Informative_Church_ChurchId",
                table: "Informative",
                column: "ChurchId",
                principalTable: "Church",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Informative_User_CreatorId",
                table: "Informative",
                column: "CreatorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Informative_Church_ChurchId",
                table: "Informative");

            migrationBuilder.DropForeignKey(
                name: "FK_Informative_User_CreatorId",
                table: "Informative");

            migrationBuilder.AddForeignKey(
                name: "FK_Informative_Church_ChurchId",
                table: "Informative",
                column: "ChurchId",
                principalTable: "Church",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Informative_User_CreatorId",
                table: "Informative",
                column: "CreatorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
