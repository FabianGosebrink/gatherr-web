using Gatherr.Data.Context;
using Gatherr.Models.Common;
using Gatherr.Models.Entities;
using Gatherr.Models.Extensions;
using Microsoft.EntityFrameworkCore;
using OfferingSolutions.GenericEFCore.RepositoryContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Gatherr.Data.Repositories
{
    public class GroupsRepository : GenericRepositoryContext<GroupEntity>, IGroupsRepository
    {
        public GroupsRepository(GatherrDbContext dbContext)
            : base(dbContext)
        {

        }

        public IQueryable<GroupEntity> GetAll(GroupsQueryParameters queryParameters)
        {
            int skip = queryParameters.PageCount * (queryParameters.Page - 1);
            int take = queryParameters.PageCount;

            List<Expression<Func<GroupEntity, bool>>> predicates = GetPredicates(queryParameters);

            if(predicates.Count() == 2)
            {
                Expression<Func<GroupEntity, bool>> catAndQuery = predicates[0].And(predicates[1]);
                return base.GetAll(catAndQuery, source => source.Include(x => x.GroupCategories).ThenInclude(x => x.Category), null, skip, take);
            }
            else
            {
                return base.GetAll(predicates.FirstOrDefault(), source => source.Include(x => x.GroupCategories).ThenInclude(x => x.Category), null, skip, take);
            }
        }

        public int Count(GroupsQueryParameters queryParameters)
        {
            List<Expression<Func<GroupEntity, bool>>> predicates = GetPredicates(queryParameters);
            if(!predicates.Any())
            {
                return base.Count();
            }

            if (predicates.Count() == 2)
            {
                Expression<Func<GroupEntity, bool>> catAndQuery = predicates[0].And(predicates[1]);
                return base.Count(catAndQuery);
            }

            else
            {
                return base.Count(predicates.FirstOrDefault());
            }
        }

        private List<Expression<Func<GroupEntity, bool>>> GetPredicates(GroupsQueryParameters queryParameters)
        {
            List<Expression<Func<GroupEntity, bool>>> predicates = new List<Expression<Func<GroupEntity, bool>>>();

            if (queryParameters.HasCategoryQuery())
            {
                var allCategories = queryParameters.GetCategories();
                Expression<Func<GroupEntity, bool>> predicate = x => x.GroupCategories.Select(e => e.Category.Name).Any(y => allCategories.Contains(y));
                predicates.Add(predicate);
            }

            if (queryParameters.HasQueryString())
            {
                Expression<Func<GroupEntity, bool>> predicate = y => y.Name.ToUpper().Contains(queryParameters.Query.ToUpper());
                predicates.Add(predicate);
            }

            return predicates;
        }
    }
}
