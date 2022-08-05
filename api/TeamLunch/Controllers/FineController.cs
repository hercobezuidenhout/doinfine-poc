using TeamLunch.Commands;
using TeamLunch.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TeamLunch.Controllers;

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

    [HttpGet]
    public async Task<IActionResult> GetById(int Id)
    {
        var response = await mediator.Send(new GetFineById.Query(Id));
        return response == null ? NotFound() : Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddFine(AddFine.Command command) => Ok(await mediator.Send(command));
}
