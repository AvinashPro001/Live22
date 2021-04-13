using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Webet333.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

#if DEBUG
        public static string environmentName = "Debug";
#elif STAG
        public static string environmentName = "Stag";
#elif RELEASE
        public static string environmentName = "Production";
#endif

        public static IWebHost BuildWebHost(string[] args) =>
             WebHost.CreateDefaultBuilder(args)
                .UseEnvironment(environmentName)
                .UseStartup<Startup>()
                .CaptureStartupErrors(true)
                .UseSetting("detailedErrors", "true")
                .Build();
    }
}