using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GGS.DTOs;
using GGS.Entities;

namespace GGS.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(UnitDto unitDto);
    }
}
