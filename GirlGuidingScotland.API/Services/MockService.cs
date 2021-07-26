using GirlGuidingScotland.API.Interfaces;
using GirlGuidingScotland.API.Models;
using GirlGuidingScotland.API.Services.Base;
using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GirlGuidingScotland.API.Services
{
    public class MockService : BaseService, IMockService
    {
        private readonly IMockHandler _handler;

        public MockService(IConfiguration config, IMockHandler handler) : base(config, handler)
        {
            _handler = handler;
        }

        public async Task<ResponseModel> GetPerson(int personId)
        {
            var response = await _handler.GetPerson(personId);

            if (response is not null && response.Status == Status.OK)
            {
                return new ResponseModel()
                {
                    Payload = response.Value,
                    StatusCode = 200
                };
            }

            if (response is not null)
            {
                return new ResponseModel()
                {
                    Message = response.Message,
                    StatusCode = 400
                };
            }

            return new ResponseModel()
            {
                StatusCode = 500,
                Message = "Unable to retrieve person"
            };
        }

        public async Task<ResponseModel> CreatePerson(MockPerson person)
        {
            var response = await _handler.CreatePerson(person.FirstName, person.LastName);
            
            if (response.Status == Status.OK)
            {
                return new ResponseModel()
                {
                    StatusCode = 200,
                    Message = "Success"
                };
            }

            return new ResponseModel()
            {
                StatusCode = 500,
                Message = response.Message
            };
        }

        public async Task<ResponseModel> GetPeople()
        {
            var response = await _handler.GetPeople();

            if (response.Data.Count() > 0 && response.Status == Status.OK)
            {
                return new ResponseModel()
                {
                    Payload = response.Data,
                    StatusCode = 200
                };
            }

            if (response is not null)
            {
                return new ResponseModel()
                {
                    StatusCode = 400,
                    Message = "No persons found"
                };
            }

            return new ResponseModel()
            {
                StatusCode = 500,
                Message = "Unable to retrieve Persons Table"
            };
        }
    }
}
