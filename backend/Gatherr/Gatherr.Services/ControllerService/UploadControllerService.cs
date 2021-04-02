using Gatherr.Data.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Gatherr.Services.ControllerService
{
    public class UploadControllerService : IUploadControllerService
    {
        private readonly IBlobService _blobService;

        public UploadControllerService(IBlobService blobService)
        {
            _blobService = blobService;
        }

        public async Task<Uri> UploadFileBlobAsync(string blobContainerName, IFormFile file)
        {
            var result = await _blobService.UploadFileBlobAsync(blobContainerName, file.OpenReadStream(), file.ContentType, file.FileName);
            return result.Uri;
        }
    }
}
