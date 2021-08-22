using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GirlGuidingScotland.DataAccess.DTOs
{
    public class LocationDto
    {
        public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public float Latitude { get; set; }
            public float Longitude { get; set; }
        }
}
