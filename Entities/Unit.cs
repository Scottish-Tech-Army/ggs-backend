using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GGS.Entities
{
    public class Unit
    {
        public int Id { get; set; }
        public string  Name { get; set; }
        public string Code { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
    }
}
