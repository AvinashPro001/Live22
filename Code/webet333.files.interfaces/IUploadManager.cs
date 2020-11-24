namespace Webet333.files.interfaces
{
    public interface IUploadManager
    {
        string Store(string file, string name, string type);

        string StoreWithExtension(string file, string name,string folder, string type);

        void Delete(string name, string type);
    }
}