using System;

namespace Webet333.models.Response.Game.MAXBet
{
	public class MaxbetUserDetailsResponse
    {
        public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string VendorMemberId { get; set; }
		public string Username { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
    }
}
