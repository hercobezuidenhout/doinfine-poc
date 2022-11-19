using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TeamLunch.Models;
using TeamLunch.Exceptions;
using TeamLunch.Contracts;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/fine-requests")]
public class FineRequestsController : ControllerBase
{
    private readonly ILogger<FineRequestsController> logger;
    private readonly IMediator mediator;

    public FineRequestsController(ILogger<FineRequestsController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    private string ExtractUserId()
    {
        var request = Request;
        var headers = request.Headers;
        var authorization = headers.Authorization[0];
        var startIndex = authorization.IndexOf(" ") + 1;
        var accessToken = authorization.Substring(startIndex, authorization.Length - startIndex);
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(accessToken);
        var userId = jwt.Claims.First(claim => claim.Type == "sub").Value;
        return userId;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int teamId)
    {
        var userId = ExtractUserId();
        try
        {
            var response = await mediator.Send(new GetActiveFineRequests.Query(userId, teamId));
            return Ok(response);
        }
        catch (UnauthorizedAccessException exception)
        {
            return Unauthorized(exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            return Ok("The server has failed.");
        }

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var userId = ExtractUserId();
            var response = await mediator.Send(new GetFineRequestById.Query(id, userId));
            return response == null ? NotFound() : Ok(response);
        }
        catch (FineRequestNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddFineRequest(FineRequestItem item)
    {
        var userId = ExtractUserId();

        var fineRequestId = await mediator.Send(new NewFineRequest.Command { UserId = userId, TeamId = item.TeamId, Finee = item.Finee, Reason = item.Reason });

        return Ok(fineRequestId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateFineRequest(RequestResponseItem item)
    {
        var userId = ExtractUserId();

        try
        {
            var responseId = await mediator.Send(new AddFineRequestResponse.Command(item.RequestId, userId, item.Approved));

            return Ok(responseId);
        }
        catch (FineRequestNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}