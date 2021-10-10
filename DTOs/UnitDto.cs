using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GGS.Entities;

namespace GGS.DTOs
{
    public class UnitDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public virtual ICollection<LocationUnitDto> Locations { get; set; }
    }
}
