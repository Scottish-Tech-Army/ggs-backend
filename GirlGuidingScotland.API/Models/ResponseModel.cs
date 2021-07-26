using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GirlGuidingScotland.API.Models
{
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public object Payload { get; set; }
        public string Message { get; set; }
    }
}
