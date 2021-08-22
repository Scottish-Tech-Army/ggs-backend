using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GirlGuidingScotland.API.Models;
using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using GirlGuidingScotland.DataAccess.Interfaces;

namespace GirlGuidingScotland.API.Interfaces
{
    public interface ILocationService
    {
        Task<DbResponse<LocationDto>> GetLocations();
        Task<DbResponse<LocationDto>> GetLocation(int id);
        Task<DbResponse> CreateLocation(Location location);
        Task<DbResponse> UpdateLocation(int id, Location location);
    }
}
