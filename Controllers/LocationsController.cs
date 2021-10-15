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
using GGS.Extensions;
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
            var locations = await _context.Locations
                .Include(p => p.Photos)
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            if (User.Identity is {IsAuthenticated: true})
            {
                var code = User.GetCode();
                var unit = await _context.Units
                    .Include(o => o.Locations)
                    .ThenInclude(u => u.Location)
                    .SingleOrDefaultAsync(x => x.Code == code);

                var unitLocationIds = unit.Locations.Select(lu => lu.LocationId);

                locations.ForEach(x => { if (unitLocationIds.Contains(x.Id)) { x.Collected = true; } });
            }

            return locations;
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
    }
}
