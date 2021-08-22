using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GirlGuidingScotland.API.Interfaces;
using GirlGuidingScotland.API.Models;
using GirlGuidingScotland.API.Services;
using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GirlGuidingScotland.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        // GET: api/<LocationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            var locations = await _locationService.GetLocations();

            if (locations.Data.Any() && locations.Status == Status.OK)
            {
                return Ok(locations.Data);
            }
            if (locations != null)
            {
                return NotFound("No locations found");
            }

            return BadRequest("Unable to retrieveLocations");

        }

        // GET api/<LocationController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            var location = await _locationService.GetLocation(id);

            if (location != null && location.Status == Status.OK)
            {
                return Ok(location.Value);
            }
            if (location != null)
            {
                return NotFound("No location found");
            }

            return BadRequest("Unable to retrieve the location");
        }

        // POST api/<LocationController>
        [HttpPost]
        public async Task<ActionResult> CreateLocation([FromBody] Location location)
        {
            var response = await _locationService.CreateLocation(location);

            if (response.Status == Status.OK)
            {
                return Ok();
            }

            return BadRequest("Failed to create location");
        }

        // PUT api/<LocationController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLocation(int id, [FromBody] Location location)
        {
            var response = await _locationService.UpdateLocation(id, location);

            if (response.Status == Status.OK)
            {
                return Ok();
            }

            return BadRequest("Failed to create location");
        }

        // DELETE api/<LocationController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
