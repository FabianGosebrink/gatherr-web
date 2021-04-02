using System;
using System.Collections.Generic;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos;

namespace Gatherr.Services.Helpers
{
    public interface IHateOasHelper
    {
        List<LinkDto> CreateLinksForCollection(GroupsQueryParameters queryParameters, int totalCount);
        void AddLinks<TDto>(DtoBase filledDto, Guid id);
        IEnumerable<LinkDto> GetLinks(string id);
        void Init(string controllerName);
    }
}