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
    private readonly ILogger<UsersController> _logger;
    private readonly IMediator _mediator;

    public UsersController(ILogger<UsersController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            var response = await _mediator.Send(new GetUserById.Query(id));
            return Ok(response);
        }
        catch (UserNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUserDetails(UpdateUserItem item)
    {
        var request = Request;
        var headers = request.Headers;
        var authorization = headers.Authorization[0];
        var startIndex = authorization.IndexOf(" ") + 1;
        var accessToken = authorization.Substring(startIndex, authorization.Length - startIndex);
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(accessToken);
        var userId = jwt.Claims.First(claim => claim.Type == "sub").Value;

        var response = await _mediator.Send(new UpdateUserDetails.Command(userId, item.FirstName, item.LastName));
        return Ok(response);
    }
}