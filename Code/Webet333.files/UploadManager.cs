using Microsoft.Extensions.Options;
using Webet333.files.interfaces;
using Webet333.models.Configs;

namespace Webet333.files
{
    public class UploadManager : IUploadManager
    {
        private BaseUrlConfigs BaseUrl { get; set; }

        public UploadManager(IOptions<BaseUrlConfigs> BaseUrlConfigs)
        {
            this.BaseUrl = BaseUrlConfigs.Value;
        }

        public void Delete(string name, string type)
        {
            new Files.StoreToLocalFolder(BaseUrl).Delete(name, type);
        }

        public string Store(string file, string name, string type)
        {
            return new Files.StoreToLocalFolder(BaseUrl).Upload(file, name, type);
        }

        public string StoreWithExtension(string file, string name, string folder, string type)
        {
            return new Files.StoreToLocalFolder(BaseUrl).UploadWithExtension(file, name, folder, type);
        }
    }
}