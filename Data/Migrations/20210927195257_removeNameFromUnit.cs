using Microsoft.EntityFrameworkCore.Migrations;

namespace GGS.Data.Migrations
{
    public partial class removeNameFromUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Units");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Units",
                type: "TEXT",
                nullable: true);
        }
    }
}
