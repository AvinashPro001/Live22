using System;

namespace Webet333.logs.interfaces
{
    public interface ILogManager
    {
        void LogInfo(string message, string details = null);

        void LogError(string message, Exception details = null);

        void LogWarning(string message, string details = null);

        void LogDebug(string message, string details = null);

        void LogCritical(string message, string details = null);

        void LogTrace(string message, string details = null);
    }
}