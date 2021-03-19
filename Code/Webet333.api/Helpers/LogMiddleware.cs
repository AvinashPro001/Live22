using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Webet333.logs;
using Webet333.models.Configs;

namespace Webet333.api.Helpers
{
    public class LogMiddleware
    {
        private readonly RequestDelegate _next;

        protected ApiLogsManager apiLogsManager { get; set; }

        private IHttpContextAccessor HttpContextAccessor;

        private IOptions<ConnectionConfigs> ConnectionStringsOptions;

        private string apiName = string.Empty;
        private string requestBody = string.Empty;
        private string responseBody = string.Empty;
        private int status = 0;
        private string Role = string.Empty;
        private string userUniquiId = string.Empty;

        public LogMiddleware(
            RequestDelegate next,
            ApiLogsManager LogManager,
            IHttpContextAccessor HttpContextAccessor, IOptions<ConnectionConfigs> ConnectionStringsOptions)
        {
            _next = next;
            this.HttpContextAccessor = HttpContextAccessor;
            this.apiLogsManager = LogManager;
            this.ConnectionStringsOptions = ConnectionStringsOptions;
            Role = string.Empty;
            userUniquiId = string.Empty;
        }

        public async Task Invoke(HttpContext context)
        {
            var request = await FormatRequest(context.Request);

            if (context.User.Identity.IsAuthenticated)
            {
                userUniquiId = new security.AesAlgoridhm().Decrypt(context.User.Claims.Where(x => x.Type == JwtRegisteredClaimNames.Jti)?.FirstOrDefault().Value);
                Role = new security.AesAlgoridhm().Decrypt(context.User.Claims.Where(x => x.Type == ClaimTypes.Role)?.FirstOrDefault().Value);
            }
            else
            {
                Role = null;
                userUniquiId = null;
            }
            var originalBodyStream = context.Response.Body;

            using (var responseBody = new MemoryStream())
            {
                context.Response.Body = responseBody;

                await _next(context);

                var response = await FormatResponse(context.Response);

                await responseBody.CopyToAsync(originalBodyStream);
            }
            var apiRequestInsert = new ApiLogMangaerRequest()
            {
                apiname = apiName,
                createdby = GetIPAddress(),
                requestbody = requestBody,
                responsebody = responseBody,
                StatusCode = status,
                Role = Role,
                UniqueId = userUniquiId
            };

            if (status == 200)
                apiRequestInsert.Status = "Success";
            else
                apiRequestInsert.Status = "Error";

            ApiLogsManager.APILogsInsert(apiRequestInsert);
        }

        private async Task<string> FormatRequest(HttpRequest request)
        {
            request.EnableRewind();

            var body = request.Body;

            var buffer = new byte[Convert.ToInt32(request.ContentLength)];

            await request.Body.ReadAsync(buffer, 0, buffer.Length);

            var bodyAsText = Encoding.UTF8.GetString(buffer);

            body.Seek(0, SeekOrigin.Begin);

            request.Body = body;

            requestBody = bodyAsText;

            return $"{request.Scheme}{request.Host}{request.Path}{request.QueryString}{bodyAsText}";
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);

            string text = await new StreamReader(response.Body).ReadToEndAsync();

            response.Body.Seek(0, SeekOrigin.Begin);

            var path = (response.HttpContext.Request.Path).ToString();

            apiName = path.Replace("/api/v1/", "");
            status = response.StatusCode;
            responseBody = text;

            return $"{response.StatusCode}:{text}";
        }

        #region Get IPAddress

        internal string GetIPAddress()
        {
            string IPAddress = string.Empty;
#if DEBUG
            return IPAddress = "27.109.11.27";
#else
            return IPAddress = HttpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
#endif
        }

        #endregion Get IPAddress
    }
}