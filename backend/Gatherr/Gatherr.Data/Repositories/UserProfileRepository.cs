using Gatherr.Data.Context;
using Gatherr.Models.Entities;
using System;
using System.Linq;

namespace Gatherr.Data.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly GatherrDbContext _context;

        public UserProfileRepository(GatherrDbContext context)
        {
            _context = context;
        }

        public UserProfileEntity GetSingle(Guid id)
        {
            return _context.UserProfiles.FirstOrDefault(x => x.Id == id);
        }

        public UserProfileEntity GetSingle(string userIdentifier)
        {
            return _context.UserProfiles.FirstOrDefault(x => x.UserIdentifier == userIdentifier);
        }

        public UserProfileEntity Update(UserProfileEntity toUpdate)
        {
            _context.UserProfiles.Update(toUpdate);
            return toUpdate;
        }

        public UserProfileEntity Add(UserProfileEntity toAdd)
        {
            _context.UserProfiles.Add(toAdd);
            return toAdd;
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}