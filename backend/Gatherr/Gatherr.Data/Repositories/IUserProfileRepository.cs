using Gatherr.Models.Entities;
using System;

namespace Gatherr.Data.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfileEntity Add(UserProfileEntity toAdd);
        UserProfileEntity GetSingle(Guid id);
        UserProfileEntity GetSingle(string userIdentifier);
        bool Save();
        UserProfileEntity Update(UserProfileEntity toUpdate);
    }
}