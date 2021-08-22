using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GirlGuidingScotland.API.Interfaces;
using GirlGuidingScotland.API.Models;
using GirlGuidingScotland.API.Services.Base;
using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using GirlGuidingScotland.DataAccess.Interfaces;
using Microsoft.Extensions.Configuration;

namespace GirlGuidingScotland.API.Services
{
    public class LocationService : BaseService, ILocationService
    {
        private readonly ILocationHandler _handler;

        public LocationService(IConfiguration config, ILocationHandler handler) : base(config, handler)
        {
            _handler = handler;
        }
        public async Task<DbResponse<LocationDto>> GetLocations()
        {
            var response = await _handler.GetLocations();

            return response;
        }

        public async Task<DbResponse<LocationDto>> GetLocation(int id)
        {
            var response = await _handler.GetLocation(id);

            return response;
        }

        public async Task<DbResponse> CreateLocation(Location location)
        {
            var response = await _handler.CreateLocation(
                location.Name,
                location.Description,
                location.Latitude,
                location.Longitude
            );
            return response;
        }

        public async Task<DbResponse> UpdateLocation(int id, Location location)
        {
            var response = await _handler.UpdateLocation(
                id,
                location.Name,
                location.Description,
                location.Latitude,
                location.Longitude
            );
            return response;
        }
    }
}
