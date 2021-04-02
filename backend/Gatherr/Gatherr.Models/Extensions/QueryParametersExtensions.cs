using System;
using Gatherr.Models.Common;

namespace Gatherr.Models.Extensions
{
    public static class QueryParametersExtensions
    {
        public static bool HasPrevious(this GroupsQueryParameters queryParameters)
        {
            return (queryParameters.Page > 1);
        }

        public static bool HasNext(this GroupsQueryParameters queryParameters, int totalCount)
        {
            return (queryParameters.Page < (int)GetTotalPages(queryParameters, totalCount));
        }

        public static double GetTotalPages(this GroupsQueryParameters queryParameters, int totalCount)
        {
            return Math.Ceiling(totalCount / (double)queryParameters.PageCount);
        }

        public static bool HasCategoryQuery(this GroupsQueryParameters queryParameters)
        {
            return !String.IsNullOrEmpty(queryParameters.Categories);
        }

        public static bool HasQueryString(this GroupsQueryParameters queryParameters)
        {
            return !String.IsNullOrEmpty(queryParameters.Query);
        }

        public static bool HasAnyFilter(this GroupsQueryParameters queryParameters)
        {
            return HasQueryString(queryParameters) || HasCategoryQuery(queryParameters);
        }

        public static string[] GetCategories(this GroupsQueryParameters queryParameters)
        {
            return queryParameters.Categories.Split('+');
        }

        //public static bool IsDescending(this GroupsQueryParameters queryParameters)
        //{
        //    if (!String.IsNullOrEmpty(queryParameters.OrderBy))
        //    {
        //        return queryParameters.OrderBy.Split(' ').Last().ToLowerInvariant().StartsWith("desc");
        //    }
        //    return false;
        //}
    }
}