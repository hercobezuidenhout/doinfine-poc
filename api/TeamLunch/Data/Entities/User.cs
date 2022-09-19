namespace TeamLunch.Data.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Fine> Fines { get; set; }
        public List<Team> Teams { get; set; }
        public bool Active { get; set; }
    }
}