using System;

namespace Gatherr.Models.Dtos.UserProfile
{
    public class UserProfileUpdateDto
    {
        public Guid Id { get; set; }
        public string AboutMe { get; set; }
        public string Username { get; set; }
        public string ImageUrl { get; set; }
    }
}
