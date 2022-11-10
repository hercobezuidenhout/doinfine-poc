namespace MauticNetClient.Models;

public abstract class MauticBase
{
    public int Id { get; set; }
    public bool IsPublished { get; set; }
    public DateTime DateAdded { get; set; }
    public int? CreatedBy { get; set; }
    public string CreatedByUser { get; set; }
    public DateTime DateModified { get; set; }
    public int? ModifiedBy { get; set; }
    public string ModifiedByUser { get; set; }
}