using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos.Groups;
using Gatherr.Models.Entities;
using Gatherr.Models.Extensions;
using Gatherr.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gatherr.Services.ControllerService
{
    public class GroupsControllerService : IGroupsControllerService
    {
        private readonly IGroupsRepository _repository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IGroupMemberRepository _groupMemberRepository;
        private readonly IHateOasHelper _hateOasHelper;
        private readonly IMapper _mapper;

        public GroupsControllerService(
            IGroupsRepository repository,
            IHateOasHelper hateOasHelper,
            IMapper mapper,
            ICategoryRepository categoryRepository,
            IGroupMemberRepository groupMemberRepository,
            IUserProfileRepository userProfileRepository)
        {

            _repository = repository;
            _hateOasHelper = hateOasHelper;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _groupMemberRepository = groupMemberRepository;
            _userProfileRepository = userProfileRepository;
        }

        public IGroupsControllerService WithController(string controllerName)
        {
            _hateOasHelper.Init(controllerName);
            return this;
        }

        public IObjectDescriptor<List<GroupDto>> GetAll(GroupsQueryParameters queryParameters)
        {
            List<GroupEntity> items = _repository.GetAll(queryParameters).ToList();

            int allItemCount = _repository.Count(queryParameters);

            var paginationMetadata = new
            {
                totalCount = allItemCount,
                pageSize = queryParameters.PageCount,
                currentPage = queryParameters.Page,
                totalPages = queryParameters.GetTotalPages(allItemCount)
            };

            var links = _hateOasHelper.CreateLinksForCollection(queryParameters, allItemCount);

            var mappedDtos = _mapper.Map<List<GroupDto>>(items);

            mappedDtos.ForEach(x => _hateOasHelper.AddLinks<GroupDto>(x, x.Id));

            return new ObjectDescriptor<List<GroupDto>>()
            {
                Value = mappedDtos,
                Links = links,
                Metadata = paginationMetadata
            };
        }


        public IObjectDescriptor<List<GroupDto>> GetAllPersonalGroups(string currentUserName, GroupsQueryParameters queryParameters)
        {
            List<GroupMemberEntity> result = _groupMemberRepository.GetAll(x => x.UserProfile.UserIdentifier == currentUserName, source => source.Include(x => x.Group)).ToList();

            int allItemCount = result.Count;

            var paginationMetadata = new
            {
                totalCount = allItemCount,
                pageSize = queryParameters.PageCount,
                currentPage = queryParameters.Page,
                totalPages = queryParameters.GetTotalPages(allItemCount)
            };

            var mappedDtos = _mapper.Map<List<GroupDto>>(result.Select(x => x.Group));

            mappedDtos.ForEach(x => _hateOasHelper.AddLinks<GroupDto>(x, x.Id));

            return new ObjectDescriptor<List<GroupDto>>()
            {
                Value = mappedDtos,
                Metadata = paginationMetadata
            };
        }

        public IObjectDescriptor<GroupDto> GetGroupPerLinkName(string linkName)
        {
            GroupEntity item = _repository
                .GetSingle(predicate: x => x.LinkName == linkName,
                    include: x => x.Include(y => y.GroupCategories)
                                    .ThenInclude(y => y.Category));

            if (item == null)
            {
                return null;
            }

            var itemDto = _mapper.Map<GroupDto>(item);
            _hateOasHelper.AddLinks<GroupDto>(itemDto, itemDto.Id);

            return new ObjectDescriptor<GroupDto>()
            {
                Value = itemDto,
            };
        }

        public IObjectDescriptor<GroupDto> Add(GroupCreateDto createDto, string username)
        {
            var toAdd = _mapper.Map<GroupEntity>(createDto);

            toAdd.Created = DateTime.UtcNow;
            toAdd.LinkName = toAdd.Name.Replace(" ", "-").ToLowerInvariant();
            toAdd.LinkName = toAdd.LinkName + "-" + GetRandomString(5);

            var userProfile = _userProfileRepository.GetSingle(username);

            if (userProfile == null)
            {
                return null;
            }

            toAdd.GroupMembers = new List<GroupMemberEntity>();
            toAdd.GroupMembers.Add(new GroupMemberEntity() { UserProfileId = userProfile.Id, Role = GroupRole.Admin });

            toAdd.GroupCategories = new List<GroupCategoryEntity>();
            List<CategoryEntity> allCategories = _categoryRepository.GetAllCategories().ToList();
            IEnumerable<CategoryEntity> includedCategories =
                allCategories.Join(createDto.CategoryIds, up => up.Id, id => id, (up, id) => up);

            foreach (CategoryEntity categoryEntity in includedCategories)
            {
                toAdd.GroupCategories.Add(new GroupCategoryEntity()
                {
                    CategoryId = categoryEntity.Id
                });
            }

            _repository.Add(toAdd);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Creating an item failed on save.");
            }

            var newItemDto = _mapper.Map<GroupDto>(toAdd);
            _hateOasHelper.AddLinks<GroupDto>(newItemDto, newItemDto.Id);

            return new ObjectDescriptor<GroupDto>()
            {
                Value = newItemDto,
            };
        }

        public IObjectDescriptor<GroupDto> Update(Guid groupId, GroupUpdateDto updateDto)
        {
            GroupEntity existingItem = _repository.GetSingle(x => x.Id == groupId,
                 include: source => source
                  .Include(y => y.GroupCategories).ThenInclude(y => y.Category));

            if (existingItem == null)
            {
                return null;
            }

            if (String.IsNullOrEmpty(updateDto.ImageUrl))
            {
                updateDto.ImageUrl = existingItem.ImageUrl;
            }

            _mapper.Map(updateDto, existingItem);

            var allCategories = _categoryRepository.GetAllCategories().ToList();
            var includedCategories = allCategories.Join(updateDto.CategoryIds, up => up.Id, id => id, (up, id) => up); //.Where(t => createDto.CategoryIds.Contains(t.Id));
            existingItem.GroupCategories.Clear();

            foreach (CategoryEntity categoryEntity in includedCategories)
            {
                existingItem.GroupCategories.Add(new GroupCategoryEntity()
                {
                    CategoryId = categoryEntity.Id
                });
            }

            _repository.Update(existingItem);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Updating an item failed on save.");
            }

            var existingDto = _mapper.Map<GroupDto>(existingItem);
            _hateOasHelper.AddLinks<GroupDto>(existingDto, existingDto.Id);

            return new ObjectDescriptor<GroupDto>()
            {
                Value = existingDto,
            };
        }

        public IObjectDescriptor<object> Remove(Guid id)
        {
            GroupEntity existingItem = _repository.GetSingle(x => x.Id == id);

            if (existingItem == null)
            {
                return null;
            }

            _repository.Delete(x => x.Id == id);

            if (_repository.Save() <= 0)
            {
                throw new Exception("Deleting an item failed on save.");
            }

            return new ObjectDescriptor<object>()
            {
                Value = null,
            };
        }

        private string GetRandomString(int length)
        {
            var chars = "abcdefghijklmnopqrstuvwxyz";
            var stringChars = new char[length];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new String(stringChars);
        }
    }
}
