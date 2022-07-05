using Corporate.Data;
using Corporate.Data.Entities;

namespace Corporate.Data
{
    public class Repository {
        public List<Fine> Fines { get; } = new List<Fine> {
            new Fine { Id = 1, Reason = "For showing up late." },
            new Fine { Id = 2, Reason = "For making bad pull requests." }
        };
    }    
}