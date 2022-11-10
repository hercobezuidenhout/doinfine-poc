using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamLunch.Data.Entities;

public class FineRequest
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Finer { get; set; }
    public string Finee { get; set; }
    public string Reason { get; set; }
    public int TeamId { get; set; }
    public List<FineRequestResponse> Responses { get; set; }
}