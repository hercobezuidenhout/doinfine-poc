using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TeamLunch.Exceptions;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/teams")]
public class TeamsController : ControllerBase
{
    private readonly ILogger<TeamsController> logger;
    private readonly IMediator mediator;

    public TeamsController(ILogger<TeamsController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var response = await mediator.Send(new GetTeamById.Query(id));
            return Ok(response);
        }
        catch (TeamNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}