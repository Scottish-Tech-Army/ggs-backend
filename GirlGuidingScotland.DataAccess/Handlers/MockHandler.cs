using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using GirlGuidingScotland.DataAccess.Interfaces;
using System.Threading.Tasks;

namespace GirlGuidingScotland.DataAccess.Handlers
{
    public class MockHandler : DbHandler, IMockHandler
    {
        public async Task<DbResponse> CreatePerson(string firstName, string lastName)
        {
            var sqlParams = new
            {
                firstName,
                lastName
            };

            var response = await ExecuteAsync(DbConstants.CreatePerson, sqlParams);

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

        public async Task<DbResponse<PersonDto>> GetPeople()
        {
            return await QueryAsync<PersonDto>(DbConstants.GetPeople);
        }

        public async Task<DbResponse<PersonDto>> GetPerson(int personId)
        {
            var sqlParams = new
            {
                personId
            };

            var response = await QuerySingleAsync<PersonDto>(DbConstants.GetPerson, sqlParams);
            
            if (response.Value is not null)
            {
                response.Status = Status.OK;
                return response;
            }

            return new DbResponse<PersonDto>
            {
                Status = Status.Failed,
                Message = "No person found"
            };
        }
    }
}
