using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Webet333.security
{
   public class DESCryptoServices
    {
        public string DESEncrypt(string textToDecrypt, string key)
        {
            if (string.IsNullOrEmpty(textToDecrypt))
                return textToDecrypt;
            return DESEncryptText(textToDecrypt, key);
        }

        private string DESEncryptText(string inString, string key)
        {
            byte[] EncryptKey = ASCIIEncoding.ASCII.GetBytes(key);

            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, new DESCryptoServiceProvider().CreateEncryptor(EncryptKey, EncryptKey),
                CryptoStreamMode.Write);
            StreamWriter sw = new StreamWriter(cs);
            sw.Write(inString);
            sw.Flush();
            cs.FlushFinalBlock();
            sw.Flush();

            return Convert.ToBase64String(ms.GetBuffer(), 0, (int)ms.Length); ;
        }

    }
}
