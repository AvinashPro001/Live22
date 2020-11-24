using System.Collections.Generic;
namespace Webet333.dapper.interfaces
{
    public interface IPKExtractor
    {
        IEnumerable<object> ExtractPKInObjectEnumerable(object pk);
    }
}