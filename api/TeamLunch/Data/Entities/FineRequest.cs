using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamLunch.Data.Entities;

public class FineRequest
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int Finer { get; set; }
    public int Finee { get; set; }
    public string Reason { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime DateCreated { get; set; }
}