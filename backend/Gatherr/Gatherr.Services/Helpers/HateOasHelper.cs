using Gatherr.Models.Common;
using Gatherr.Models.Dtos;
using Gatherr.Models.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Gatherr.Services.Helpers
{
    public class HateOasHelper : IHateOasHelper
    {
        private string _controllerName;
        private readonly IUrlHelper _urlHelper;

        public HateOasHelper(IUrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
        }

        public void Init(string controllerName)
        {
            _controllerName = controllerName;
        }

        public List<LinkDto> CreateLinksForCollection(GroupsQueryParameters queryParameters, int totalCount)
        {
            var links = new List<LinkDto>();

            // self 
            links.Add(new LinkDto(_urlHelper.Link($"GetAll{_controllerName}s", new
            {
                pagecount = queryParameters.PageCount,
                page = queryParameters.Page,
            }), "self", "GET"));

            links.Add(new LinkDto(_urlHelper.Link($"GetAll{_controllerName}s", new
            {
                pagecount = queryParameters.PageCount,
                page = 1,
            }), "first", "GET"));

            links.Add(new LinkDto(_urlHelper.Link($"GetAll{_controllerName}s", new
            {
                pagecount = queryParameters.PageCount,
                page = queryParameters.GetTotalPages(totalCount),
            }), "last", "GET"));

            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkDto(_urlHelper.Link($"GetAll{_controllerName}s", new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page + 1,
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkDto(_urlHelper.Link($"GetAll{_controllerName}s", new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page - 1,
                }), "previous", "GET"));
            }

            links.Add(
               new LinkDto(_urlHelper.Link($"Add{_controllerName}", null),
               "create",
               "POST"));

            return links;
        }

        public void AddLinks<TDto>(DtoBase filledDto, Guid id)
        {
            filledDto.Links = GetLinks(id.ToString());
        }

        public IEnumerable<LinkDto> GetLinks(string id)
        {
            var links = new List<LinkDto>();

            links.Add(
              new LinkDto(_urlHelper.Link($"GetSingle{_controllerName}", new { id = id }),
              "self",
              "GET"));

            links.Add(
              new LinkDto(_urlHelper.Link($"Remove{_controllerName}", new { id = id }),
              "delete",
              "DELETE"));

            links.Add(
              new LinkDto(_urlHelper.Link($"Add{_controllerName}", null),
              "create",
              "POST"));

            links.Add(
               new LinkDto(_urlHelper.Link($"Update{_controllerName}", new { id = id }),
               "update",
               "PUT"));

            return links;
        }
    }
}
