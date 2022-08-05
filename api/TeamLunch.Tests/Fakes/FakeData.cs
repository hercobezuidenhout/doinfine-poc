using System.Collections.Generic;
using TeamLunch.Data.Entities;

namespace TeamLunch.Tests.Fakes
{
    static public class FakeData
    {
        public static List<Fine> Fines = new List<Fine> {
            new Fine { Id = 1, UserId = 1, Reason = "For showing up late to a meeting" }
        };
    }
}