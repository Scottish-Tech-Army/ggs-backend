using Microsoft.EntityFrameworkCore.Migrations;

namespace GGS.Data.Migrations
{
    public partial class renameUnitId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Units_UnitsID",
                table: "LocationUnit");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Units",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UnitsID",
                table: "LocationUnit",
                newName: "UnitsId");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnit_UnitsID",
                table: "LocationUnit",
                newName: "IX_LocationUnit_UnitsId");

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Units_UnitsId",
                table: "LocationUnit",
                column: "UnitsId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Units_UnitsId",
                table: "LocationUnit");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Units",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UnitsId",
                table: "LocationUnit",
                newName: "UnitsID");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnit_UnitsId",
                table: "LocationUnit",
                newName: "IX_LocationUnit_UnitsID");

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnit_Units_UnitsID",
                table: "LocationUnit",
                column: "UnitsID",
                principalTable: "Units",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
