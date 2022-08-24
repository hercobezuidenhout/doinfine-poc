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
using TeamLunch.Tests.Fakes;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetFineByIdTests
{
    Mock<DataContext> stubContext;

    [SetUp]
    public void SetUp()
    {
        stubContext = new FakeDataContext().Create();
    }

    [Test]
    public async Task GetFineById_GivenValidRequest_ReturnsValidResponse()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineById.Handler(stubContext.Object);
        var response = await mockQuery.Handle(new GetFineById.Query(1), tcs.Token);

        // Assert
        Assert.True(response.fines.Count > 0);
    }

    [Test]
    public async Task GetFineById_GivenInvalidRequest_ReturnsInvalidResponse()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineById.Handler(stubContext.Object);
        var response = await mockQuery.Handle(new GetFineById.Query(0), tcs.Token);

        // Assert
        Assert.True(response.fines.Count == 0);
    }
}
