using Corporate.Commands;
using Corporate.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Corporate.Controllers;

[ApiController]
[Route("[controller]")]
public class FineController : ControllerBase
{

    private readonly ILogger<FineController> logger;
    private readonly IMediator mediator;

    public FineController(ILogger<FineController> logger, IMediator mediator)
    {
        this.logger = logger;
        this.mediator = mediator;
    }

    [HttpGet(Name = "GetFine")]
    public async Task<IActionResult> Get(int Id)
    {
        var response = await mediator.Send(new GetFineById.Query(Id));
        return response == null ? NotFound() : Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddFine(AddFine.Command command) => Ok(await mediator.Send(command));
}