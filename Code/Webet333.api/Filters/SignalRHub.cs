using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Webet333.api.Filters
{
    public class SignalRHub : Hub
    {
        public async Task WalletUpdate(object data)
        {
            await Clients.All.SendAsync("WalletUpdate", data);
            await Clients.All.SendAsync("ManagerApprovalList");
            await Clients.All.SendAsync("WithdrawApprovalList");
            await Clients.All.SendAsync("DepositApprovalList");
            await Clients.All.SendAsync("PromotionInsertUpdate");
            await Clients.All.SendAsync("AnnouncementInsertUpdate");
            await Clients.All.SendAsync("AdminBankInsertUpdate");
            await Clients.All.SendAsync("DownloadLinkUpdate");
            await Clients.All.SendAsync("HomePageBannerInsertUpdate");
        }
    }
}