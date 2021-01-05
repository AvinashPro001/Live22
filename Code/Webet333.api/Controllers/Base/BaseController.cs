using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Entities;
using Webet333.models.Response.Account;

namespace Webet333.api.Controllers.Base
{
    [ServiceFilter(typeof(ExceptionFilters))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    public class BaseController : Controller, IDisposable
    {
        #region Object declaration and constructor
        protected string Connection { get; set; }

        protected string Connection120 { get; set; }

        protected Language Language { get; set; }
        protected ProfileResponse UserEntity { get; set; }
        protected IStringLocalizer<BaseController> Localizer { get; set; }
        protected string UserRole = string.Empty;
        protected BaseUrlConfigs baseUrlConfigs { get; set; }

        public BaseController(ConnectionConfigs ConnectionStrings = null, IStringLocalizer<BaseController> Localizer = null,BaseUrlConfigs baseUrlConfigs=null)
        {
            this.Connection = ConnectionStrings.DefaultConnection;
            this.Connection120 = ConnectionStrings.DefaultConnection120;
            this.Localizer = Localizer;
            this.baseUrlConfigs = baseUrlConfigs;
            this.Language = GetLanguage();
        }
        #endregion

        #region Generic tasks
        protected dynamic GetData(string stored_proc, object data)
        {
            using (var GenericHelper = new GenericHelpers(Connection))
            {
                return GenericHelper.GetList(stored_proc, data);
            }
        }
        #endregion

        #region Get Language from user's selection
        private Language GetLanguage()
        {
            using (var Repository = new DapperRepository<Language>(Connection))
            {
                var Language = Repository.Find(StoredProcConsts.Account.SelectLanguage, new { Code = Startup.CurrentLanguage });
                if (Language == null)
                    Language = Repository.Find(StoredProcConsts.Account.SelectLanguage, new { Code = LanguageConst.Malay });
                return Language;
            }
        }
        #endregion

        #region Get current user's data using Token
        protected bool IsLoggedIn(ClaimsPrincipal User)
        {
            return User.Identity.IsAuthenticated;
        }

        protected Guid GetUserId(ClaimsPrincipal User)
        {
            var user_id = User.Claims.Where(x => x.Type == JwtRegisteredClaimNames.Sid)?.FirstOrDefault().Value;
            return Guid.Parse(new security.AesAlgoridhm().Decrypt(user_id));
        }

        protected string GetUserName(ClaimsPrincipal User)
        {
            var email = User.Claims.Where(x => x.Type == ClaimTypes.GivenName)?.FirstOrDefault().Value;
            return new security.AesAlgoridhm().Decrypt(email);
        }

        protected string GetUniqueId(ClaimsPrincipal User)
        {
            var uniqueId = User.Claims.Where(x => x.Type == JwtRegisteredClaimNames.Jti)?.FirstOrDefault().Value;
            return new security.AesAlgoridhm().Decrypt(uniqueId);
        }

        protected string GetUserRole(ClaimsPrincipal User)
        {
            var role = User.Claims.Where(x => x.Type == ClaimTypes.Role)?.FirstOrDefault().Value;
            return new security.AesAlgoridhm().Decrypt(role);
        }
        #endregion

        #region Check user Role
        protected async Task CheckUserRole()
        {
            var role = GetUserRole(User);
            if (role != RoleConst.Admin) BadResponse("forbid_error_access");
        }
        #endregion

        #region Validate User
        protected async Task ValidateUser(ProfileResponse user = null, string role = null)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                using (var account_help = new AccountHelpers(Connection))
                {
                    user = await account_help.FindUser(uniqueId: GetUniqueId(User), grantType: GetUserRole(User));
                    user.VIPBanner = (!string.IsNullOrEmpty(user.VIPBanner)) ? $"{baseUrlConfigs.ImageBase}{baseUrlConfigs.VIPIcon}/{user.VIPLevel}{user.VIPBanner}" : "";
                }
            }
            if (user == null) BadResponse("error_access_token_expired");
            //if (!user.EmailConfirmed) BadResponse("bad_response_account_not_confirmed");
            if (!user.Active) BadResponse("bad_response_account_inactive");
            if (user.Deleted) BadResponse("bad_response_account_delete");
            if (role != null) if (user.Role != role.ToLower()) BadResponse("forbid_error_access");
            this.UserEntity = user;
        }
        #endregion

        #region Setting up responses
        #region OkResponse
        protected IActionResult OkResponse() => OkResponse(Localizer["ok_response_success"].Value);

        protected IActionResult OkResponse(string message) => Ok(new { message = Localizer[message].Value });

        protected IActionResult OkResponse(object data) => OkResponse(Localizer["ok_response_success"].Value, data);

        protected IActionResult OkResponse(string message, object data) => Ok(new { message, data });
        #endregion

        #region NotFoundResponse
        protected IActionResult NotFoundResponse() => StatusCodeResult("not_found_response", 404);

        protected IActionResult NotFoundResponse(string Message) => StatusCodeResult(Message, 404);
        #endregion

        #region BadRequest Response
        protected IActionResult BadResponse() => StatusCodeResult("bad_response_something_wrong", 400);

        protected IActionResult BadResponse(string Message) => StatusCodeResult(Message, 400);

        protected IActionResult BadResponse(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary ModelState)
        {
            string message = string.Join("; ", ModelState.SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage));
            throw new Filters.ApiException(message, 400);
        }
        #endregion

        #region Custom Status Code
        protected IActionResult StatusCodeResult(string Message, int Code) => throw new Filters.ApiException(Message, Code);
        #endregion
        #endregion
    }
}