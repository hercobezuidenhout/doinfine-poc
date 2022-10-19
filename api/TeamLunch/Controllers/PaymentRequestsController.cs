using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeamLunch.Commands;
using TeamLunch.Exceptions;
using TeamLunch.Models;
using TeamLunch.Queries;

namespace TeamLunch.Controllers;

[Authorize]
[ApiController]
[Route("/payment-requests")]
public class PaymentRequestsController : ControllerBase
{
    private readonly ILogger<PaymentRequestsController> _logger;
    private readonly IMediator _mediator;

    public PaymentRequestsController(ILogger<PaymentRequestsController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
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
    public async Task<IActionResult> GetAll()
    {
        var userId = ExtractUserId();
        var response = await _mediator.Send(new GetActivePaymentRequests.Query(userId));
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var response = await _mediator.Send(new GetPaymentRequestById.Query(id));
            return response == null ? NotFound() : Ok(response);
        }
        catch (PaymentRequestNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePaymentRequest(PaymentRequestItem item)
    {
        var userId = ExtractUserId();
        var response = await _mediator.Send(new NewPaymentRequest.Command(userId, DateTime.Parse(item.DateOfPayment), item.Action, item.TeamId));
        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePaymentRequest(RequestResponseItem item)
    {
        var userId = ExtractUserId();

        try
        {
            var responseId = await _mediator.Send(new AddPaymentRequestResponse.Command(item.RequestId, userId, item.Approved));
            return Ok(responseId);
        }
        catch (PaymentRequestNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}