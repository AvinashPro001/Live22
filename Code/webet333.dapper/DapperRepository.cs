using Dapper;
using Webet333.dapper.interfaces;
using Webet333.dapper.Internals;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Webet333.dapper
{
    public class DapperRepository<TEntity> : IDisposable, IDapperRepository<TEntity> where TEntity : class
    {
        #region Object declarion and constructor.
        private readonly IDbConnection connection;
        private int? commandTimeout = 120;
        private IDbTransaction dbTransaction = null;
        /// <summary>
        /// Manager query Constructor.
        /// </summary>
        public IPartsQueryGenerator<TEntity> PartsQueryGenerator { private get; set; }

        /// <summary>
        /// Manager to worker with Identified Fields
        /// </summary>
        public IIDentityInspector<TEntity> IdentityInspector { private get; set; }

        /// <summary>
        /// Idetenfier parameter (@) to SqlServer (:) to Oracle
        /// </summary>
        public char ParameterIdentified { get; set; }
        protected string QuerySelect { get; set; }
        protected string QueryInsert { get; set; }
        private string IdentityField { get; set; }

        /// <summary>
        /// Create a GenericRepository for Dapper
        /// </summary>
        /// <param name="conn">Connection</param>
        /// <param name="parameterIdentified">Idetenfier parameter (@) to SqlServer (:) to Oracle</param>
        public DapperRepository(string connnectionString, char parameterIdentified = '@')
        {
            this.connection = new SqlConnection(connnectionString) ?? throw new ArgumentNullException(nameof(connnectionString), $"The parameter {nameof(connnectionString)} can't be null");
            ParameterIdentified = parameterIdentified;
            PartsQueryGenerator = new PartsQueryGenerator<TEntity>(ParameterIdentified);
            IdentityInspector = new IDentityInspector<TEntity>(connection);
        }
        #endregion

        #region Creates Queries
        protected virtual void CreateSelectquery()
        {
            if (string.IsNullOrWhiteSpace(QuerySelect)) QuerySelect = PartsQueryGenerator.GenerateSelect();
        }

        protected virtual void CreateInsertquery()
        {
            if (string.IsNullOrWhiteSpace(QueryInsert))
            {
                IdentityField = IdentityInspector.GetColumnsIdentityForType();
                QueryInsert = PartsQueryGenerator.GeneratePartInsert(IdentityField);
            }
        }
        #endregion

        public void GetData()
        {
            
            //var result = connection.QueryMultiple(query, parameters, commandType: type);
        }

        #region GetData/Async
        /// <summary>
        /// Get Entities in DB from query with object parameters
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>Entities for this filter</returns>
        public IEnumerable<TEntity> GetData(string query, object parameters, CommandType type = CommandType.StoredProcedure)
        {
            ParameterValidator.ValidateString(query, nameof(query));
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            var result = connection.Query<TEntity>(query, parameters, dbTransaction, true, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Get Entities in DB from query with object parameters
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>Entities for this filter</returns>
        public dynamic GetMultiData(string query, object parameters, CommandType type = CommandType.StoredProcedure)
        {
            ParameterValidator.ValidateString(query, nameof(query));
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            //var result = connection.Query<TEntity>(query, parameters, null, true, null, type);
            var result = connection.QueryMultiple(query, parameters, dbTransaction, commandTimeout, type);
            return result;
        }

        public async Task<dynamic> GetMultiDataAsync(string query, object parameters, CommandType type = CommandType.StoredProcedure)
        {
            ParameterValidator.ValidateString(query, nameof(query));
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            var result =await connection.QueryMultipleAsync(query, parameters, dbTransaction, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Get async Entities in DB from query with object parameters
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>Entities for this filter</returns>
        public Task<IEnumerable<TEntity>> GetDataAsync(string query, object parameters, CommandType type = CommandType.StoredProcedure)
        {
            ParameterValidator.ValidateString(query, nameof(query));
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            var result = connection.QueryAsync<TEntity>(query, parameters, dbTransaction, commandTimeout, type);
            return result;
        }
        #endregion

        #region Find/Async
        /// <summary>
        /// Find entity in DB for PK
        /// </summary>
        /// <param name="primarykeyFields">Object with pk properties</param>
        /// <returns>Entity for pk values</returns>
        public TEntity Find(string query, object primarykeyFields, CommandType type = CommandType.StoredProcedure)
        {
            ParameterValidator.ValidateObject(primarykeyFields, nameof(primarykeyFields));
            var result = connection.Query<TEntity>(query, primarykeyFields, dbTransaction, true, commandTimeout, type)?.FirstOrDefault();
            return result;
        }

        /// <summary>
        /// Find Async entity in DB for PK
        /// </summary>
        /// <param name="primarykeyFields">Object with pk properties</param>
        /// <returns>Entity for pk values</returns>
        public Task<TEntity> FindAsync(string query, object primarykeyFields, CommandType type = CommandType.StoredProcedure)
        {
            return Task.Run(() =>
            {
                return Find(query, primarykeyFields, type);
            });
        }
        #endregion

        #region Add/Async
        /// <summary>
        /// Add a new Entity in DB
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>number changes in DB</returns>
        public int AddOrUpdate(TEntity entity, CommandType type = CommandType.Text)
        {
            if (connection == null) throw new ArgumentNullException(nameof(entity), $"The parameter {nameof(entity)} can't be null");
            CreateInsertquery();
            int result = connection.Execute(QueryInsert, entity, dbTransaction, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Add a new Entity in DB
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>number changes in DB</returns>
        public int AddOrUpdate(string query, TEntity entity, CommandType type = CommandType.StoredProcedure)
        {
            if (connection == null) throw new ArgumentNullException(nameof(entity), $"The parameter {nameof(entity)} can't be null");
            int result = connection.Execute(query, entity, dbTransaction, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Add Async a new Entity in DB
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>number changes in DB</returns>
        public Task<int> AddOrUpdateAsync(string query, TEntity entity, CommandType type = CommandType.StoredProcedure)
        {
            if (connection == null) throw new ArgumentNullException(nameof(entity), $"The parameter {nameof(entity)} can't be null");
            var result = connection.ExecuteAsync(query, entity, dbTransaction, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Add a new Entity in DB
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>number changes in DB</returns>
        public int AddOrUpdate(string query, IEnumerable<TEntity> entities, CommandType type = CommandType.StoredProcedure)
        {
            if (connection == null) throw new ArgumentNullException(nameof(entities), $"The parameter {nameof(entities)} can't be null");
            int result = connection.Execute(query, entities, dbTransaction, commandTimeout, type);
            return result;
        }

        /// <summary>
        /// Add a new Entity in DB
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>number changes in DB</returns>
        public Task<int> AddOrUpdateAsync(string query, IEnumerable<TEntity> entities, CommandType type = CommandType.StoredProcedure)
        {
            if (connection == null) throw new ArgumentNullException(nameof(entities), $"The parameter {nameof(entities)} can't be null");
            var result = connection.ExecuteAsync(query, entities, dbTransaction, commandTimeout, type);
            return result;
        }
        #endregion

        #region Dispose method implementation
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                connection.Close();
                connection.Dispose();
            }
        }
        #endregion
    }
}