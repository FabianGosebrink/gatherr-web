using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Gatherr.Email
{
    public class EmailService : IEmailService
    {
        private string _apiKey;

        public EmailService(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async Task<bool> SendEmailAsync(List<string> emails, string subject, string message)
        {
            if (!emails.Any())
            {
                return true;
            }

            var client = new SendGridClient(_apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("noreply@gatherr.com", "Gatherr Team"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };

            foreach (var email in emails)
            {
                msg.AddTo(new EmailAddress(email));
            }

            var result = await client.SendEmailAsync(msg);

            return (result.StatusCode >= HttpStatusCode.OK && result.StatusCode < HttpStatusCode.MultipleChoices);
        }
    }
}
