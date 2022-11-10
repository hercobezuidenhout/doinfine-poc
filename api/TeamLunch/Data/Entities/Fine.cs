using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamLunch.Data.Entities;

public class Fine
{
    public int Id { get; set; }
    public string Reason { get; set; }
    public string UserId { get; set; }
    public bool Paid { get; set; }
}
