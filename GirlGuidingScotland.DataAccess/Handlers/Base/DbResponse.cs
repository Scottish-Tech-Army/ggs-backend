using Dapper;
using GirlGuidingScotland.DataAccess.Constants;
using System.Collections.Generic;

namespace GirlGuidingScotland.DataAccess.Handlers.Base
{
    public class DbResponse : DbResponse<int> { }
    public class DbResponse<T>
    {
        /// <summary>
        /// Message returned by query in case of non-okay response.
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Single value response.
        /// </summary>
        public T Value { get; set; } = default;

        /// <summary>
        /// IEnumerable collection of T from query. 
        /// </summary>
        public IEnumerable<T> Data { get; set; } = null;

        public Status Status { get; set; } = Status.OK;

        public int Count { get; set; }
    }
}
