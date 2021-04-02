
using System;

namespace Gatherr.Models.Dtos.Contact
{
    public class ContactGatheringDto
    {
        public Guid GatheringId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
