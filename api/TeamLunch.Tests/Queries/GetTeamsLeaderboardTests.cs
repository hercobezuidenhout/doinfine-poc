using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Models;
using TeamLunch.Queries;
using TeamLunch.Tests.Fakes;

namespace TeamLunch.Tests;

[TestFixture]
public class GetTeamsLeaderboardTests
{
    Mock<DataContext> stubContext;

    [SetUp]
    public void SetUp()
    {
        stubContext = new FakeDataContext().Create();
    }

    [Test]
    public async Task GetTeamsLeaderboard_ReturnsListOfLeaderboardItems()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetTeamsLeaderboard.Handler(stubContext.Object);
        var response = await mockQuery.Handle(new GetTeamsLeaderboard.Query(), tcs.Token);
        var isListOfLeaderbordItems = typeof(List<LeaderboardItem>) == response.items.GetType();

        // Assert
        Assert.True(isListOfLeaderbordItems);
    }

}