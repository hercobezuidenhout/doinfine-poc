using MediatR;
using TeamLunch.Data;
using TeamLunch.Data.Entities;

namespace TeamLunch.Commands;

public static class AddUserNotifications
{

    public record Command(List<UserNotification> notifications) : IRequest<Response>;

    public class Handler : IRequestHandler<Command, Response>
    {
        private readonly DataContext _db;

        public Handler(DataContext db)
        {
            _db = db;
        }

        public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
        {
            _db.UserNotifications.AddRange(request.notifications);
            _db.SaveChanges();

            return new Response();
        }
    }

    public record Response();

}