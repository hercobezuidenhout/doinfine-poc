using System.Collections.Generic;
using TeamLunch.Data.Entities;
using TeamLunch.Models;

namespace TeamLunch.Tests;

public static class Constants
{
    public static string EXAMPLE_USER_ID = "3e64b61f-ce47-4f30-8d4e-4de4869a07ad";
    public static string EXAMPLE_USERNAME = "billy";
    public static string EXAMPLE_FULLNAME = "Billy Anderson";
    public static int EXAMPLE_TEAM_ID = 1;
    public static string EXAMPLE_TEAM_NAME = "Core";

    public static Team EXAMPLE_TEAM = new Team
    {
        Id = 1,
        Name = "Example Team",
        Users = new List<User>
        {
            new User { Id = "abcd", FirstName = "Billy", LastName = "Anderson" }
        }
    };

    public static NotificationItem EXAMPLE_NOTIFICATION = new NotificationItem
    {
        Title = "Example Notification",
        Description = "This is an example notification",
        Link = "/to/somwhere"
    };
}