using System.Collections.Generic;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.M8;
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
                    Value = request.Com,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Comtype,
                    Value = request.Comtype,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim1,
                    Value = request.Lim1,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim2,
                    Value = request.Lim2,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim3,
                    Value = request.Lim3,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Lim4,
                    Value = request.Lim4,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max1,
                    Value = request.Max1,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max2,
                    Value = request.Max2,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max3,
                    Value = request.Max3,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max4,
                    Value = request.Max4,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max5,
                    Value = request.Max5,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max6,
                    Value = request.Max6,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Max7,
                    Value = request.Max7,
                    AdminId =request.AdminId
                },
                new GlobalVariableUpdateRequest
                {
                    Name = M8SetLimit.Suspend,
                    Value = request.Suspend,
                    AdminId =request.AdminId
                }
            };

            return list;
        }
    }
}