using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Webet333.api.Controllers.Base;
using Webet333.logs.interfaces;

namespace Webet333.api.Filters
{
    public class ExceptionFilters : ExceptionFilterAttribute
    {
        protected ILogManager LogManager { get; set; }
        protected IStringLocalizer<BaseController> Localizer { get; }

        public ExceptionFilters(ILogManager LogManager, IStringLocalizer<BaseController> Localizer)
        {
            this.LogManager = LogManager;
            this.Localizer = Localizer;
        }

        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ApiException)
            {
                var exception = context.Exception as ApiException;
                context.HttpContext.Response.StatusCode = exception.StatusCode;
#if RELEASE
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value , details = exception.StackTrace});
#else
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value, details = exception.StackTrace });
#endif
            }
            else if (context.Exception is SqlException)
            {
                var exception = context.Exception as SqlException;
                context.HttpContext.Response.StatusCode = 400;
#if RELEASE
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value, details = exception.StackTrace });
#else
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value, details = exception.StackTrace });
#endif
            }
            else
            {
                var exception = context.Exception as Exception;
                context.HttpContext.Response.StatusCode = 500;
                LogManager.LogError(exception.Message, exception);
#if RELEASE
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value , details = exception.StackTrace});
#else
                context.Result = new JsonResult(new { message = Localizer[exception.Message].Value, details = exception.StackTrace });
#endif
            }
        }
    }

    #region API Exception class declaration.
    public class ApiException : Exception
    {
        public int StatusCode { get; set; }
        public IEnumerable<string> Errors { get; }

        public ApiException(string message, int statusCode = 500, IEnumerable<string> Errors = null) : base(message)
        {
            StatusCode = statusCode;
            this.Errors = Errors;
        }

        public ApiException(Exception ex, int statusCode = 500) : base(ex.Message)
        {
            StatusCode = statusCode;
        }
    }

    //public class ApiError
    //{
    //    public string Message { get; set; }
    //    public string Detail { get; set; }
    //    public IEnumerable<string> Errors { get; }

    //    public ApiError(string message) => this.Message = message;

    //    public ApiError(ModelStateDictionary modelState)
    //    {
    //        if (modelState != null && modelState.Any(m => m.Value.Errors.Count > 0))
    //        {
    //            Message = "Please correct the specified errors and try again.";
    //            Errors = modelState.SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();
    //        }
    //    }
    //}
    #endregion
}
