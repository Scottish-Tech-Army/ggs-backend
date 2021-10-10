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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AdminController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [Route("Location")]
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

        [Route("Location")]
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

        [Route("Location")]
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

        // GET: api/<UnitController>
        [Route("Units")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetUnits()
        {
            return await _context.Units
                .Include(o => o.Locations)
                .ThenInclude(u => u.Location)
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        // GET api/<UnitController>/5
        [Route("Unit")]
        [HttpGet("{id}", Name = "GetUnit")]
        public async Task<ActionResult<UnitDto>> GetUnit(int id)
        {
            var unit = await _context.Units
                .Include(o => o.Locations)
                .ThenInclude(u => u.Location)
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == id);
            if (unit == null)
            {
                return NotFound(id);
            }
            return unit;
        }
        [Route("Unit")]
        [HttpPost]
        public async Task<ActionResult<UnitDto>> CreateUnit([FromBody] UnitDto unitDto)
        {
            var unit = new Unit()
            {
                Code = unitDto.Code
            };
            _context.Units.Add(unit);

            if (await _context.SaveChangesAsync() > 0)
            {
                return CreatedAtRoute("GetUnit", new { id = unit.Id }, _mapper.Map<UnitDto>(unit));
            }

            return BadRequest("Error adding new unit");
        }

        [Route("Unit")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUnit([FromForm] Unit unit)
        {
            var dbUnit = await _context.Units.FindAsync(unit.Id);
            if (dbUnit == null)
            {
                return NotFound();
            }

            _mapper.Map(unit, dbUnit);

            _context.Units.Update(dbUnit);

            if (await _context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }

            return BadRequest("Failed to update Unit");
        }

        [Route("Unit")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUnit(int id)
        {
            var unit = await _context.Units.FindAsync(id);
            if (unit == null)
            {
                return NotFound();
            }

            _context.Units.Remove(unit);
            if (await _context.SaveChangesAsync() > 0) return Ok();

            return BadRequest("Failed to Delete Unit");
        }

    }
}
