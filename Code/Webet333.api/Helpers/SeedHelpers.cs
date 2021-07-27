using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using Webet333.api.Controllers.Base;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.notify.interfaces.Email;

namespace Webet333.api.Helpers
{
    public class SeedHelpers : IDisposable
    {
        private IStringLocalizer<BaseController> Localizer { get; set; }

        private BaseUrlConfigs BaseUrlConfigs { get; set; }

        private string Connection = string.Empty;

        private readonly string AdminEmail = "CustomerService2";

        private readonly string AdminName = "Customer Service 2";

        public SeedHelpers(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            this.Localizer = Localizer;
            BaseUrlConfigs = BaseUrlConfigsOptions.Value;
            Connection = ConnectionStringsOptions.Value.DefaultConnection;
        }

        public void Seed(IMessages messages)
        {
            using (var InsertRepository = new DapperRepository<dynamic>(Connection))
            {
                var user = InsertRepository.Find(StoredProcConsts.Account.SetSeedData,
                    new
                    {
                        EmailId = AdminEmail,
                        Name = AdminName,
                        RoleAdmin = RoleConst.Admin,
                        RoleUser = RoleConst.Users,
                        LanguageEnglish = "English",
                        LanguageArabic = "Malay",
                        LanguageCodeEnglish = LanguageConst.English,
                        LanguageCodeArabic = LanguageConst.Malay,
                    });
                if (!user.emailConfirmed)
                {
                    #region Sending email in queue

                    //string token = new TokenHelpers(Connection).GenerateAdminInviteToken(user.Id.ToString());
                    //var Link = string.Format(BaseUrlConfigs.AdminInvite, token);
                    //new EmailHelpers(Localizer, messages).SendAccountEmail(new ProfileResponse { Id = user.Id, UserName = user.userName, Role = user.role, Name = user.name, MobileNo = user.mobileNo, Email = user.email }, Link, EmailTypeConst.AdminInvite.ToString());

                    #endregion Sending email in queue
                }
            }
        }

        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool dispose)
        {
            if (dispose)
            {
                if (Connection != null) Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}