using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GGS.Entities;
using Microsoft.EntityFrameworkCore;

namespace GGS.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Unit> Units { get; set; }
    }
}
