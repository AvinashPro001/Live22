using System.ServiceProcess;

namespace Webet333.WindowsService
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new RegisterService()
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}