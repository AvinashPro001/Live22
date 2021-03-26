namespace Webet333.api.Helpers
{
    public class SecurityHelpers
    {
        public static string EncryptText(string textToEncrypt)
        {
            return new security.AesAlgoridhm().Encrypt(textToEncrypt);
        }

        public static string DecryptText(string textToDecrypt)
        {
            return new security.AesAlgoridhm().Decrypt(textToDecrypt);
        }

        public static string EncryptPassword(string PasswordToEncrypt)
        {
            return new security.RC2CryptoService().Encrypt(PasswordToEncrypt);
        }

        public static string DecryptPassword(string passwordToDecrypt)
        {
            return new security.RC2CryptoService().Decrypt(passwordToDecrypt);
        }

        public static string MD5EncrptText(string textToEncrypt)
        {
            return new security.MD5Crypto().GetMD5Signature(textToEncrypt);
        }

        public static string DESEncrptText(string textToEncrypt, string key = null)
        {
            return new security.DESCryptoServices().DESEncrypt(textToEncrypt, key);
        }

        public static string TripleDESEncrptText(string rawData, string key)
        {
            return new security.TriplesDES().Encrypt(rawData, key, null);
        }

        public static string TripleDESDecryptText(string rawData, string key)
        {
            return new security.TriplesDES().Decrypt(rawData, key, null);
        }

        public static string AllBetMD5Base64(string rawData)
        {
            return new security.AllBetMD5Crypto().base64edMd5(rawData);
        }
    }
}