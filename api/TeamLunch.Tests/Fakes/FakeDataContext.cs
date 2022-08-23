using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;
using TeamLunch.Data;
using TeamLunch.Data.Entities;

namespace TeamLunch.Tests.Fakes;

public class FakeDataContext
{
    public Mock<DbSet<Fine>> FakeDbSetFines()
    {
        var stubSet = new Mock<DbSet<Fine>>();
        var data = FakeData.Fines.AsQueryable();

        stubSet.As<IQueryable<Fine>>().Setup(m => m.Provider).Returns(data.Provider);
        stubSet.As<IQueryable<Fine>>().Setup(m => m.Expression).Returns(data.Expression);
        stubSet.As<IQueryable<Fine>>().Setup(m => m.ElementType).Returns(data.ElementType);
        stubSet.As<IQueryable<Fine>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

        return stubSet;
    }

    public Mock<DataContext> Create()
    {
        var stubContext = new Mock<DataContext>();
        stubContext.Setup(c => c.Fines).Returns(FakeDbSetFines().Object);
        return stubContext;
    }
}
