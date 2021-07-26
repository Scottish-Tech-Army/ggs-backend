using GirlGuidingScotland.DataAccess.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GirlGuidingScotland.API.Services.Base
{
    public abstract class BaseService
    {
        public string ConnectionString { get; private set; }
        public BaseService(IConfiguration config, IDbHandler handler)
        {
            handler.ConnectionString = config.GetConnectionString("GGS");
        }
    }
}
