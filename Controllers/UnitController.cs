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
        public async Task<IActionResult> CollectLocation(CollectionDto collectionDto)
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
                return NotFound(new { Message = "Location not found" });
            }

            var locationCheck = unit.Locations.FirstOrDefault(l => l.LocationId == collectionDto.Id);
            if (locationCheck != null)
            {
                return BadRequest(new { Message = "Location has already been collected"});
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
                return new OkObjectResult(new { Message = "Collected!!" });
            }

            return BadRequest(new { Message = "Error adding new unit"});
        }

        [Authorize]
        [Route("collected")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetUnitLocations()
        {
            var code = User.GetCode();
            var locationUnits = await _context.LocationUnits
                .Include(o => o.Location)
                .Where(x => x.Unit.Code == code)
                .ProjectTo<LocationUnitDto>(_mapper.ConfigurationProvider)
                .Select(l => l.Location)
                .ToListAsync();

            locationUnits.ForEach(x => { x.Collected = true; });

            return Ok(locationUnits);
        }    
        
        [Authorize]
        [Route("leaderboard")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaderboardDto>>> GetLeaderboard()
        {
            var code = User.GetCode();

            var collectedCount = _context.LocationUnits
                .Include(o => o.Location)
                .Where(x => x.Unit.Code == code)
                .Select(lu => lu.Location)
                .GroupBy(n => n.Area)
                .Select(n => new
                {
                    Area = n.Key,
                    Count = n.Count()
                })
                .OrderBy(n => n.Area)
                .ToList();

            var areaTotals = _context.Locations
                .GroupBy(n => n.Area)
                .Select(n => new
                {
                    Name = n.Key,
                    Count = n.Count()
                })
                .OrderBy(n => n.Name);

            var results = new List<LeaderboardDto>();
            foreach (var area in areaTotals)
            {
                var collected = collectedCount
                    .FirstOrDefault(c => c.Area == area.Name);

                var leaderboard = new LeaderboardDto()
                {
                    Area = area.Name,
                    PercentageCollected = 0
                };
                if (collected != null)
                { 
                    leaderboard.PercentageCollected = (int) Math.Round((double)(100 * collected.Count) / area.Count );
                }

                results.Add(leaderboard);
            }

            return Ok(results);
        }
    }
}
