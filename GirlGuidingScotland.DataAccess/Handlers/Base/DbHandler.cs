using Dapper;
using GirlGuidingScotland.DataAccess.Constants;
using GirlGuidingScotland.DataAccess.Interfaces;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Threading.Tasks;

namespace GirlGuidingScotland.DataAccess.Handlers.Base
{
    public abstract class DbHandler : IDbHandler
    {
        public string ConnectionString { private get; set; }

        /// <summary>
        /// Execute a stored procedure where no return is expected
        /// </summary>
        /// <param name="storedProcedure">stored proc to call</param>
        /// <param name="sqlParams">query parameters</param>
        /// <returns>number of rows affected</returns>
        protected async Task<DbResponse> ExecuteAsync(string storedProcedure, object sqlParams)
        {
            var parameters = BuildParameters(sqlParams);

            using (IDbConnection connection = new SqlConnection(ConnectionString))
            {
                var response = await connection.ExecuteAsync(storedProcedure, (object)parameters, commandType: CommandType.StoredProcedure);
                return new DbResponse
                {
                    Count = response
                };
            }
        }

        /// <summary>
        /// Get a single result
        /// </summary>
        /// <typeparam name="T">DTO type to be returned</typeparam>
        /// <param name="storedProcedure">stored proc to call</param>
        /// <param name="sqlParams">query parameters</param>
        /// <returns>A single result of type T</returns>
        protected async Task<DbResponse<T>> QuerySingleAsync<T>(string storedProcedure, object sqlParams)
        {
            var parameters = BuildParameters(sqlParams);

            using (IDbConnection connection = new SqlConnection(ConnectionString))
            {
                var response = await connection.QuerySingleAsync<T>(storedProcedure, (object)parameters, commandType: CommandType.StoredProcedure);
                return new DbResponse<T>
                {
                    Value = response
                };
            }
        }

        /// <summary>
        /// Get a dataset based on input parameters
        /// </summary>
        /// <typeparam name="T">DTO type to be returned</typeparam>
        /// <param name="storedProcedure">stored proc to call</param>
        /// <param name="sqlParams">query parameters</param>
        /// <returns>Db Response with IEnumerable of T</returns>
        protected async Task<DbResponse<T>> QueryAsync<T>(string storedProcedure, object sqlParams = null)
        {
            var parameters = BuildParameters(sqlParams);

            using (IDbConnection connection = new SqlConnection(ConnectionString))
            {
                var response = await connection.QueryAsync<T>(storedProcedure, (object)parameters, commandType: CommandType.StoredProcedure);
                return new DbResponse<T>
                {
                    Data = response
                };
            }
        }

        /// <summary>
        /// Builds parameters for Dapper to send to SQL Server which will be recognised
        /// </summary>
        /// <param name="sqlParamsIn">Set of parameters with matching names to stored procs</param>
        /// <returns>Dynamic Parameters object for procs</returns>
        private DynamicParameters BuildParameters(object sqlParamsIn = null)
        {
            var dynamicParameters = new DynamicParameters();

            if (sqlParamsIn != null)
            {
                if (sqlParamsIn.GetType().Name.StartsWith("DynamicParameters"))
                {
                    dynamicParameters = (DynamicParameters)sqlParamsIn;
                }
                else
                {
                    foreach (PropertyInfo property in sqlParamsIn.GetType().GetProperties())
                    {
                        dynamicParameters.Add(string.Format("@{0}", property.Name), property.GetValue(sqlParamsIn, null));
                    }
                }
            }
            dynamicParameters.Add("@ReturnValue", 0, DbType.Int32, ParameterDirection.ReturnValue);

            return dynamicParameters;
        }
    }
}
