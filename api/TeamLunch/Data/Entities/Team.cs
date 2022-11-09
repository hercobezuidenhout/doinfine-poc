namespace TeamLunch.Data.Entities;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<User> Users { get; set; }
    public long SegmentId { get; set; }
}