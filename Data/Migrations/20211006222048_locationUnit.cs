using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GGS.Data.Migrations
{
    public partial class locationUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Locations_LocationsId",
                table: "LocationUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Units_UnitsId",
                table: "LocationUnit");

            migrationBuilder.RenameColumn(
                name: "UnitsId",
                table: "LocationUnit",
                newName: "UnitId");

            migrationBuilder.RenameColumn(
                name: "LocationsId",
                table: "LocationUnit",
                newName: "LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnit_UnitsId",
                table: "LocationUnit",
                newName: "IX_LocationUnit_UnitId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "LocationUnit",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Locations_LocationId",
                table: "LocationUnit",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Units_UnitId",
                table: "LocationUnit",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Locations_LocationId",
                table: "LocationUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Units_UnitId",
                table: "LocationUnit");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "LocationUnit");

            migrationBuilder.RenameColumn(
                name: "UnitId",
                table: "LocationUnit",
                newName: "UnitsId");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "LocationUnit",
                newName: "LocationsId");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnit_UnitId",
                table: "LocationUnit",
                newName: "IX_LocationUnit_UnitsId");

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Locations_LocationsId",
                table: "LocationUnit",
                column: "LocationsId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Units_UnitsId",
                table: "LocationUnit",
                column: "UnitsId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
