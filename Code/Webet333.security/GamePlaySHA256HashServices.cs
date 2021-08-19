using System;
using System.Security.Cryptography;
using System.Text;

namespace Webet333.security
{
    public static class GamePlaySHA256HASHServices
    {
        private static string SHA_256 = "SHA-256";

        public static string SHA256(string input)
        {
            if (input == null) return null;

            return HASH(input, SHA_256);
        }

        private static String HASH(string input, string hashAlgorithm)
        {
            SHA256 sha256 = new SHA256CryptoServiceProvider();

            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] outputBytes = sha256.ComputeHash(inputBytes);
            string resultSha256B = BitConverter.ToString(outputBytes).Replace("-", "").ToLower();

            return resultSha256B;
        }
    }
}