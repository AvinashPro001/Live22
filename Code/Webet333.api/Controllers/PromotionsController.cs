using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Payments;
using Webet333.models.Request.Promotions;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class PromotionsController : BaseController
    {
        #region variable 

        public PromotionsController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion variable 

        #region Promotion Insert, Update, Delete, Retrieve

        #region all Promotion Retrive 

        [HttpPost(ActionsConst.Promotions.Retrive)]
        public async Task<IActionResult> Retrieve([FromBody] PromotionRetriveRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOption)
        {
            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                return OkResponse(await promotion_help.Retrieve(BaseUrlConfigsOption.Value, request, Language.Code, null, null)); ;
            }
        }

        #endregion all Promotion Retrive 

        #region Promotion Insert

        [HttpPost(ActionsConst.Promotions.Insert)]
        public async Task<IActionResult> Insert([FromBody] PromotionRequest request)
        {
            await CheckUserRole();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                var promotions = await promotion_help.Insert(request);
                return OkResponse(promotions.Id);
            }
        }

        #endregion Promotion Insert

        #region Promotion Update

        [HttpPost(ActionsConst.Promotions.Update)]
        public async Task<IActionResult> Update([FromBody] PromotionUpdateRequest request)
        {
            await CheckUserRole();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                var promotions = await promotion_help.PromotionUpdate(request);
                return OkResponse(promotions.Id);
            }
        }

        #endregion Promotion Update

        #region Promotion Image Insert

        [HttpPost(ActionsConst.Promotions.Image)]
        [Filters.RequestSizeLimit(valueCountLimit: 2)]
        public async Task<IActionResult> Image([FromBody] PromotionImageRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var extension = "." + request.FormFile.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var extensionMobile = "." + request.FormMobileFile.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.FormFile = request.FormFile.Split("base64,")[1];
            request.FormMobileFile = request.FormMobileFile.Split("base64,")[1];

            await ValidateUser();

            using (var generic_help = new GenericHelpers(Connection))
            {
                generic_help.GetImageWithExtension(uploadManager, request.FormFile, BaseUrlConfigsOptions.Value.PromotionImage, request.Id.ToString(), extension);
                generic_help.GetImageWithExtension(uploadManager, request.FormMobileFile, BaseUrlConfigsOptions.Value.PromotionMobileImage, request.Id.ToString(), extensionMobile);
            }

            using (var promotion_help = new PromotionsHelpers(Connection))
                await promotion_help.Update(Guid.Parse(request.Id), extension, extensionMobile);

            return OkResponse();
        }

        #endregion Promotion Image Insert

        #region Promotion Image Update

        [HttpPost(ActionsConst.Promotions.UpdateImage)]
        [Filters.RequestSizeLimit(valueCountLimit: 2)]
        public async Task<IActionResult> UpdateImage([FromBody] PromotionImageUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser();

            string extension=string.Empty, extensionMobile = string.Empty;
            using (var generic_help = new GenericHelpers(Connection))
            {
                if (!String.IsNullOrEmpty(request.FormFile))
                {
                    extension = "." + request.FormFile.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.FormFile = request.FormFile.Split("base64,")[1];

                    generic_help.DeleteImage(uploadManager, request.Id.ToString(), BaseUrlConfigsOptions.Value.PromotionImage);

                    generic_help.GetImageWithExtension(uploadManager, request.FormFile, BaseUrlConfigsOptions.Value.PromotionImage, request.Id.ToString(), extension);
                }

                if (!String.IsNullOrEmpty(request.FormMobileFile))
                {
                    extensionMobile = "." + request.FormMobileFile.Split("base64,")[0].Split("/")[1].Replace(";", "");
                    request.FormMobileFile = request.FormMobileFile.Split("base64,")[1];

                    generic_help.DeleteImage(uploadManager, request.Id.ToString(), BaseUrlConfigsOptions.Value.PromotionMobileImage);

                    generic_help.GetImageWithExtension(uploadManager, request.FormMobileFile, BaseUrlConfigsOptions.Value.PromotionMobileImage, request.Id.ToString(), extensionMobile);
                }
            }

            using (var promotion_help = new PromotionsHelpers(Connection))
                await promotion_help.Update(Guid.Parse(request.Id), extension, extensionMobile);

            return OkResponse();
        }

        #endregion Promotion Image Update

        #region Promotion Delete 

        [HttpPost(ActionsConst.Promotions.Delete)]
        public async Task<IActionResult> Delete([FromBody] GetByIdRequest request)
        {
            await CheckUserRole();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                await promotion_help.Delete(Guid.Parse(request.Id));
                return OkResponse();
            }
        }

        #endregion Promotion Delete

        #region Promotion Status Active

        [HttpPost(ActionsConst.Promotions.UpdateStatus)]
        public async Task<IActionResult> UpdateStatus([FromBody] PromotionUpdateStatusRequest request)
        {
            await CheckUserRole();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                await promotion_help.UpdateStatus(request);
                return OkResponse();
            }
        }

        #endregion Promotion Status Active

        #region Promotion Select For User

        [Authorize]
        [HttpPost(ActionsConst.Promotions.SelectDaily)]
        public async Task<IActionResult> SelectPromotionsForUser([FromBody] UsersPromotionRetrive request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                var promotions = await promotion_help.SelectPromotion(BaseUrlConfigsOptions.Value, Language.Id.ToString(), request, Role);
                return OkResponse(promotions);
            }
        }

        #endregion Promotion Select For User

        #region Admin Promotion Retrive

        [Authorize]
        [HttpPost(ActionsConst.Promotions.AdminRetrive)]
        public async Task<IActionResult> SelectPromotionsForAdmin([FromBody] PromotionAdminRetriveRequest request ,[FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            using (var promotion_help = new PromotionsHelpers(Connection))
            {
                var promotions = await promotion_help.RetrieveAdmin(request,BaseUrlConfigsOptions.Value);
                return OkResponse(promotions);
            }
        }

        #endregion Admin Promotion Retrive

        #endregion

        #region Promotion Apply Check

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionApplyCheck)]
        public async Task<IActionResult> PromotionApplyCheck([FromBody] PromotionApplyRequest request)
        {
            var Role = GetUserRole(User);

            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;
            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                return OkResponse(await promotion_helper.PromotionApplyCheck(request));
            }
        }

        #endregion Promotion Apply Check

        #region Promotion Apply Insert

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionApplyInsert)]
        public async Task<IActionResult> PromotionApplyCheck([FromBody] PromotionApplyInsertRequest request)
        {
            var Role = GetUserRole(User);

            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;
            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                await promotion_helper.PromotionApplyInsert(request);
                return OkResponse();
            }
        }

        #endregion Promotion Apply Insert

        #region Promotion Apply List

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionApplyList)]
        public async Task<IActionResult> PromotionApplyList([FromBody] PromotionApplySelectRequest request)
        {
            var Role = GetUserRole(User);

            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;
            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                return OkResponse(await promotion_helper.PromotionApplyList(request));
            }
        }

        #endregion Promotion Apply List

        #region Promotion Group Insert

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionGroupInsert)]
        public async Task<IActionResult> PromotionGroupInsert([FromBody] PromotionGroupInsertRequest request)
        {
            await CheckUserRole();

            request.CreatedBy = GetUserId(User).ToString();
            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                await promotion_helper.PromotionGroupInsert(request);
                return OkResponse();
            }
        }

        #endregion 

        #region Promotion Group Update

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionGroupUpdate)]
        public async Task<IActionResult> PromotionGroupUpdate([FromBody] PromotionGroupUpdateRequest request)
        {
            await CheckUserRole();

            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                await promotion_helper.PromotionGroupUpdate(request);
                return OkResponse();
            }
        }

        #endregion

        #region Promotion Group Select

        [Authorize]
        [HttpGet(ActionsConst.Promotions.PromotionGroupSelect)]
        public async Task<IActionResult> PromotionGroupSelect()
        {
            await CheckUserRole();

            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                var result = await promotion_helper.PromotionGroupSelect();
                return OkResponse(result);
            }
        }

        #endregion 

        #region Promotion Group DELETE

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionGroupDelete)]
        public async Task<IActionResult> PromotionGroupDelete([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();

            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                await promotion_helper.PromotionGroupDelete(request);
                return OkResponse();
            }
        }

        #endregion

        #region Promotion Report List

        [Authorize]
        [HttpPost(ActionsConst.Promotions.PromotionReport)]
        public async Task<IActionResult> PromotionReport([FromBody] GlobalListRequest request)
        {
            await CheckUserRole();

            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                var result = await promotion_helper.PromotionReport(request);
                return OkResponse(result);
            }
        }

        #endregion Promotion Report List


        #region Free Credit Promotion Setting

        //[Authorize]
        [HttpGet(ActionsConst.Promotions.PromotionFreeCredit)]
        public async Task<IActionResult> FreeCreditPromotionSetting()
        {
            //var Role = GetUserRole(User);

            using (var promotion_helper = new PromotionsHelpers(Connection))
            {
                return OkResponse(await promotion_helper.FreeCreditPromotionSetting());
            }
        }

        #endregion Free Credit Promotion Setting
    }
}