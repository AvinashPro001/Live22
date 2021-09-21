using System;
using System.Security.Cryptography;
using System.Text;

namespace Webet333.security
{
    public class GamePlayDESCryptoServices
    {
        private string key;

        public GamePlayDESCryptoServices()
        {
        }

        public GamePlayDESCryptoServices(string key)
        {
            this.key = key;
        }

        public string getKey()
        {
            return key;
        }

        public void setKey(string key)
        {
            this.key = key;
        }

        public string Encrypt(string input)
        {
            try
            {
                byte[] s = Encoding.UTF8.GetBytes(input);

                return (DESEncrypt(s));
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        private string DESEncrypt(byte[] value)
        {
            try
            {
                byte[] keyArray;
                byte[] toEncryptArray = value;

                // System.Configuration.AppSettingsReader settingsReader = new AppSettingsReader();

                keyArray = UTF8Encoding.UTF8.GetBytes(key);

                DESCryptoServiceProvider tdes = new DESCryptoServiceProvider();

                tdes.Key = keyArray;

                tdes.Mode = CipherMode.ECB;

                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateEncryptor();

                byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

                tdes.Clear();

                return Convert.ToBase64String(resultArray, 0, resultArray.Length);
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}