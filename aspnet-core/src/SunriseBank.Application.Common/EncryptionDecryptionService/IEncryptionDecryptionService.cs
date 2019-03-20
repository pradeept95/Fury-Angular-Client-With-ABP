using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace SunriseBank.Application.Common.EncryptionDecryptionService
{
    public interface IEncryptionDecryptionService
    {
        Task<string> EncryptString(string text);
        Task<string> DecryptString(string cipherText);
    }
}
