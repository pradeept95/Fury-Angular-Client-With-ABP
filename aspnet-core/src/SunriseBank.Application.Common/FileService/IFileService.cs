using Microsoft.AspNetCore.Http; 

namespace SunriseBank.Application.Common.FileService
{
    public interface IFileService
    {
        string Save(IFormFile file);
        string Save(string dirPath, IFormFile file);  
        void Delete(string dirPath, string filePath);
        string getRelativePath(string dirPath, string filePath);
    }
}
