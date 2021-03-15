﻿using System.Collections.Generic;
using Webet333.dapper.interfaces;

namespace Webet333.dapper.Internals
{
    public class QueryParametersManager : IQueryParametersManager
    {
        public string GenerateStringQry(string qry, Dictionary<string, object> parameters)
        {
            ParameterValidator.ValidateString(qry, nameof(qry));
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            string result = qry;
            foreach (var parameter in parameters)
            {
                result = result.Replace($"@{parameter.Key}", parameter.Value.ToString());
                result = result.Replace($":{parameter.Key}", parameter.Value.ToString());
            }
            return result;
        }

        public Dictionary<string, object> GetParametersDictionary(object parameters)
        {
            ParameterValidator.ValidateObject(parameters, nameof(parameters));
            var result = new Dictionary<string, object>();
            var properties = parameters.GetType().GetProperties();
            foreach (var property in properties)
            {
                var value = property.GetValue(parameters);
                result.Add(property.Name, value);
            }
            return result;
        }
    }
}