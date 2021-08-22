using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using GirlGuidingScotland.DataAccess.Interfaces;

namespace GirlGuidingScotland.DataAccess.Handlers
{
    public class LocationHandler : DbHandler, ILocationHandler
    {
        public async Task<DbResponse> CreateLocation( 
            string name, 
            string description, 
            float latitude, 
            float longitude 
            )
        {
            var sqlParams = new
            {
                name,
                description,
                latitude,
                longitude
            };

            var response = await ExecuteAsync("[CreateLocation]", sqlParams);

            if (response.Count == 1)
            {
                return response;
            }

            return new DbResponse()
            {
                Status = Status.Failed,
                Message = $"{response.Count} Rows have been affected"
            };
        }

        public async Task<DbResponse<LocationDto>> GetLocations()
        {
            return await QueryAsync<LocationDto>("[GetLocations]");
        }

        public async Task<DbResponse<LocationDto>> GetLocation(int locationId)
        {
            var sqlParams = new
            {
                locationId
            };

            var response = await QuerySingleAsync<LocationDto>("[GetLocation]", sqlParams);

            if (response.Value is not null)
            {
                response.Status = Status.OK;
                return response;
            }

            return new DbResponse<LocationDto>
            {
                Status = Status.Failed,
                Message = "No location found"
            };
        }

        public async Task<DbResponse> UpdateLocation(int id, string name, string description, float latitude, float longitude)
        {
            var sqlParams = new
                {
                    id,
                    name,
                    description,
                    latitude,
                    longitude
                };

                var response = await ExecuteAsync("[UpdateLocation]", sqlParams);

                if (response.Count == 1)
                {
                    return response;
                }

                return new DbResponse()
                {
                    Status = Status.Failed,
                    Message = $"{response.Count} Rows have been affected"
                };

        }
    }

}

