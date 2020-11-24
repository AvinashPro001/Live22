using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using Webet333.dapper;
using Webet333.logs.interfaces;
using Webet333.models.Configs;

namespace Webet333.logs
{
    public class LogManager : ILogManager
    {
        #region Object and Contructor defination
        private const string CreateTable = @"IF object_id('[dbo].[ApplicationLogs]') IS NULL BEGIN CREATE TABLE [dbo].[ApplicationLogs]([Id] [uniqueidentifier] NOT NULL,[Category] [nvarchar](50) NULL,[Message] [nvarchar](250) NULL,[Details] [nvarchar](max) NULL,[Created] [datetime2](7) NULL,CONSTRAINT [PK_ApplicationLogs]PRIMARY KEY CLUSTERED  ( [Id] ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]; ALTER TABLE [dbo].[ApplicationLogs] ADD  CONSTRAINT [DF_ApplicationLogs_Id]  DEFAULT (newid()) FOR [Id]; ALTER TABLE [dbo].[ApplicationLogs] ADD  CONSTRAINT [DF_ApplicationLogs_Created]  DEFAULT (getutcdate()) FOR [Created] END";
        private readonly string ConnectionString = string.Empty;

        public LogManager(IOptions<ConnectionConfigs> ConnectionStringsOptions)
        {
            ConnectionString = ConnectionStringsOptions.Value.DefaultConnection;
            using (var repository = new DapperRepository<dynamic>(ConnectionString))
            {
                repository.AddOrUpdate(CreateTable, new { }, System.Data.CommandType.Text);
            }
        }

        public void AddOrUpdateLogs(string category, string message, string details = null)
        {
            using (var repository = new DapperRepository<ApplicationLogs>(ConnectionString))
            {
                repository.AddOrUpdate(new ApplicationLogs { Details = details, Message = message, Category = category });
            }
        }
        #endregion

        public void LogInfo(string message, string details = null)
        {
            AddOrUpdateLogs("info", message, details);
        }

        public void LogError(string message, Exception details = null)
        {
            AddOrUpdateLogs("error", message, details.StackTrace.ToString());
        }

        public void LogWarning(string message, string details = null)
        {
            AddOrUpdateLogs("warning", message, details);
        }

        public void LogDebug(string message, string details = null)
        {
            AddOrUpdateLogs("debug", message, details);
        }

        public void LogCritical(string message, string details = null)
        {
            AddOrUpdateLogs("critical", message, details);
        }

        public void LogTrace(string message, string details = null)
        {
            AddOrUpdateLogs("trace", message, details);
        }
    }

    #region Model defination
    class ApplicationLogs
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }

        [JsonProperty(PropertyName = "details")]
        public string Details { get; set; }

        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
    #endregion
}
