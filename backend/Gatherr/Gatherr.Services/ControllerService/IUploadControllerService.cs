using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Gatherr.Services.ControllerService
{
    public interface IUploadControllerService
    {
        Task<Uri> UploadFileBlobAsync(string blobContainerName, IFormFile file);
    }
}