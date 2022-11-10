using MediatR;
using TeamLunch.Data;

namespace TeamLunch.Commands;

public static class UpdateUserDetails
{
    public record Command(string id, string firstName, string lastName) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _db.Users.Where(x => x.Id == request.id).First();

            user.FirstName = request.firstName;
            user.LastName = request.lastName;

            _db.SaveChanges();

            return new Response();
        }
    }

    public record Response();
}