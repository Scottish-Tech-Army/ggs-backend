using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using GGS.Data;
using GGS.DTOs;
using GGS.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GGS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LocationsController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LocationsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/<LocationsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
        {
            return await _context.Locations
                .Include(p => p.Photos)
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        // GET api/<LocationsController>/5
        [HttpGet("{id}", Name = "GetLocation")]
        public async Task<ActionResult<LocationDto>> GetLocation(int id)
        { 
            var location = await _context.Locations
                .Include(p => p.Photos)
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == id);
           if (location == null)
            {
                return NotFound(id);
            }
           return location;
        }

        // POST api/<LocationsController>
        [HttpPost]
        public async Task<ActionResult<LocationDto>> CreateLocation([FromBody] LocationDto locationDto)
        {
            var location = new Location()
            {
                Name = locationDto.Name,
                Description = locationDto.Description,
                Latitude = locationDto.Latitude,
                Longitude = locationDto.Longitude
            };
            _context.Locations.Add(location);

            if (await _context.SaveChangesAsync() > 0)
            {
                return CreatedAtRoute("GetLocation", new { id = location.Id }, _mapper.Map<LocationDto>(location));
            }

            return BadRequest("Error adding new location");
        }

        // PUT api/<LocationsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLocation([FromForm] Location location)
        {
            var dbLocation = await _context.Locations.FindAsync(location.Id);
            if (dbLocation == null)
            {
                return NotFound();
            }

            _mapper.Map(location, dbLocation);

            _context.Locations.Update(dbLocation);

            if (await _context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }

            return BadRequest("Failed to update location");
        }

        // DELETE api/<LocationsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _context.Locations.Remove(location);
            if (await _context.SaveChangesAsync() > 0) return Ok();

            return BadRequest("Failed to Delete location");
        }
    }
}
