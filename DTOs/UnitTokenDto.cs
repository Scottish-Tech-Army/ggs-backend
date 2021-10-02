using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GGS.DTOs
{
    public class UnitTokenDto
    {
        public string Token { get; set; }
        public virtual LocationDto Locations { get; set; }
    }
}
