using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/leaderboard")]
public class LeaderboardController : ControllerBase {
    private readonly ILogger<LeaderboardController> logger;
    private readonly IMediator mediator;

    public LeaderboardController(ILogger<LeaderboardController> logger, IMediator mediator) {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetLeaderboardForUsers() {
        return Ok();
    }
}