using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamLunch.Data.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Fine> Fines { get; set; }
        public List<Team> Teams { get; set; }
        public List<FineRequestResponse> FineRequestResponses { get; set; }
        public List<UserNotification> UserNotifications { get; set; }
    }
}