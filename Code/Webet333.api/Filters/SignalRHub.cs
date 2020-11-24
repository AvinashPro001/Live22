using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Webet333.api.Filters
{
    public class SignalRHub:Hub
    {
        public async Task WalletUpdate(object data)
        {
            await Clients.All.SendAsync("WalletUpdate",data);
            await Clients.All.SendAsync("ManagerApprovalList");
            await Clients.All.SendAsync("WithdrawApprovalList");
            await Clients.All.SendAsync("DepositApprovalList");
        }
      
    }
}
