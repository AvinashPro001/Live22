using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Webet333.api.Controllers.Base;

namespace Webet333.api.Filters
{
    public class CustomIdentityFilters : IdentityErrorDescriber
    {
        #region Object Declaration and Constructor

        protected readonly IStringLocalizer<BaseController> Localizer;

        public CustomIdentityFilters(IStringLocalizer<BaseController> localizer)
        {
            Localizer = localizer;
        }

        #endregion Object Declaration and Constructor

        #region Cusome Identity Errors

        public override IdentityError DefaultError() => new IdentityError { Code = nameof(DefaultError), Description = Localizer["DefaultError"] };

        public override IdentityError ConcurrencyFailure() => new IdentityError { Code = nameof(ConcurrencyFailure), Description = Localizer["ConcurrencyFailure"] };

        public override IdentityError PasswordMismatch() => new IdentityError { Code = nameof(PasswordMismatch), Description = Localizer["PasswordMismatch"] };

        public override IdentityError InvalidToken() => new IdentityError { Code = nameof(InvalidToken), Description = "Invalid token." };

        public override IdentityError LoginAlreadyAssociated() => new IdentityError { Code = nameof(LoginAlreadyAssociated), Description = Localizer["LoginAlreadyAssociated"] };

        public override IdentityError InvalidUserName(string userName) => new IdentityError { Code = nameof(InvalidUserName), Description = Localizer["InvalidUserName", userName] };

        public override IdentityError InvalidEmail(string email) => new IdentityError { Code = nameof(InvalidEmail), Description = Localizer["InvalidEmail", email] };

        public override IdentityError DuplicateUserName(string userName) => new IdentityError { Code = nameof(DuplicateUserName), Description = Localizer["DuplicateUserName", userName] };

        public override IdentityError DuplicateEmail(string email) => new IdentityError { Code = nameof(DuplicateEmail), Description = Localizer["DuplicateEmail", email] };

        public override IdentityError InvalidRoleName(string role) => new IdentityError { Code = nameof(InvalidRoleName), Description = Localizer["InvalidRoleName", role] };

        public override IdentityError DuplicateRoleName(string role) => new IdentityError { Code = nameof(DuplicateRoleName), Description = Localizer["DuplicateRoleName", role] };

        public override IdentityError UserAlreadyHasPassword() => new IdentityError { Code = nameof(UserAlreadyHasPassword), Description = Localizer["UserAlreadyHasPassword"] };

        public override IdentityError UserLockoutNotEnabled() => new IdentityError { Code = nameof(UserLockoutNotEnabled), Description = Localizer["UserLockoutNotEnabled"] };

        public override IdentityError UserAlreadyInRole(string role) => new IdentityError { Code = nameof(UserAlreadyInRole), Description = Localizer["UserAlreadyInRole", role] };

        public override IdentityError UserNotInRole(string role) => new IdentityError { Code = nameof(UserNotInRole), Description = Localizer["UserNotInRole", role] };

        public override IdentityError PasswordTooShort(int length) => new IdentityError { Code = nameof(PasswordTooShort), Description = Localizer["PasswordTooShort", length] };

        public override IdentityError PasswordRequiresNonAlphanumeric() => new IdentityError { Code = nameof(PasswordRequiresNonAlphanumeric), Description = Localizer["PasswordRequiresNonAlphanumeric"] };

        public override IdentityError PasswordRequiresDigit() => new IdentityError { Code = nameof(PasswordRequiresDigit), Description = Localizer["PasswordRequiresDigit"] };

        public override IdentityError PasswordRequiresLower() => new IdentityError { Code = nameof(PasswordRequiresLower), Description = Localizer["PasswordRequiresLower"] };

        public override IdentityError PasswordRequiresUpper() => new IdentityError { Code = nameof(PasswordRequiresUpper), Description = Localizer["PasswordRequiresUpper"] };

        #endregion Cusome Identity Errors
    }
}