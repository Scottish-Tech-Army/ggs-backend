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
        private readonly ITokenService _tokenService;
        public UnitController(DataContext context, IMapper mapper, ITokenService tokenService)
        {
            _mapper = mapper;
            _tokenService = tokenService;
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

        [Route("collect")]
        [HttpPost]
        public async Task<ActionResult<UnitDto>> CollectLocation(int unitId, int locationId)
        {
            var unit = await _context.Units
                .Include(u => u.Locations)
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == unitId);
            if (unit == null)
            {
                return NotFound(unitId);
            }

            var location = await _context.Locations
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == locationId);
            if (location == null)
            {
                return NotFound(locationId);
            }

            if (await _context.SaveChangesAsync() > 0)
            {
                return CreatedAtRoute("GetUnit", new { id = unit.Id }, _mapper.Map<UnitDto>(unit));
            }

            return BadRequest("Error adding new unit");
        }
    }
}
