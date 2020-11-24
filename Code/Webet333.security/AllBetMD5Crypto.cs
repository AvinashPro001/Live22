using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Webet333.security
{
    public class AllBetMD5Crypto
    {
        public string base64edMd5(string data)
        {
            return Convert.ToBase64String(md5(Encoding.UTF8.GetBytes(data)));
        }
        public static byte[] md5(byte[] data)
        {
            MD5CryptoServiceProvider md5Crp = new MD5CryptoServiceProvider();
            return md5Crp.ComputeHash(data);
        }
    }
}
