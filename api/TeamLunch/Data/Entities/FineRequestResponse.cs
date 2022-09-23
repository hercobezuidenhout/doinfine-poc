namespace TeamLunch.Data.Entities;

public class FineRequestResponse
{
    public int Id { get; set; }
    public int FineRequestId { get; set; }
    public string UserId { get; set; }
    public bool Approved { get; set; }
}