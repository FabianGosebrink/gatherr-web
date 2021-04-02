using Gatherr.Models.Common;
using Gatherr.Models.Entities;
using OfferingSolutions.GenericEFCore.RepositoryContext;
using System.Linq;

namespace Gatherr.Data.Repositories
{
    public interface IGroupsRepository : IGenericRepositoryContext<GroupEntity>
    {
        IQueryable<GroupEntity> GetAll(GroupsQueryParameters queryParameters);
        int Count(GroupsQueryParameters queryParameters);
    }
}