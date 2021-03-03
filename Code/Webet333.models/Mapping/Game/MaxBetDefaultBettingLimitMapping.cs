using System.Collections.Generic;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.MaxBet;
using static Webet333.models.Constants.GameConst;

namespace Webet333.models.Mapping.Game
{
    public class MaxBetDefaultBettingLimitMapping
    {
        public List<GlobalVariableUpdateRequest> Map(MaxBetDefaultBettingVariableRequest request)
        {
            var list = new List<GlobalVariableUpdateRequest>
            {
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxParleyMatch,
                    Value = request.maxParleyMatch,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxParleyMax,
                    Value = request.maxParleyMax,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxParleyMin,
                    Value = request.maxParleyMin,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportBall,
                    Value = request.otherSportBall,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMatch,
                    Value = request.otherSportMatch,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMax,
                    Value = request.otherSportMax,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMin,
                    Value = request.otherSportMin,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMatch,
                    Value = request.sportMatch,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMax,
                    Value = request.sportMax,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMin,
                    Value = request.sportMin,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Match,
                    Value = request.MaxbetSportsType1Match,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Min,
                    Value = request.MaxbetSportsType1Min,
                    AdminId = request.AdminId,
                    Description = request.Description
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Max,
                    Value = request.MaxbetSportsType1Max,
                    AdminId = request.AdminId,
                    Description = request.Description
                }
            };

            return list;
        }
    }
}
