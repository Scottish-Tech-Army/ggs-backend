using GirlGuidingScotland.DataAccess.DTOs;
using GirlGuidingScotland.DataAccess.Handlers.Base;
using System.Threading.Tasks;

namespace GirlGuidingScotland.DataAccess.Interfaces
{
    public interface IMockHandler : IDbHandler
    {
        Task<DbResponse> CreatePerson(string firstName, string LastName);
        Task<DbResponse<PersonDto>> GetPeople();
        Task<DbResponse<PersonDto>> GetPerson(int personId);
    }
}
