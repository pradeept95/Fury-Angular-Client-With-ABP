using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System; 
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SunriseBank.Application.Common.EncryptionDecryptionService
{
    public class EncryptionDecryptionService : IEncryptionDecryptionService
    {
        private readonly IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;

        public EncryptionDecryptionService(IHostingEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            _configuration = configuration;
        }

        public async Task<string> EncryptString(string stringToEncrypt)
        {
            var keyString = _configuration["EncDec:Key"];
            var key = Encoding.UTF8.GetBytes(keyString);

            using (var aesAlg = Aes.Create())
            {
                using (var encryptor = aesAlg.CreateEncryptor(key, aesAlg.IV))
                {
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(stringToEncrypt);
                        }

                        var iv = aesAlg.IV;

                        var decryptedContent = msEncrypt.ToArray();

                        var result = new byte[iv.Length + decryptedContent.Length];

                        Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                        Buffer.BlockCopy(decryptedContent, 0, result, iv.Length, decryptedContent.Length);

                        return Convert.ToBase64String(result);
                    }
                }
            }

            //byte[] inputByteArray = Encoding.UTF8.GetBytes(stringToEncrypt);
            //byte[] rgbIV = { 0x21, 0x43, 0x56, 0x87, 0x10, 0xfd, 0xea, 0x1c };
            //byte[] key = { };
            //try
            //{
            //    key = System.Text.Encoding.UTF8.GetBytes("A0D1nX0Q");
            //    DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            //    MemoryStream ms = new MemoryStream();
            //    CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(key, rgbIV), CryptoStreamMode.Write);
            //    cs.Write(inputByteArray, 0, inputByteArray.Length);
            //    cs.FlushFinalBlock();
            //    return Convert.ToBase64String(ms.ToArray());
            //}
            //catch (Exception e)
            //{
            //    return e.Message;
            //}
        }

        public async Task<string> DecryptString(string cipherText)
        {
            var keyString = _configuration["EncDec:Key"];
            var ct = cipherText.Replace(" ", "+").Replace('-', '+');
            var nct = ct.Replace('_', '/');

            var fullCipher = Convert.FromBase64String(nct);
            var iv = new byte[16];

            var indexValue = (fullCipher.Length - iv.Length) < 16 ? 16 : (fullCipher.Length - iv.Length);

            var cipher = new byte[fullCipher.Length - iv.Length];

            Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
            // Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, cipher.Length);
            Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, fullCipher.Length - iv.Length);
            var key = Encoding.UTF8.GetBytes(keyString);

            using (var aesAlg = Aes.Create())
            {
                using (var decryptor = aesAlg.CreateDecryptor(key, iv))
                {
                    string result;
                    using (var msDecrypt = new MemoryStream(cipher))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                result = srDecrypt.ReadToEnd();
                            }
                        }
                    }

                    return result;
                }
            }

            //byte[] inputByteArray = new byte[EncryptedText.Length + 1];
            //byte[] rgbIV = { 0x21, 0x43, 0x56, 0x87, 0x10, 0xfd, 0xea, 0x1c };
            //byte[] key = { };

            //try
            //{

            //    key = System.Text.Encoding.UTF8.GetBytes("A0D1nX0Q");
            //    DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            //    inputByteArray = Convert.FromBase64String(EncryptedText);
            //    MemoryStream ms = new MemoryStream();
            //    CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(key, rgbIV), CryptoStreamMode.Write);
            //    cs.Write(inputByteArray, 0, inputByteArray.Length);
            //    cs.FlushFinalBlock();
            //    System.Text.Encoding encoding = System.Text.Encoding.UTF8;
            //    return encoding.GetString(ms.ToArray());
            //}
            //catch (Exception e)
            //{
            //    return e.Message;
            //}
        }

    }
}
