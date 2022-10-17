using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using TeamLunch.Exceptions;
using TeamLunch.Queries;

namespace TeamLunch.Tests.Queries;

[TestFixture]
public class GetUserByIdTests : TestDataContextBase
{
    [SetUp]
    public void SetUp()
    {
        _stubContext = CreateContext();
    }

    [Test]
    public async Task Handle_GivenValidId_ReturnsCorrectUser()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);

        // Act
        var mockQuery = new GetUserById.Handler(_stubContext);
        var response = await mockQuery.Handle(new GetUserById.Query(Constants.EXAMPLE_USER_ID), tcs.Token);

        // Assert
        Assert.AreEqual(Constants.EXAMPLE_FULLNAME, response.fullName);
    }

    [Test]
    public async Task Handle_GivenInvalidId_ThrowsUserNotFoundException()
    {
        // Arrange
        var tcs = new CancellationTokenSource(1000);


        // Act
        var mockQuery = new GetUserById.Handler(_stubContext);

        // Assert
        Assert.ThrowsAsync<UserNotFoundException>(async delegate
        {
            await mockQuery.Handle(new GetUserById.Query("ABC"), tcs.Token);
        });
    }
}