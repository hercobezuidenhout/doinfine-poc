using System.Collections.Generic;
using System.Linq;
using TeamLunch.Data.Entities;

namespace TeamLunch.Tests.Fakes;

static public class FakeData
{
    public static List<Fine> Fines = new List<Fine>
    {
        new Fine { Id = 1, Reason = "For showing up late to a meeting.", UserId = 1 },
        new Fine { Id = 2, Reason = "For leaving a dirty pull request.", UserId = 1 },
        new Fine { Id = 3, Reason = "For wearing a Manchester United shirt.", UserId = 1 },
        new Fine { Id = 4, Reason = "For pushing a secret into remote.", UserId = 2 },
        new Fine { Id = 5, Reason = "For not using the team's virtual background.", UserId = 2 },
        new Fine { Id = 6, Reason = "For leaving without completing the pull request.", UserId = 2 },
        new Fine { Id = 7, Reason = "For loving coffee way too much.", UserId = 2 },
        new Fine { Id = 8, Reason = "For showing up late to the office.", UserId = 3 }
    };

    public static List<User> Users = new List<User>
    {
        new User { Id = 1, Username = "billy", FirstName = "Billy", LastName = "Anderson", Fines = Fines.Where(fine => fine.UserId == 1).ToList() },
        new User { Id = 2, Username = "steve", FirstName = "Steve", LastName = "Walkman", Fines = Fines.Where(fine => fine.UserId == 2).ToList() },
        new User { Id = 3, Username = "andrew", FirstName = "Andrew", LastName = "Pint", Fines = Fines.Where(fine => fine.UserId == 3).ToList() }
    };
}
