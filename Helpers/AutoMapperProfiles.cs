using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GGS.DTOs;
using GGS.Entities;

namespace GGS.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Location, LocationDto>();
            CreateMap<LocationPhoto, LocationPhotoDto>();
            CreateMap<Unit, UnitDto>();
            CreateMap<UnitLoginDto, UnitDto>();
            CreateMap<LocationUnit, LocationDto>();
        }
    }
}
