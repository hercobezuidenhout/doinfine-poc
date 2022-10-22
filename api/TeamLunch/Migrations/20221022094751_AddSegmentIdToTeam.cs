using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLunch.Migrations
{
    public partial class AddSegmentIdToTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SegmentId",
                table: "Teams",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SegmentId",
                table: "Teams");
        }
    }
}
