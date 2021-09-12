using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GGS.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public ICollection<LocationPhoto> Photos { get; set; }
    }
}
