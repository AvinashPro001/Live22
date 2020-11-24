using System;
using System.IO;
using Webet333.models.Configs;
using Webet333.models.Constants;

namespace Webet333.files.Files
{
    public class StoreToLocalFolder
    {
        private string storage_path = string.Empty;
        private string file_name = "", full_path = "";

        public StoreToLocalFolder(BaseUrlConfigs baseUrl)
        {
            storage_path = baseUrl.ImageLocalPath;
        }

        public string Upload(string file, string name, string folder)
        {
            if (!Directory.Exists($"{storage_path}//{folder}"))
                Directory.CreateDirectory($"{storage_path}//{folder}");

            var byte_image = Convert.FromBase64String(file);
            file_name = $"{name}{DefaultConsts.Image}";
            full_path = $"{storage_path}//{folder}/{file_name}";
            File.WriteAllBytes(full_path, byte_image);
            return DefaultConsts.Image;
        }

        public string UploadWithExtension(string file, string name, string folder, string type)
        {
            if (!Directory.Exists($"{storage_path}//{folder}"))
                Directory.CreateDirectory($"{storage_path}//{folder}");

            var byte_image = Convert.FromBase64String(file);
            file_name = $"{name}{type}";
            full_path = $"{storage_path}//{folder}/{file_name}";
            File.WriteAllBytes(full_path, byte_image);
            return type;
        }

        public void Delete(string name, string folder)
        {
            string[] supportedTypes = new[] { "jpg", "jpeg", "png", "bmp" };
            foreach (var type in supportedTypes)
            {
                file_name = $"{name}.{type}";
                full_path = $"{Path.Combine(storage_path, folder)}/{file_name}";
                if (File.Exists(full_path))
                    File.Delete(full_path);
            }
        }
    }
}