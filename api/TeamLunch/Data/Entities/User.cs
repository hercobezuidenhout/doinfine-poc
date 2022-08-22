namespace TeamLunch.Data.Entities
{
    public class User {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public List<Fine> Fines { get; set; }
        public bool Active { get; set; }
    }
}