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
}