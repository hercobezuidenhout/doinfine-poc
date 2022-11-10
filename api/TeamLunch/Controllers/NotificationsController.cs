using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TeamLunch.Data.Entities;
using TeamLunch.Models;

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
        var request = Request;
        var headers = request.Headers;
        var authorization = headers.Authorization[0];
        var startIndex = authorization.IndexOf(" ") + 1;
        var accessToken = authorization.Substring(startIndex, authorization.Length - startIndex);
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(accessToken);
        var userId = jwt.Claims.First(claim => claim.Type == "sub").Value;
        var response = await mediator.Send(new GetNotifications.Query(userId));
        return response == null ? NotFound() : Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateNotificationItem item)
    {
        var request = Request;
        var headers = request.Headers;
        var authorization = headers.Authorization[0];
        var startIndex = authorization.IndexOf(" ") + 1;
        var accessToken = authorization.Substring(startIndex, authorization.Length - startIndex);
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(accessToken);
        var userId = jwt.Claims.First(claim => claim.Type == "sub").Value;

        var response = await mediator.Send(new UpdateNotification.Command(userId, item.NotificationId));
        return Ok(response);
    }
}