using Microsoft.EntityFrameworkCore.Migrations;

namespace GGS.Data.Migrations
{
    public partial class addLocationUnits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Locations_LocationId",
                table: "LocationUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnit_Units_UnitId",
                table: "LocationUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LocationUnit",
                table: "LocationUnit");

            migrationBuilder.RenameTable(
                name: "LocationUnit",
                newName: "LocationUnits");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnit_UnitId",
                table: "LocationUnits",
                newName: "IX_LocationUnits_UnitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LocationUnits",
                table: "LocationUnits",
                columns: new[] { "LocationId", "UnitId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnits_Locations_LocationId",
                table: "LocationUnits",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LocationUnits_Units_UnitId",
                table: "LocationUnits",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnits_Locations_LocationId",
                table: "LocationUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_LocationUnits_Units_UnitId",
                table: "LocationUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LocationUnits",
                table: "LocationUnits");

            migrationBuilder.RenameTable(
                name: "LocationUnits",
                newName: "LocationUnit");

            migrationBuilder.RenameIndex(
                name: "IX_LocationUnits_UnitId",
                table: "LocationUnit",
                newName: "IX_LocationUnit_UnitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LocationUnit",
                table: "LocationUnit",
                columns: new[] { "LocationId", "UnitId" });

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
    }
}
