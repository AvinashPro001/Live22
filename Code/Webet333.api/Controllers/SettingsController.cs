using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
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
        #region Variable & Constructor

        private IHubContext<SignalRHub> _hubContext;

        public SettingsController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption, IHubContext<SignalRHub> hubContext) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hubContext = hubContext;
        }

        #endregion Variable & Constructor

        #region Retrieve list of Banks

        [HttpGet(ActionsConst.Settings.BankList)]
        public async Task<IActionResult> BankList([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                return OkResponse(await setting_help.GetBanksList(BaseUrlConfigsOptions.Value));
            }
        }

        #endregion Retrieve list of Banks

        #region Add, Update, Retrieve and Delete Bank List

        [HttpGet(ActionsConst.Settings.AdminBankList)]
        public async Task<IActionResult> AdminBankList([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAdminBankDetails(BaseUrlConfigsOptions.Value, Language.Id.ToString());
                return OkResponse(data);
            }
        }

        [HttpGet(ActionsConst.Settings.AdminAllBankList)]
        public async Task<IActionResult> AdminAllBankList([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var setting_help = new SettingsHelpers(Connection))
            {
                var data = await setting_help.GetAllAdminBank(BaseUrlConfigsOptions.Value);
                return OkResponse(data);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankAdd)]
        public async Task<IActionResult> AdminBankAdd([FromBody] InsertUserBankRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var bankId = await setting_help.AddAdminBankDetails(request);
                await _hubContext.Clients.All.SendAsync("AdminBankInsertUpdate");
                return OkResponse(bankId);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankEdit)]
        public async Task<IActionResult> AdminBankEdit([FromBody] UpdateUserBankRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.AddOrUpdateAdminBankDetails(request);
                await _hubContext.Clients.All.SendAsync("AdminBankInsertUpdate");
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankImage)]
        public async Task<IActionResult> AddAdminBankImage([FromBody] BankImagesIconInsertRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var generic_help = new GenericHelpers(Connection))
            {
                generic_help.GetImage(uploadManager, request.FormFile, BaseUrlConfigsOptions.Value.BankImage, request.Id.ToString());
                generic_help.GetImage(uploadManager, request.FormIconFile, BaseUrlConfigsOptions.Value.AdminBankIconImage, request.Id.ToString());
            }

            string adminId = GetUserId(User).ToString();

            using (var setting_help = new SettingsHelpers(Connection))
                await setting_help.AdminBankDetailsImageUpdate(Guid.Parse(request.Id), DefaultConsts.Image, adminId: adminId);

            return OkResponse();
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankImageUpdate)]
        public async Task<IActionResult> UpdateAdminBankImage([FromBody] BankImagesIconInsertRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
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

            string adminId = GetUserId(User).ToString();

            using (var setting_help = new SettingsHelpers(Connection))
                await setting_help.AdminBankDetailsImageUpdate(Guid.Parse(request.Id), DefaultConsts.Image, adminId: adminId);

            return OkResponse();
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankDelete)]
        public async Task<IActionResult> AdminBankDelete([FromBody] GetByIdRequest request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAdminBankDetail(Guid.Parse(request.Id), Deleted: true);
                await _hubContext.Clients.All.SendAsync("AdminBankInsertUpdate");
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AdminBankActive)]
        public async Task<IActionResult> AdminBankDeactive([FromBody] DeleteRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAdminBankDetail(Guid.Parse(request.Id), Active: request.Active, adminId: adminId);
                await _hubContext.Clients.All.SendAsync("AdminBankInsertUpdate");
                return OkResponse();
            }
        }

        #endregion Add, Update, Retrieve and Delete Bank List

        #region Add, Update, Retrieve and delete wallet list

        [HttpPost(ActionsConst.Settings.WalletTypeAdd)]
        public async Task<IActionResult> WalletType([FromBody] AddWalletTypes request)
        {
            await CheckUserRole();
            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.AddWalletType(request);
                return OkResponse();
            }
        }

        #endregion Add, Update, Retrieve and delete wallet list

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
        public async Task<IActionResult> AnnouncementDelete([FromBody] GetByIdRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.DeleteOrActiveAnnouncementDetail(Guid.Parse(request.Id), adminId: adminId);
                await _hubContext.Clients.All.SendAsync("AnnouncementInsertUpdate");
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AnnouncementAdd)]
        public async Task<IActionResult> AnnouncementAdd([FromBody] AnnouncementInsertRequest request)
        {
            await CheckUserRole();

            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.AdminId = GetUserId(User);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.GetAnnouncementAdd(request);
                await _hubContext.Clients.All.SendAsync("AnnouncementInsertUpdate");
                return OkResponse();
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.Settings.AnnouncementUpdate)]
        public async Task<IActionResult> AnnouncementUpdate([FromBody] AnnouncementUpdateRequest request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.AdminId = GetUserId(User);

            using (var setting_help = new SettingsHelpers(Connection))
            {
                await setting_help.GetAnnouncementUpdate(request);
                await _hubContext.Clients.All.SendAsync("AnnouncementInsertUpdate");
                return OkResponse();
            }
        }

        #endregion Add, Retrieve and Delete the Announcement

        #region Contact Management

        #region Contact Type API's

        #region Contact Type Insert

        [HttpPost(ActionsConst.Settings.ContactTypeAdd)]
        public async Task<IActionResult> ContactTypeAdd([FromBody] ContactTypeAddRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.TypeImage == null ? null : "." + request.TypeImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.TypeImage == null ? null : request.TypeImage.Split("base64,")[1];
            request.TypeImage = extension;

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.AddContactType(request);

                if (request.TypeImage != null)
                    using (var generic_help = new GenericHelpers(Connection))
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.Id.ToString(), extension);

                return OkResponse();
            }
        }

        #endregion Contact Type Insert

        #region Contact Type Update

        [HttpPost(ActionsConst.Settings.ContactTypeUpdate)]
        public async Task<IActionResult> ContactTypeUpdate([FromBody] ContactTypeUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.TypeImage == null ? null : "." + request.TypeImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.TypeImage == null ? null : request.TypeImage.Split("base64,")[1];
            request.TypeImage = extension;

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.UpdateContactType(request);

                if (request.TypeImage != null)
                {
                    using (var generic_help = new GenericHelpers(Connection))
                    {
                        generic_help.DeleteImage(uploadManager, type.Id.ToString(), BaseUrlConfigsOptions.Value.ContactImage);
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.Id.ToString(), extension);
                    }
                }
                return OkResponse();
            }
        }

        #endregion Contact Type Update

        #region Contact Type Select

        [HttpGet(ActionsConst.Settings.ContactTypeSelect)]
        public async Task<IActionResult> ContactTypeSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.SelectContactType();
                type.ForEach(x =>
                {
                    x.TypeImage = x.TypeImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.Id}{x.TypeImage}";
                });
                return OkResponse(type);
            }
        }

        #endregion Contact Type Select

        #endregion Contact Type API's

        #region Contact Type Details API's

        #region Contact Type Details Insert

        [HttpPost(ActionsConst.Settings.ContactDetailsAdd)]
        public async Task<IActionResult> ContactTypeDetailsAdd([FromBody] ContactTypeDetailsAddRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            var extension = request.CSImage == null ? null : "." + request.CSImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.CSImage == null ? null : request.CSImage.Split("base64,")[1];
            request.CSImage = extension;

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.AddContactTypeDetails(request);

                if (request.CSImage != null)
                    using (var generic_help = new GenericHelpers(Connection))
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.ID.ToString(), extension);

                return OkResponse();
            }
        }

        #endregion Contact Type Details Insert

        #region Contact Type Details Update

        [HttpPost(ActionsConst.Settings.ContactDetailsUpdate)]
        public async Task<IActionResult> ContactTypeDetailsUpdate([FromBody] ContactTypeDetailsUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            var extension = request.CSImage == null ? null : "." + request.CSImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.CSImage == null ? null : request.CSImage.Split("base64,")[1];
            request.CSImage = extension;

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.UpdateContactTypeDetails(request);

                if (request.CSImage != null)
                {
                    using (var generic_help = new GenericHelpers(Connection))
                    {
                        generic_help.DeleteImage(uploadManager, type.ID.ToString(), BaseUrlConfigsOptions.Value.ContactImage);
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.ID.ToString(), extension);
                    }
                }

                return OkResponse();
            }
        }

        #endregion Contact Type Details Update

        #region Contact Type Details Select

        [HttpGet(ActionsConst.Settings.ContactDetailsSelect)]
        public async Task<IActionResult> ContactTypeDetailsSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var setting_help = new SettingsHelpers(Connection))
            {
                var type = await setting_help.SelectContactTypeDetails();
                type.ForEach(x =>
                {
                    x.CSImage = x.CSImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.Id}{x.CSImage}";
                    x.TypeImage = x.TypeImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.ContactTypeId}{x.TypeImage}";
                });
                return OkResponse(type);
            }
        }

        #endregion Contact Type Details Select

        #endregion Contact Type Details API's

        #endregion Contact Management

        #region HomePage Banner (Add, Update, Update Status, Delete, Retrieve List)

        #region HomePage Banner Insert

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerInsert)]
        public async Task<IActionResult> HomePageBannerInsert([FromBody] HomePageBannerAddRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerInsertAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse(result.Id);
            }
        }

        #endregion HomePage Banner Insert

        #region HomePage Banner Image Insert

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerImage)]
        [Filters.RequestSizeLimit(valueCountLimit: 2)]
        public async Task<IActionResult> HomePageBannerImage(
            [FromBody] HomePageBannerImageRequest request,
            [FromServices] IUploadManager uploadManager,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser();

            var extensionWeb = "." + request.BannerWeb.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerWeb = request.BannerWeb.Split("base64,")[1];

            var extensionMobile = "." + request.BannerMobile.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerMobile = request.BannerMobile.Split("base64,")[1];

            request.AdminId = GetUserId(User);

            using (var Generic_Helpers = new GenericHelpers(Connection))
            {
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerWeb,
                    BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                    request.Id.ToString(),
                    extensionWeb);
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerMobile,
                    BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                    request.Id.ToString(),
                    extensionMobile);
            }

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerImageAsync(
                    Guid.Parse(request.Id),
                    extensionWeb,
                    extensionMobile,
                    adminId: request.AdminId.ToString());
            }

            return OkResponse();
        }

        #endregion HomePage Banner Image Insert

        #region HomePage Banner Update

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerUpdate)]
        public async Task<IActionResult> HomePageBannerUpdate([FromBody] HomePageBannerUpdateRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerUpdateAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse(result.id);
            }
        }

        #endregion HomePage Banner Update

        #region HomePage Banner Image Update

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerImageUpdate)]
        [Filters.RequestSizeLimit(valueCountLimit: 2)]
        public async Task<IActionResult> HomePageBannerImageUpdate(
            [FromBody] HomePageBannerImageUpdateRequest request,
            [FromServices] IUploadManager uploadManager,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser();

            string extensionWeb = string.Empty, extensionMobile = string.Empty;

            using (var generic_help = new GenericHelpers(Connection))
            {
                if (!string.IsNullOrWhiteSpace(request.BannerWeb))
                {
                    extensionWeb = "." + request.BannerWeb.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerWeb = request.BannerWeb.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.Id.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerWeb,
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                        request.Id.ToString(),
                        extensionWeb);
                }

                if (!string.IsNullOrWhiteSpace(request.BannerMobile))
                {
                    extensionMobile = "." + request.BannerMobile.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerMobile = request.BannerMobile.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.Id.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerMobile,
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                        request.Id.ToString(),
                        extensionMobile);
                }
            }

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerImageAsync(
                    Guid.Parse(request.Id),
                    extensionWeb,
                    extensionMobile);
            }

            return OkResponse();
        }

        #endregion HomePage Banner Image Update

        #region HomePage Banner Delete

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerDelete)]
        public async Task<IActionResult> HomePageBannerDelete([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerDeleteAsync(Guid.Parse(request.Id), adminId);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse();
            }
        }

        #endregion HomePage Banner Delete

        #region HomePage Banner Status Active

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerUpdateStatus)]
        public async Task<IActionResult> HomePageBannerUpdateStatus([FromBody] UpdateStatusWithAdminIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerUpdateStatusAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse();
            }
        }

        #endregion HomePage Banner Status Active

        #region HomePage Banner Select By User

        [HttpPost(ActionsConst.Settings.HomePageBannerSelectByUser)]
        public async Task<IActionResult> HomePageBannerSelectByUser(
            [FromBody] HomePageBannerRetriveRequest request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.isUser = true;

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerSelectUserAsync(
                    BaseUrlConfigsOptions.Value,
                    Language.Id.ToString(),
                    request);

                return OkResponse(result);
            }
        }

        #endregion HomePage Banner Select By User

        #region HomePage Banner Select By Admin

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerSelectByAdmin)]
        public async Task<IActionResult> HomePageBannerSelectByAdmin(
            [FromBody] HomePageBannerRetriveByAdminRequest request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.isUser = false;

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerSelectByAdminAsync(
                    BaseUrlConfigsOptions.Value,
                     request.LanguageId,
                    request);

                return OkResponse(result);
            }
        }

        #endregion HomePage Banner Select By Admin

        #endregion HomePage Banner (Add, Update, Update Status, Delete, Retrieve List)
    }
}