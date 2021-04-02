using SendGrid;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gatherr.Email
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(List<string> emails, string subject, string message);
    }
}