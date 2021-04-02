
using System;

namespace Gatherr.Models.Dtos.Contact
{
    public class ContactGroupDto
    {
        public Guid GroupId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
