using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamLunch.Data.Entities
{
    public class Fine {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Reason { get; set; }
        public int UserId { get; set; }
        public bool Active { get; set; }
    }
}