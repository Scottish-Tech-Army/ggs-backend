using System;

namespace GGS.Entities
{
    public class LocationUnit
    {
        public int UnitId { get; set; }
        public virtual Unit Unit { get; set; }
        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}