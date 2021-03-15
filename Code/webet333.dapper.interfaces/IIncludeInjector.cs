using Microsoft.EntityFrameworkCore;
using System.Linq;
using Webet333.models.Entities.Base;

namespace Webet333.dapper.interfaces
{
    public interface IIncludeInjector<TEntity> where TEntity : Entity
    {
        IQueryable<TEntity> InjectorIncludes(DbQuery<TEntity> dbQry, params string[] includes);
    }
}