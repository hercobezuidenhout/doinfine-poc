namespace MauticNetClient.Models;

public class SegmentEmail<TListType> : Email
{
    public List<TListType> Lists { get; set; }

    public SegmentEmail()
    {
        EmailType = "list";
    }
}