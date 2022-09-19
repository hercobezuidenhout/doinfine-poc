using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TeamLunch.Models;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/fines")]
public class FineController : ControllerBase
{
    private readonly ILogger<FineController> logger;
    private readonly IMediator mediator;

    public FineController(ILogger<FineController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var response = await mediator.Send(new GetFineById.Query(id));
        return response == null ? NotFound() : Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddFine(FineRequestItem item)
    {
        Console.WriteLine(item.Finee + " " + item.Reason);
        var request = Request;
        var headers = request.Headers;
        var authorization = headers.Authorization[0];
        var startIndex = authorization.IndexOf(" ") + 1;
        var accessToken = authorization.Substring(startIndex, authorization.Length - startIndex);
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(accessToken);
        var userId = jwt.Claims.First(claim => claim.Type == "sub").Value;

        var fineRequestId = await mediator.Send(new NewFineRequest.Command { UserId = userId, Finee = item.Finee, Reason = item.Reason });

        var notificationId = await mediator.Send(new NewNotification.Command
        {
            Title = "New fine has been submitted",
            Description = item.Reason,
            Link = "/requests/fine/" + fineRequestId
        });

        return Ok(fineRequestId);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> MarkFineAsPaid(MarkFineAsPaid.Command command) => Ok(await mediator.Send(command));
}