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
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GGS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        // GET: api/<UnitController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetUnits()
        {
            return await _context.Units
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        // GET api/<UnitController>/5
        [HttpGet("{id}", Name = "GetUnit")]
        public async Task<ActionResult<UnitDto>> GetUnit(int id)
        {
            var unit = await _context.Units
                .Include(u => u.Locations)
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == id);
            if (unit == null)
            {
                return NotFound(id);
            }
            return unit;
        }

        // POST api/<UnitController>
        [HttpPost]
        public async Task<ActionResult<UnitDto>> CreateUnit([FromBody] UnitDto unitDto)
        {
            var unit = new Unit()
            {
                Name = unitDto.Name,
                Code = unitDto.Code
            };
            _context.Units.Add(unit);

            if (await _context.SaveChangesAsync() > 0)
            {
                return CreatedAtRoute("GetUnit", new { id = unit.Id }, _mapper.Map<UnitDto>(unit));
            }

            return BadRequest("Error adding new unit");
        }

        // PUT api/<UnitController>/5
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

        // DELETE api/<UnitController>/5
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
