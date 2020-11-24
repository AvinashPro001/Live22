using System.Collections.Generic;
using Webet333.models.Request.Game;
using static Webet333.models.Constants.GameConst;

namespace Webet333.models.Mapping.Game
{
    public class M8LimitMapping
    {
        public List<GlobalVariableUpdateRequest> Map(M8SetLimitRequest request)
        {
            var list = new List<GlobalVariableUpdateRequest>
            {
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Com,
                    Value = request.Com
                },

                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Comtype,
                    Value = request.Comtype
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim1,
                    Value = request.Lim1
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim2,
                    Value = request.Lim2
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim3,
                    Value = request.Lim3
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim4,
                    Value = request.Lim4
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max1,
                    Value = request.Max1
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max2,
                    Value = request.Max2
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max3,
                    Value = request.Max3
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max4,
                    Value = request.Max4
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max5,
                    Value = request.Max5
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max6,
                    Value = request.Max6
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max7,
                    Value = request.Max7
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Suspend,
                    Value = request.Suspend
                }
            };

            return list;
        }
    }
}
