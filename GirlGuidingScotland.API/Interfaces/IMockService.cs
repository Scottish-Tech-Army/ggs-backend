using GirlGuidingScotland.API.Models;
using System.Threading.Tasks;

namespace GirlGuidingScotland.API.Interfaces
{
    public interface IMockService
    {
        Task<ResponseModel> GetPerson(int personId);
        Task<ResponseModel> CreatePerson(MockPerson person);
        Task<ResponseModel> GetPeople();
    }
}