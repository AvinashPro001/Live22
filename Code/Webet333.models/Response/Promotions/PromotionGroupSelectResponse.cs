using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Promotions
{
    public class PromotionGroupMasterSelectResponse
    {
        public Guid Id { get; set; }
        public string PromotionGroupName { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string CreatedBy { get; set; }
        public bool Active { get; set; }
        public bool IsDailyOnce { get; set; }
        public bool IsPerUserOnly { get; set; }
        public List<PromotionGroupDetailsSelectResponse> details { get; set; }
        public long? totalPromotion { get; set; }
    }

    public class PromotionGroupDetailsSelectResponse
    {
        public Guid PromotionGroupId { get; set; }

        public Guid PromotionId { get; set; }
    }
}
