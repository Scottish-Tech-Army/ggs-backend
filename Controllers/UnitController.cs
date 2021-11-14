using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using GGS.Data;
using GGS.DTOs;
using GGS.Entities;
using GGS.Extensions;
using GGS.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UnitTokenDto>> Login(UnitLoginDto unitLoginDto)
        {
            var unit = await _context.Units
                .Where(x => x.Code == unitLoginDto.Code)
                .Include(o => o.Locations)
                .ThenInclude(u => u.Location)
                .ProjectTo<UnitDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            if (unit == null) return Unauthorized("Invalid code");

            return new UnitTokenDto
            {
                Token = _tokenService.CreateToken(unit),
            };
        }

        [Authorize]
        [Route("collect")]
        [HttpPost]
        public async Task<ActionResult<UnitDto>> CollectLocation(CollectionDto collectionDto)
        {
            var code = User.GetCode();
            var unit = await _context.Units
                .Include(o => o.Locations)
                .ThenInclude(u => u.Location)
                .SingleOrDefaultAsync(x => x.Code == code);

            var location = await _context.Locations
                .SingleOrDefaultAsync(x => x.Id == collectionDto.Id);
            if (location == null)
            {
                return NotFound("Location not found");
            }

            var locationCheck = unit.Locations.FirstOrDefault(l => l.LocationId == collectionDto.Id);
            if (locationCheck != null)
            {
                return BadRequest("location has already been collected");
            }

            var locationUnit = new LocationUnit()

            {
                Location = location,
                Unit = unit,
            };
            _context.LocationUnits.Add(locationUnit);
            unit.Locations.Add(locationUnit);

            _context.Units.Update(unit);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return BadRequest("Error adding new unit");
        }

        [Authorize]
        [Route("collected")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetUnitLocations()
        {
            var code = User.GetCode();
            var locationUnits = await _context.LocationUnits
                .Include(o => o.Location)
                .Where(x => x.Unit.Code == code)
                .ProjectTo<LocationUnitDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var alteredLocations = locationUnits.Select(l =>
            {
                l.Location.Collected = true;
                return l.Location;
            }).ToList();

            return Ok(alteredLocations);
        }
    }
}
