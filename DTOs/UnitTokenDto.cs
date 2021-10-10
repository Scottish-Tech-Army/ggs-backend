using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GGS.Entities;

namespace GGS.DTOs
{
    public class UnitTokenDto
    {
        public string Token { get; set; }
        public virtual ICollection<LocationUnitDto> Locations { get; set; }
    }
}
