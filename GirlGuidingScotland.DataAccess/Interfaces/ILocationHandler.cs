using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using System.Threading.Tasks;

namespace GirlGuidingScotland.DataAccess.Interfaces
{
    public interface ILocationHandler : IDbHandler
    {
        public Task<DbResponse> CreateLocation(
            string name,
            string description,
            float latitude,
            float longitude
        );
        public Task<DbResponse<LocationDto>> GetLocations();
        public Task<DbResponse<LocationDto>> GetLocation(int locationId);
        public Task<DbResponse> UpdateLocation(
            int id,
            string name,
            string description,
            float latitude,
            float longitude
        );
    }
}
