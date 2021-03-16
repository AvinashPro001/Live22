using System.Collections.Generic;

namespace Webet333.dapper.interfaces
{
    public interface IQueryParametersManager
    {
        Dictionary<string, object> GetParametersDictionary(object parameters);

        string GenerateStringQry(string qry, Dictionary<string, object> parameters);
    }
}