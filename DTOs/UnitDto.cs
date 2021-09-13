using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GGS.DTOs
{
    public class UnitDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public virtual ICollection<LocationDto> Locations { get; set; }
    }
}
