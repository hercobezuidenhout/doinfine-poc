using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLunch.Migrations
{
    public partial class AddFineRequestFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "SegmentId",
                table: "Teams",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FineId",
                table: "FineRequests",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "FineRequests",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FineId",
                table: "FineRequests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "FineRequests");

            migrationBuilder.AlterColumn<int>(
                name: "SegmentId",
                table: "Teams",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
