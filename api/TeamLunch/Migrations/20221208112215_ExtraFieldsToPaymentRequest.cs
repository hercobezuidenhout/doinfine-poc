using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLunch.Migrations
{
    public partial class ExtraFieldsToPaymentRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaymentId",
                table: "PaymentRequests",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "PaymentRequests",
                type: "integer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "PaymentRequests");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PaymentRequests");
        }
    }
}
