using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Settings;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class SettingsController : BaseController
    {
        public SettingsController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
        }

        #region Retrieve list of Banks

        [HttpGet(ActionsConst.Settings.BankList)]
        public async Task<IActionResult> BankList([FromServices]IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                return OkResponse(await setting_help.GetBanksList(BaseUrlConfigsOptions.Value));
            }
        }

        #endregion

        #region Add, Update, Retrieve and Delete Bank List

        [HttpGet(ActionsConst.Settings.AdminBankList)]
        public async Task<IActionResult> AdminBankList([FromServices]IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAdminBankDetails(BaseUrlConfigsOptions.Value,Language.Id.ToString());
                return OkResponse(data);
            }
        }

        [HttpGet(ActionsConst.Settings.AdminAllBankList)]
        public async Task<IActionResult> AdminAllBankList([FromServices]IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAllAdminBank(BaseUrlConfigsOptions.Value);
                return OkResponse(data);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankAdd)]
        public async Task<IActionResult> AdminBankAdd([FromBody]InsertUserBankRequest request)
        {
            await CheckUserRole();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var bankId = await setting_help.AddAdminBankDetails(request);
                return OkResponse(bankId);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankEdit)]
        public async Task<IActionResult> AdminBankEdit([FromBody]UpdateUserBankRequest request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.AddOrUpdateAdminBankDetails(request);
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankImage)]
        public async Task<IActionResult> AddAdminBankImage([FromBody]BankImagesIconInsertRequest request, [FromServices]IUploadManager uploadManager, [FromServices]IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var generic_help = new GenericHelpers(Connection))
            {
                generic_help.GetImage(uploadManager, request.FormFile, BaseUrlConfigsOptions.Value.BankImage, request.Id.ToString());
                generic_help.GetImage(uploadManager, request.FormIconFile, BaseUrlConfigsOptions.Value.AdminBankIconImage, request.Id.ToString());
            }

            using (var setting_help = new SettingsHelpers(Connection))
                await setting_help.AdminBankDetailsImageUpdate(Guid.Parse(request.Id), DefaultConsts.Image);

            return OkResponse();
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankImageUpdate)]
        public async Task<IActionResult> UpdateAdminBankImage([FromBody]BankImagesIconInsertRequest request, [FromServices]IUploadManager uploadManager, [FromServices]IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var generic_help = new GenericHelpers(Connection))
            {
                if (!String.IsNullOrEmpty(request.FormFile))
                {
                    generic_help.DeleteImage(uploadManager, request.Id.ToString(), BaseUrlConfigsOptions.Value.BankImage);

                    generic_help.GetImage(uploadManager, request.FormFile, BaseUrlConfigsOptions.Value.BankImage, request.Id.ToString());
                }

                if (!String.IsNullOrEmpty(request.FormIconFile))
                {
                    generic_help.DeleteImage(uploadManager, request.Id.ToString(), BaseUrlConfigsOptions.Value.AdminBankIconImage);

                    generic_help.GetImage(uploadManager, request.FormIconFile, BaseUrlConfigsOptions.Value.AdminBankIconImage, request.Id.ToString());
                }
            }

            using (var setting_help = new SettingsHelpers(Connection))
                await setting_help.AdminBankDetailsImageUpdate(Guid.Parse(request.Id), DefaultConsts.Image);

            return OkResponse();
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankDelete)]
        public async Task<IActionResult> AdminBankDelete([FromBody]GetByIdRequest request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAdminBankDetail(Guid.Parse(request.Id), Deleted: true);
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankActive)]
        public async Task<IActionResult> AdminBankDeactive([FromBody]DeleteRequest request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAdminBankDetail(Guid.Parse(request.Id), Active: request.Active);
                return OkResponse();
            }
        }

        #endregion

        #region Add, Update, Retrieve and delete wallet list

        [HttpPost(ActionsConst.Settings.WalletTypeAdd)]
        public async Task<IActionResult> WalletType([FromBody]AddWalletTypes request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.AddWalletType(request);
                return OkResponse();
            }
        }

        #endregion

        #region Add, Retrieve and Delete the Announcement

        [HttpGet(ActionsConst.Settings.AnnouncementUserList)]
        public async Task<IActionResult> AnnouncementUserList()
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAnnouncementList(Language.Id.ToString());
                return OkResponse(data);
            }
        }

        [Authorize]
        [HttpGet(ActionsConst.Settings.AnnouncementAdminList)]
        public async Task<IActionResult> AnnouncementAdminList()
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAnnouncementList();
                return OkResponse(data);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AnnouncementDelete)]
        public async Task<IActionResult> AnnouncementDelete([FromBody]GetByIdRequest request)
        {
            await CheckUserRole();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAnnouncementDetail(Guid.Parse(request.Id));
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AnnouncementAdd)]
        public async Task<IActionResult> AnnouncementAdd([FromBody]AnnouncementInsertRequest request)
        {
            await CheckUserRole();

            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.GetAnnouncementAdd(request);
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AnnouncementUpdate)]
        public async Task<IActionResult> AnnouncementUpdate([FromBody]AnnouncementUpdateRequest request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.GetAnnouncementUpdate(request);
                return OkResponse();
            }
        }

        #endregion
    
    }
}