﻿
namespace Gatherr.Models.Dtos.Meetups
{
    public class MeetupsFilterDto
    {
        public string City { get; set; }
        public string Country { get; set; }
        public string Type { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; } = 10;
    }
}
