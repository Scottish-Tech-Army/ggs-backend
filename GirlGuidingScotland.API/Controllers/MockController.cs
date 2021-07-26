using GirlGuidingScotland.API.Interfaces;
using GirlGuidingScotland.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GirlGuidingScotland.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MockController : ControllerBase
    {
        private readonly IMockService _mockService;

        public MockController(IMockService mockService)
        {
            _mockService = mockService;
        }

        /// <summary>
        /// Gets a person by their PersonId
        /// </summary>
        /// <param name="personId">Person ID to query</param>
        /// <returns>Response Model with Person table information</returns>
        [HttpGet]
        [Route("GetPerson/{personId}")]
        public async Task<ResponseModel> GetPerson(int personId)
        {
            return await _mockService.GetPerson(personId);
        }

        /// <summary>
        /// Get all results from the people table
        /// </summary>
        /// <returns>Response Model with Person table information</returns>
        [HttpGet]
        [Route("GetPeople")]
        public async Task<ResponseModel> GetPeople()
        {
            return await _mockService.GetPeople();
        }

        /// <summary>
        /// Creates a person
        /// </summary>
        /// <param name="person">person model</param>
        /// <returns>Success or fail</returns>
        [HttpPost]
        [Route("CreatePerson")]
        public async Task<ResponseModel> CreatePerson(MockPerson person)
        {
            return await _mockService.CreatePerson(person);
        }
    }
}
