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
        private IHubContext<SignalRHub> _hubContext;
        public SettingsController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption, IHubContext<SignalRHub> hubContext) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hubContext = hubContext;
        }

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

        #region 6. HomePage Banner (Add, Update, Update Status, Delete, Retrieve List)

        #region 6.1 HomePage Banner Insert

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerInsert)]
        public async Task<IActionResult> HomePageBannerInsert([FromBody] HomePageBannerAddRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerInsertAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse(result);
            }
        }

        #endregion 6.1 HomePage Banner Insert

        #region 6.2 HomePage Banner Image Insert

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerImage)]
        [Filters.RequestSizeLimit(valueCountLimit: 6)]
        public async Task<IActionResult> HomePageBannerImage(
            [FromBody] HomePageBannerImageRequest request,
            [FromServices] IUploadManager uploadManager,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            HomePageBannerImagePersist temp = new HomePageBannerImagePersist();
            temp.Id = Guid.Parse(request.Id);
            request.AdminId = GetUserId(User);

            temp.BannerIdEnglish = Guid.Parse(request.BannerIdEnglish);
            temp.BannerIdChinese = Guid.Parse(request.BannerIdChinese);
            temp.BannerIdMalay = Guid.Parse(request.BannerIdMalay);

            temp.ExtensionWebEnglish = "." + request.BannerWebEnglish.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerWebEnglish = request.BannerWebEnglish.Split("base64,")[1];

            temp.ExtensionMobileEnglish = "." + request.BannerMobileEnglish.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerMobileEnglish = request.BannerMobileEnglish.Split("base64,")[1];

            temp.ExtensionWebChinese = "." + request.BannerWebChinese.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerWebChinese = request.BannerWebChinese.Split("base64,")[1];

            temp.ExtensionMobileChinese = "." + request.BannerMobileChinese.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerMobileChinese = request.BannerMobileChinese.Split("base64,")[1];

            temp.ExtensionWebMalay = "." + request.BannerWebMalay.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerWebMalay = request.BannerWebMalay.Split("base64,")[1];

            temp.ExtensionMobileMalay = "." + request.BannerMobileMalay.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.BannerMobileMalay = request.BannerMobileMalay.Split("base64,")[1];

            using (var Generic_Helpers = new GenericHelpers(Connection))
            {
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerWebChinese,
                    BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                    request.BannerIdChinese.ToString(),
                    temp.ExtensionWebChinese);
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerMobileChinese,
                    BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                    request.BannerIdChinese.ToString(),
                    temp.ExtensionMobileChinese);

                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerWebEnglish,
                    BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                    request.BannerIdEnglish.ToString(),
                    temp.ExtensionWebEnglish);
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerMobileEnglish,
                    BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                    request.BannerIdEnglish.ToString(),
                    temp.ExtensionMobileEnglish);

                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerWebMalay,
                    BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                    request.BannerIdMalay.ToString(),
                    temp.ExtensionWebMalay);
                Generic_Helpers.GetImageWithExtension(
                    uploadManager,
                    request.BannerMobileMalay,
                    BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                    request.BannerIdMalay.ToString(),
                    temp.ExtensionMobileMalay);
            }

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerImageAsync(temp);
            }

            return OkResponse();
        }

        #endregion 6.2 HomePage Banner Image Insert

        #region 6.3 HomePage Banner Update

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerUpdate)]
        public async Task<IActionResult> HomePageBannerUpdate([FromBody] HomePageBannerUpdateRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerUpdateAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse(result);
            }
        }

        #endregion 6.3 HomePage Banner Update

        #region 6.4 HomePage Banner Image Update

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerImageUpdate)]
        [Filters.RequestSizeLimit(valueCountLimit: 6)]
        public async Task<IActionResult> HomePageBannerImageUpdate(
            [FromBody] HomePageBannerImageUpdateRequest request,
            [FromServices] IUploadManager uploadManager,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            HomePageBannerImagePersist temp = new HomePageBannerImagePersist();
            temp.BannerIdChinese = Guid.Parse(request.BannerIdChinese);
            temp.BannerIdEnglish = Guid.Parse(request.BannerIdEnglish);
            temp.BannerIdMalay = Guid.Parse(request.BannerIdMalay);

            using (var generic_help = new GenericHelpers(Connection))
            {
                if (!string.IsNullOrWhiteSpace(request.BannerWebEnglish))
                {
                    temp.ExtensionWebEnglish = "." + request.BannerWebEnglish.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerWebEnglish = request.BannerWebEnglish.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdEnglish.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerWebEnglish,
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                        request.BannerIdEnglish.ToString(),
                        temp.ExtensionWebEnglish);
                }
                if (!string.IsNullOrWhiteSpace(request.BannerMobileEnglish))
                {
                    temp.ExtensionMobileEnglish = "." + request.BannerMobileEnglish.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerMobileEnglish = request.BannerMobileEnglish.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdEnglish.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerMobileEnglish,
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                        request.BannerIdEnglish.ToString(),
                        temp.ExtensionMobileEnglish);
                }

                if (!string.IsNullOrWhiteSpace(request.BannerWebMalay))
                {
                    temp.ExtensionWebMalay = "." + request.BannerWebMalay.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerWebMalay = request.BannerWebMalay.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdMalay.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerWebMalay,
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                        request.BannerIdMalay.ToString(),
                        temp.ExtensionWebMalay);
                }
                if (!string.IsNullOrWhiteSpace(request.BannerMobileMalay))
                {
                    temp.ExtensionMobileMalay = "." + request.BannerMobileMalay.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerMobileMalay = request.BannerMobileMalay.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdMalay.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerMobileMalay,
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                        request.BannerIdMalay.ToString(),
                        temp.ExtensionMobileMalay);
                }

                if (!string.IsNullOrWhiteSpace(request.BannerWebChinese))
                {
                    temp.ExtensionWebChinese = "." + request.BannerWebChinese.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerWebChinese = request.BannerWebChinese.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdChinese.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerWebChinese,
                        BaseUrlConfigsOptions.Value.HomePageBannerWebleImage,
                        request.BannerIdChinese.ToString(),
                        temp.ExtensionWebChinese);
                }
                if (!string.IsNullOrWhiteSpace(request.BannerMobileChinese))
                {
                    temp.ExtensionMobileChinese = "." + request.BannerMobileChinese.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.BannerMobileChinese = request.BannerMobileChinese.Split("base64,")[1];

                    generic_help.DeleteImage(
                        uploadManager,
                        request.BannerIdChinese.ToString(),
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage);

                    generic_help.GetImageWithExtension(
                        uploadManager,
                        request.BannerMobileChinese,
                        BaseUrlConfigsOptions.Value.HomePageBannerMobileImage,
                        request.BannerIdChinese.ToString(),
                        temp.ExtensionMobileChinese);
                }
            }

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerImageAsync(temp);
            }

            return OkResponse();
        }

        #endregion 6.4 HomePage Banner Image Update

        #region 6.5 HomePage Banner Delete

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerDelete)]
        public async Task<IActionResult> HomePageBannerDelete([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            string adminId = GetUserId(User).ToString();

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerDeleteAsync(Guid.Parse(request.Id), adminId);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse();
            }
        }

        #endregion 6.5 HomePage Banner Delete

        #region 6.6 HomePage Banner Status Active

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerUpdateStatus)]
        public async Task<IActionResult> HomePageBannerUpdateStatus([FromBody] UpdateStatusWithAdminIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            request.AdminId = GetUserId(User);

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                await Settings_Helpers.HomePageBannerUpdateStatusAsync(request);

                await _hubContext.Clients.All.SendAsync("HomePageBannerInsertUpdate");

                return OkResponse();
            }
        }

        #endregion 6.6 HomePage Banner Status Active

        #region 6.7 HomePage Banner Select By User

        [HttpGet(ActionsConst.Settings.HomePageBannerSelectByUser)]
        public async Task<IActionResult> HomePageBannerSelectByUser([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            HomePageBannerRetriveRequest request = new HomePageBannerRetriveRequest
            {
                isUser = true
            };

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerSelectUserAsync(
                    BaseUrlConfigsOptions.Value,
                    Language.Id.ToString(),
                    request);

                return OkResponse(result);
            }
        }

        #endregion 6.7 HomePage Banner Select By User

        #region 6.8 HomePage Banner Select By Admin

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerSelectByAdmin)]
        public async Task<IActionResult> HomePageBannerSelectByAdmin(
            [FromBody] HomePageBannerRetriveByAdminRequest request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            request.isUser = false;
            if (request.PageNo == null) request.PageNo = 0;
            if (request.PageSize == null || request.PageSize == 0) request.PageSize = 10;

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerSelectByAdminAsync(
                    BaseUrlConfigsOptions.Value,
                    request.LanguageId,
                    request);

                if (result.Any())
                {
                    var total = result.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? result.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = result,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = result.FirstOrDefault().OffSet,
                    });
                }

                return OkResponse(new
                {
                    result = result,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }

        #endregion 6.8 HomePage Banner Select By Admin

        #region 6.9 HomePage Banner Select By Admin By Id

        [Authorize]
        [HttpPost(ActionsConst.Settings.HomePageBannerSelectById)]
        public async Task<IActionResult> HomePageBannerSelectById(
            [FromBody] GetByIdRequestWithRequired request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            IsAdmin();

            using (var Settings_Helpers = new SettingsHelpers(Connection))
            {
                var result = await Settings_Helpers.HomePageBannerSelectByIdAsync(request);

                return OkResponse(result);
            }
        }

        #endregion 6.9 HomePage Banner Select By Admin By Id

        #endregion 6. HomePage Banner (Add, Update, Update Status, Delete, Retrieve List)
    }
}