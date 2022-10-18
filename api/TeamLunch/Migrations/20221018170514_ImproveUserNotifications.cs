using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamLunch.Migrations
{
    public partial class ImproveUserNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Read",
                table: "Notifications");

            migrationBuilder.CreateTable(
                name: "UserNotifications",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NotificationId = table.Column<int>(type: "int", nullable: false),
                    Read = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotifications", x => new { x.UserId, x.NotificationId });
                    table.ForeignKey(
                        name: "FK_UserNotifications_Notifications_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserNotifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "FineRequests",
                columns: new[] { "Id", "Finee", "Finer", "Reason", "TeamId" },
                values: new object[,]
                {
                    { 1, "dd760d11-91ed-4a32-9810-683f7df14239", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "not caring enough about water", 1 },
                    { 2, "dd760d11-91ed-4a32-9810-683f7df14239", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "not caring enough about dogs", 1 },
                    { 3, "dd760d11-91ed-4a32-9810-683f7df14239", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "not caring enough about something else", 1 },
                    { 4, "dd760d11-91ed-4a32-9810-683f7df14239", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "not caring enough about something else", 1 },
                    { 5, "dd760d11-91ed-4a32-9810-683f7df14239", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "not caring enough about something else", 1 }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Core" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName" },
                values: new object[,]
                {
                    { "3e64b61f-ce47-4f30-8d4e-4de4869a07ad", "Billy", "Anderson" },
                    { "dd760d11-91ed-4a32-9810-683f7df14239", "Steve", "Walkman" }
                });

            migrationBuilder.InsertData(
                table: "FineRequestResponses",
                columns: new[] { "Id", "Approved", "FineRequestId", "UserId" },
                values: new object[] { 1, true, 5, "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" });

            migrationBuilder.InsertData(
                table: "Fines",
                columns: new[] { "Id", "Paid", "Reason", "UserId" },
                values: new object[,]
                {
                    { 1, false, "For showing up late to a meeting.", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
                    { 2, false, "For leaving a dirty pull request.", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
                    { 3, false, "For wearing a Manchester United shirt.", "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
                    { 4, false, "For pushing a secret into remote.", "dd760d11-91ed-4a32-9810-683f7df14239" },
                    { 5, false, "For not using the team's virtual background.", "dd760d11-91ed-4a32-9810-683f7df14239" },
                    { 6, false, "For leaving without completing the pull request.", "dd760d11-91ed-4a32-9810-683f7df14239" },
                    { 7, false, "For loving coffee way too much.", "dd760d11-91ed-4a32-9810-683f7df14239" }
                });

            migrationBuilder.InsertData(
                table: "TeamUser",
                columns: new[] { "TeamsId", "UsersId" },
                values: new object[,]
                {
                    { 1, "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" },
                    { 1, "dd760d11-91ed-4a32-9810-683f7df14239" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserNotifications_NotificationId",
                table: "UserNotifications",
                column: "NotificationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserNotifications");

            migrationBuilder.DeleteData(
                table: "FineRequestResponses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FineRequests",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FineRequests",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FineRequests",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FineRequests",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Fines",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "TeamUser",
                keyColumns: new[] { "TeamsId", "UsersId" },
                keyValues: new object[] { 1, "3e64b61f-ce47-4f30-8d4e-4de4869a07ad" });

            migrationBuilder.DeleteData(
                table: "TeamUser",
                keyColumns: new[] { "TeamsId", "UsersId" },
                keyValues: new object[] { 1, "dd760d11-91ed-4a32-9810-683f7df14239" });

            migrationBuilder.DeleteData(
                table: "FineRequests",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "3e64b61f-ce47-4f30-8d4e-4de4869a07ad");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "dd760d11-91ed-4a32-9810-683f7df14239");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Read",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
