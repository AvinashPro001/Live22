using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using Webet333.dapper.interfaces;
using Webet333.models.Entities.Base;

namespace Webet333.dapper.Internals
{
    public class IncludeInjector<TEntity> : IIncludeInjector<TEntity> where TEntity : Entity
    {
        public IQueryable<TEntity> InjectorIncludes(DbQuery<TEntity> dbQry, params string[] includes)
        {
            ParameterValidator.ValidateObject(dbQry, nameof(dbQry));
            IQueryable<TEntity> result = dbQry;
            foreach (var include in includes)
            {
                result = result.Include(include);
            }
            return result;
        }

        public IQueryable<TEntity> InjectorIncludes<TProperty>(IQueryable<TEntity> dbQry, params Expression<Func<TEntity, TProperty>>[] paths)
        {
            ParameterValidator.ValidateObject(dbQry, nameof(dbQry));
            ParameterValidator.ValidateEnumerable(paths, nameof(paths));
            IQueryable<TEntity> result = dbQry;
            foreach (var path in paths)
            {
                result = result.Include<TEntity, TProperty>(path);
            }
            return result;
        }
    }
}