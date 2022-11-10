using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Models;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetTeamsLeaderboardTests : TestDataContextBase
{

    [SetUp]
    public void SetUp()
    {
        _stubContext = new DataContext(_contextOptions);
    }

    [Test]
    public async Task GetTeamsLeaderboard_ReturnsListOfLeaderboardItems()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetTeamsLeaderboard.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetTeamsLeaderboard.Query(), tcs.Token);
        var isListOfLeaderbordItems = typeof(List<LeaderboardItem>) == response.items.GetType();

        // Assert
        Assert.True(isListOfLeaderbordItems);
    }

}