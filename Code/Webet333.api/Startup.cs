using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.files;
using Webet333.files.interfaces;
using Webet333.logs;
using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.notify;
using Webet333.notify.interfaces.Email;
using Webet333.queue;


namespace Webet333.api
{
    public class Startup
    {
        public static string CurrentLanguage { get; set; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration) => Configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            #region Language translate
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[] { new CultureInfo(LanguageConst.English), new CultureInfo(LanguageConst.Malay), new CultureInfo(LanguageConst.Chinese) };
                options.DefaultRequestCulture = new RequestCulture(culture: LanguageConst.English, uiCulture: LanguageConst.English);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(context =>
                {
                    var userLangs = context.Request.Headers["Accept-Language"].ToString();
                    var firstLang = userLangs.Split(',').FirstOrDefault();
                    CurrentLanguage = (string.IsNullOrEmpty(firstLang) || (firstLang != LanguageConst.English && firstLang != LanguageConst.Malay && firstLang != LanguageConst.Chinese)) ? LanguageConst.English : firstLang;
                    return Task.FromResult(new ProviderCultureResult(CurrentLanguage, CurrentLanguage));
                }));
            });
            #endregion

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().AllowCredentials();
            }));

            #region JWT Authentication.
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Authentication:Issuer"],
                    ValidAudience = Configuration["Authentication:Audiance"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Authentication:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            });
            #endregion

            services.AddMvc();

            #region Swagger initialization.
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Webet333 - API Documentation", Version = "v1" });
            });
            #endregion

            services.Configure<IISOptions>(options => { options.ForwardClientCertificate = false; });

            #region Initialization of Configs.
            services.Configure<EmailConfig>(Configuration.GetSection("EmailConfig"));
            services.Configure<AppConfig>(Configuration.GetSection("AppConfig"));
            services.Configure<PushConfig>(Configuration.GetSection("PushConfig"));
            services.Configure<AuthConfig>(Configuration.GetSection("Authentication"));
            services.Configure<ConnectionConfigs>(Configuration.GetSection("ConnectionStrings"));
            services.Configure<BaseUrlConfigs>(Configuration.GetSection("BaseConfig"));
            #endregion

            #region Registering Dependency Injections.

            services.AddScoped<IMessages, Messages>();
            services.AddScoped<ILogManager, LogManager>();
            services.AddScoped<ApiLogsManager, ApiLogsManager>();

            services.AddSingleton<SeedHelpers>();
            services.AddSingleton<IUploadManager, UploadManager>();
            services.AddSingleton<ExceptionFilters, ExceptionFilters>();
            services.AddSingleton<SignalRHub, SignalRHub>();
            services.AddSingleton<SerialQueue>();

            #endregion

            services.AddMvc().AddXmlSerializerFormatters();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            #region Signal R Initialization
            services.AddSignalR();
            #endregion

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, SeedHelpers seed, IMessages messages)
        {
            app.UseDeveloperExceptionPage();
            app.UseCors("CorsPolicy");

            var localizationOption = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(localizationOption.Value);

            // Will give error status code
            //app.UseStatusCodePages();
            //app.UseStatusCodePagesWithRedirects("/Error/{0}");
            //app.UseStatusCodePagesWithReExecute("/Exception/Error", "?statusCode={0}");

            app.UseStaticFiles();
            app.UseAuthentication();

            seed.Seed(messages);

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Webet333 - API Documentation");
            });

            app.UseMiddleware<LogMiddleware>();

            app.UseMvc(route =>
            {
                route.MapRoute(
                    name: "default",
                    template: "{controller=Dashboard}/{action=Index}/{id?}"
                );
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<SignalRHub>("/signalrhub");
            });
        }
    }
}
