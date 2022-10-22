namespace MauticNetClient.Models;

public class Segment : MauticBase
{
    public string Name { get; set; }
    public string Category { get; set; }
    public string Alias { get; set; }
    public string Description { get; set; }
    public bool IsGlobal { get; set; }
}