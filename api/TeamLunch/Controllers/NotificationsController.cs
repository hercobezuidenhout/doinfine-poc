using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly ILogger<NotificationsController> logger;
    private readonly IMediator mediator;

    public NotificationsController(ILogger<NotificationsController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await mediator.Send(new GetNotifications.Query());
        return response == null ? NotFound() : Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateNotification.Command comand)
    {
        var response = await mediator.Send(comand);
        return Ok(response);
    }
}