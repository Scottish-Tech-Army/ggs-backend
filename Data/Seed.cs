using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using GGS.Entities;
using Microsoft.EntityFrameworkCore;

namespace GGS.Data
{
    public class Seed
    {
        public static async Task SeedLocations(DataContext context)
        {
            if (await context.Locations.AnyAsync()) return;

            var locationData = await System.IO.File.ReadAllTextAsync("Data/LocationSeedData.json");
            var locations = JsonSerializer.Deserialize<List<Location>>(locationData);
            if (locations == null) return;
            foreach (var location in locations)
            {
                await context.Locations.AddAsync(location);
            }

            await context.SaveChangesAsync();
        }
    }
}
