using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Webet333.api.Filters;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Response;
using Webet333.models.Response.Account;

namespace Webet333.api.Helpers
{
    public class TokenHelpers : IDisposable
    {
        private string Connection { get; set; }

        public TokenHelpers(string Connection)
        {
            this.Connection = Connection;
        }

        #region Do background process for the Saving, Validating and Updating
        public string GenerateToken(string userId, string purpose)
        {
            using (var Repository = new DapperRepository<dynamic>(Connection))
            {
                var token = Repository.Find(StoredProcConsts.Account.SetToken, new TokenRequest
                {
                    userId = userId,
                    purpose = purpose,
                    uniqueId = Guid.NewGuid().ToString(),
                    expired = false
                });
                return SecurityHelpers.EncryptText(JsonConvert.SerializeObject(token));
            }
        }

        public async Task<dynamic> ValidateToken(string token, string purpose)
        {
            var token_data = JsonConvert.DeserializeObject<TokenRequest>(SecurityHelpers.DecryptText(token));
            using (var Repository = new DapperRepository<dynamic>(Connection))
            {
                var token_obj =await Repository.FindAsync(StoredProcConsts.Account.SetToken, new { token_data.uniqueId });
                if (token_obj != null && token_obj.Result.purpose == purpose)
                    return token_obj;
            }
            throw new ApiException("error_token_expired", 400);
        }

        public async Task<int> ExpireToken(string uniqueId, string userId)
        {
            using (var Repository = new DapperRepository<dynamic>(Connection))
            {
                await Repository.AddOrUpdateAsync(StoredProcConsts.Account.UpdateToken, new { uniqueId, userId });
            }
            return 0;
        }
        #endregion

        #region Generate Access Token
        public string GetAccessToken(AuthConfig AuthConfig, ProfileResponse profile, string UniqueId)
        {
            Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sid, SecurityHelpers.EncryptText(profile.Id.ToString())),
                //new Claim(JwtRegisteredClaimNames.Email, SecurityHelpers.EncryptText(profile.Email)),
                new Claim(JwtRegisteredClaimNames.UniqueName, SecurityHelpers.EncryptText(profile.UserName)),
                new Claim(JwtRegisteredClaimNames.GivenName, SecurityHelpers.EncryptText(profile.Name)),
                new Claim(JwtRegisteredClaimNames.Jti, SecurityHelpers.EncryptText(UniqueId)),
                new Claim(ClaimTypes.Role, SecurityHelpers.EncryptText(profile.Role.ToString()))
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthConfig.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(AuthConfig.Issuer, AuthConfig.Audiance, expires: DateTime.Now.AddMinutes(AuthConfig.AccessExpireMinutes), signingCredentials: creds, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion

        #region Generate token for each task
        public string GenerateResetPasswordToken(string userId)
        {
            return GenerateToken(userId, EmailTypeConst.ResetPassword);
        }

        public string GenerateChangeEmailToken(string userId)
        {
            return GenerateToken(userId, EmailTypeConst.ChangeEmail);
        }

        public string GenerateConfirmEmailToken(string userId)
        {
            return GenerateToken(userId, EmailTypeConst.ConfirmEmail);
        }

        public string GenerateAdminInviteToken(string userId)
        {
            return GenerateToken(userId, EmailTypeConst.AdminInvite);
        }
        #endregion

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }
    }
}
