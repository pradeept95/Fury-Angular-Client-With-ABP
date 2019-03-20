using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System; 
using System.IO; 

namespace SunriseBank.Application.Common.FileService
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;

        public FileService(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        public void CopyStream(Stream stream, string destPath)
        {
            using (var fileStream = new FileStream(destPath, FileMode.Create, FileAccess.Write))
            {
                stream.CopyTo(fileStream);
            }
        }

        public string Save(IFormFile file)
        {
            IFormFile myFile = file;
            string rootpath = _environment.WebRootPath;
            string folderPath = Path.Combine(rootpath, "Uploads");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);
            var tempFolderName = Path.GetTempFileName();
            string physicalfilepath = folderPath + "\\" + myFile.FileName;
            var relativePath = Path.Combine("Uploads", myFile.FileName);
            relativePath = relativePath.Replace("\\", "/").Replace(@"\", "/");
            if (!relativePath.StartsWith("/"))
            {
                relativePath = "/" + relativePath;
            }
            if (myFile != null && myFile.Length != 0)
            {

                try
                {
                    CopyStream(myFile.OpenReadStream(), physicalfilepath);
                    return relativePath;


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                //}
            }
            return "";
        }

        public string CheckOrCreateDirectory(string path)
        {
            string rootpath = _environment.WebRootPath;
            string folderPath = Path.Combine(rootpath, path);
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);
            return folderPath;
        }

        public string Save(string dirPath, IFormFile file)
        {
            string physicallPath = CheckOrCreateDirectory(dirPath);
            IFormFile myFile = file;

            string physicalfilepath = physicallPath + "\\" + myFile.FileName;
            var relativePath = Path.Combine(dirPath, myFile.FileName);
            relativePath = relativePath.Replace("\\", "/").Replace(@"\", "/");
            if (!relativePath.StartsWith("/"))
            {
                relativePath = "/" + relativePath;
            }
            if (myFile != null && myFile.Length != 0)
            {

                try
                {
                    CopyStream(myFile.OpenReadStream(), physicalfilepath);
                    return relativePath;


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                //}
            }
            return "";
        }

        public void Delete(string dirPath, string filePath)
        {
            if(filePath == null)
            {
                return;
            }
            string rootpath = dirPath == string.Empty ? _environment.WebRootPath: dirPath;
            string physicallPath = CheckOrCreateDirectory(rootpath);
            //var path = Path.Combine(physicallPath, filePath.Replace('/','\\'));
            var path = physicallPath + filePath.Replace('/', '\\');
            if (File.Exists(path))
                File.Delete(path);
        }

        public string getRelativePath(string dirPath, string filePath)
        {
            if (filePath == null)
            {
                return string.Empty;
            }
            string rootpath = dirPath == string.Empty ? _environment.WebRootPath : dirPath;
            string physicallPath = CheckOrCreateDirectory(rootpath);
            //var path = Path.Combine(physicallPath, filePath.Replace('/','\\'));
            var path = physicallPath + filePath.Replace('/', '\\');
            if (File.Exists(path))
                return path;
            return string.Empty;
        }
    }
}
