using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Webet333.dapper.interfaces
{
    public interface IDapperRepository<TEntity> : IDisposable where TEntity : class
    {
        IEnumerable<TEntity> GetData(string query, object parameters, CommandType type = CommandType.StoredProcedure);

        Task<IEnumerable<TEntity>> GetDataAsync(string query, object parameters, CommandType type = CommandType.StoredProcedure);

        TEntity Find(string query, object primarykeyFields, CommandType type = CommandType.StoredProcedure);

        Task<TEntity> FindAsync(string query, object primarykeyFields, CommandType type = CommandType.StoredProcedure);

        int AddOrUpdate(string query, TEntity entity, CommandType type = CommandType.StoredProcedure);

        Task<int> AddOrUpdateAsync(string query, TEntity entity, CommandType type = CommandType.StoredProcedure);

        int AddOrUpdate(string query, IEnumerable<TEntity> entities, CommandType type = CommandType.StoredProcedure);

        Task<int> AddOrUpdateAsync(string query, IEnumerable<TEntity> entities, CommandType type = CommandType.StoredProcedure);
    }
}