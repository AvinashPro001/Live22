using Microsoft.EntityFrameworkCore;
using Webet333.models.Entities.Base;
using System.Linq;

namespace Webet333.dapper.interfaces
{
    public interface IIncludeInjector<TEntity> where TEntity : Entity
    {
        IQueryable<TEntity> InjectorIncludes(DbQuery<TEntity> dbQry, params string[] includes);
    }
}