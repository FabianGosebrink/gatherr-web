using System;

namespace Gatherr.Models.Dtos.UserProfile
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string UserIdentifier { get; set; }
        public string Username { get; set; }
        public string AboutMe { get; set; }
        public string ImageUrl { get; set; }
    }
}
