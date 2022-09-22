using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TeamLunch.Models;
using TeamLunch.Exceptions;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/users")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> logger;
    private readonly IMediator mediator;

    public UsersController(ILogger<UsersController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            var response = await mediator.Send(new GetUserById.Query(id));
            return Ok(response);
        }
        catch (UserNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}