using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Data;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetFineByIdTests : TestDataContextBase
{

    [SetUp]
    public void SetUp()
    {
        _stubContext = new DataContext(_contextOptions);
    }

    [Test]
    public async Task GetFineById_GivenValidRequest_ReturnsValidResponse()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineById.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetFineById.Query(Constants.EXAMPLE_USER_ID), tcs.Token);

        // Assert
        Assert.True(response.fines.Count > 0);
    }

    [Test]
    public async Task GetFineById_GivenInvalidRequest_ReturnsInvalidResponse()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetFineById.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetFineById.Query("abc"), tcs.Token);

        // Assert
        Assert.True(response.fines.Count == 0);
    }
}
