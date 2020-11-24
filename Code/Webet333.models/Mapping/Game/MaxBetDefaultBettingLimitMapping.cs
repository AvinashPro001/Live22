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
                    Value = request.maxParleyMatch
                },

                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxParleyMax,
                    Value = request.maxParleyMax
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxParleyMin,
                    Value = request.maxParleyMin
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportBall,
                    Value = request.otherSportBall
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMatch,
                    Value = request.otherSportMatch
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMax,
                    Value = request.otherSportMax
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.OtherSportMin,
                    Value = request.otherSportMin
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMatch,
                    Value = request.sportMatch
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMax,
                    Value = request.sportMax
                },
                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.SportMin,
                    Value = request.sportMin
                },

                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Match,
                    Value = request.MaxbetSportsType1Match
                },

                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Min,
                    Value = request.MaxbetSportsType1Min
                },

                new GlobalVariableUpdateRequest
                {
                    Name = MaxBet.MaxbetSportsType1Max,
                    Value = request.MaxbetSportsType1Max
                }
            };

            return list;
        }
    }
}
