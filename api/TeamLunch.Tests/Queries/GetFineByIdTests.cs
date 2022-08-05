using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Data.Entities;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries
{
    [TestFixture]
    public class GetFineByIdTests
    {

        [Test]
        public async Task Handle_GivenValidRequest_ReturnsValidResponse()
        {
            // Arrange
            var data = new List<Fine> {
                new Fine { Id = 1, UserId = 1, Reason = "For showing up late to a meeting" }
            }.AsQueryable();

            var stubSet = new Mock<DbSet<Fine>>();
            stubSet.As<IQueryable<Fine>>().Setup(m => m.Provider).Returns(data.Provider);
            stubSet.As<IQueryable<Fine>>().Setup(m => m.Expression).Returns(data.Expression);
            stubSet.As<IQueryable<Fine>>().Setup(m => m.ElementType).Returns(data.ElementType);
            stubSet.As<IQueryable<Fine>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var stubContext = new Mock<DataContext>();
            stubContext.Setup(c => c.Fines).Returns(stubSet.Object);

            var tcs = new CancellationTokenSource(1000);

            // Act
            var mockQuery = new GetFineById.Handler(stubContext.Object);
            var response = await mockQuery.Handle(new GetFineById.Query(1), tcs.Token);

            // Assert
            Assert.True(response.fines.Count > 0);
        }
    }
}