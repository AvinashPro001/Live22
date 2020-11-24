using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Webet333.security
{
    public class MD5Crypto
    {
        public string GetMD5Signature(string rawData)
        {
            var md5Content = string.Empty;

            using (MD5 md5Hash = MD5.Create())
            {
                md5Content = GetMd5Hash(md5Hash, rawData);
            }
            return md5Content;
        }

        private string GetMd5Hash(MD5 md5Hash, string rawData)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

            // Create a new Stringbuilder to collect the bytes and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}
