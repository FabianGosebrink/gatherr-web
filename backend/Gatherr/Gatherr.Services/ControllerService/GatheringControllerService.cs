using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Gatherings;
using Gatherr.Models.Entities;
using Gatherr.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Gatherr.Services.ControllerService
{
    public class GatheringControllerService : IGatheringControllerService
    {
        private readonly IGatheringRepository _gatheringRepository;
        private readonly IGroupsRepository _groupsRepository;
        private readonly IGatheringMemberRepository _meetupMemberRepository;
        private readonly IHateOasHelper _hateOasHelper;
        private readonly IMapper _mapper;

        public GatheringControllerService(
            IGatheringRepository gatheringRepository,
            IGroupsRepository groupsRepository,
            IHateOasHelper hateOasHelper,
            GatheringMemberRepository meetupMemberRepository,
            IMapper mapper)
        {
            _gatheringRepository = gatheringRepository;
            _groupsRepository = groupsRepository;
            _hateOasHelper = hateOasHelper;
            _meetupMemberRepository = meetupMemberRepository;
            _mapper = mapper;
        }

        public IGatheringControllerService WithController(string controllerName)
        {
            _hateOasHelper.Init(controllerName);
            return this;
        }

        public IObjectDescriptor<List<GatheringDto>> GetAllGatheringsFromGroup(string groupLinkName)
        {
            GroupEntity item = _groupsRepository.GetSingle(predicate: x => x.LinkName == groupLinkName,
               include: source => source
                    .Include(y => y.GroupCategories)
                    .Include(y => y.Gatherings)
               );

            if (item == null)
            {
                return null;
            }

            if (item.Gatherings.Any())
            {
                item.Gatherings = item.Gatherings.OrderBy(x => x.Date).ToList();
            }

            var meetupDtos = _mapper.Map<List<GatheringDto>>(item.Gatherings);

            return new ObjectDescriptor<List<GatheringDto>>()
            {
                Value = meetupDtos,
            };
        }

        public IObjectDescriptor<List<GatheringDto>> GetGatheringsInArea(GatheringsFilterDto meetupsFilterDto)
        {
            ParameterExpression argument = Expression.Parameter(typeof(GatheringEntity), "x");
            Expression cityProperty = Expression.Property(argument, "City");
            Expression titleProperty = Expression.Property(argument, "Title");
            Expression countryProperty = Expression.Property(argument, "Country");

            var countryvalue = Expression.Constant(meetupsFilterDto.Country);
            var countryEpression = Expression.Equal(countryProperty, countryvalue);
            var expression = countryEpression;

            if (!String.IsNullOrWhiteSpace(meetupsFilterDto.City))
            {
                var cityValue = Expression.Constant(meetupsFilterDto.City);
                var cityExpression = Expression.Equal(cityProperty, cityValue);
                expression = Expression.AndAlso(expression, cityExpression);
            }

            if (!String.IsNullOrWhiteSpace(meetupsFilterDto.Type) && meetupsFilterDto.Type != "*")
            {
                var titleValue = Expression.Constant(meetupsFilterDto.Type);
                var titleExpression = Expression.Equal(titleProperty, titleValue);
                expression = Expression.AndAlso(expression, titleExpression);
            }

            var dbFilter = Expression.Lambda<Func<GatheringEntity, bool>>(expression, argument);

            IQueryable<GatheringEntity> meetups = _gatheringRepository.GetAll(
                predicate: dbFilter,
               include: source => source.Include(y => y.Group));

            List<GatheringEntity> meetupsToReturn = meetups.Skip(meetupsFilterDto.Skip).Take(meetupsFilterDto.Take).ToList();

            var meetupDtos = _mapper.Map<List<GatheringDto>>(meetupsToReturn);

            return new ObjectDescriptor<List<GatheringDto>>()
            {
                Value = meetupDtos,
            };
        }

        public IObjectDescriptor<List<GatheringDto>> GetAllPersonalGatherings(string currentUserName)
        {
            List<GatheringMemberEntity> result = _meetupMemberRepository
                .GetAll(x => x.UserProfile.UserIdentifier == currentUserName, source => source.Include(x => x.Meetup).ThenInclude(x => x.Group)).ToList();

            var mappedDtos = _mapper.Map<List<GatheringDto>>(result.Select(x => x.Meetup));

            mappedDtos.ForEach(x => _hateOasHelper.AddLinks<GatheringDto>(x, x.Id));

            return new ObjectDescriptor<List<GatheringDto>>()
            {
                Value = mappedDtos,
            };
        }

        public IObjectDescriptor<GatheringDto> GetSingle(string groupLinkName, string meetupLinkName)
        {
            GroupEntity existingGroup = _groupsRepository.GetSingle(predicate: x => x.LinkName == groupLinkName);

            if (existingGroup == null)
            {
                return null;
            }

            GatheringEntity item = _gatheringRepository
                .GetSingle(x => x.LinkName == meetupLinkName,
                include: source => source
                    .Include(a => a.Group)
                    .Include(a => a.Attendees)
                    .ThenInclude(a => a.UserProfile)
                );

            if (item == null)
            {
                return null;
            }

            var itemDto = _mapper.Map<GatheringDto>(item);
            _hateOasHelper.AddLinks<GatheringDto>(itemDto, itemDto.Id);

            return new ObjectDescriptor<GatheringDto>()
            {
                Value = itemDto,
            };
        }

        public IObjectDescriptor<GatheringDto> Update(Guid id, GatheringUpdateDto updateDto)
        {
            GatheringEntity existingItem = _gatheringRepository.GetSingle(x => x.Id == id);

            if (existingItem == null)
            {
                return null;
            }

            _mapper.Map(updateDto, existingItem);

            _gatheringRepository.Update(existingItem);

            if (_gatheringRepository.Save() <= 0)
            {
                throw new Exception("Updating an item failed on save.");
            }

            var existingDto = _mapper.Map<GatheringDto>(existingItem);
            _hateOasHelper.AddLinks<GatheringDto>(existingDto, existingDto.Id);

            return new ObjectDescriptor<GatheringDto>()
            {
                Value = existingDto,
            };
        }

        public IObjectDescriptor<GatheringDto> AddGatheringToGroup(
            string existingGroupName, GatheringCreateDto createDto, string currentUserName)
        {
            GroupEntity existingGroup = _groupsRepository
                .GetSingle(
                predicate: b => b.LinkName == existingGroupName,
                include: x => x.Include(y => y.Gatherings)
                                .Include(y => y.GroupMembers)
                                .ThenInclude(y => y.UserProfile));

            if (existingGroup == null)
            {
                return null;
            }

            var meetupEntity = _mapper.Map<GatheringEntity>(createDto);
            meetupEntity.Created = DateTime.UtcNow;
            meetupEntity.Date = meetupEntity.Date.ToUniversalTime();
            meetupEntity.GroupId = existingGroup.Id;
            meetupEntity.LinkName = meetupEntity.Title.Replace(" ", "-").ToLowerInvariant();
            meetupEntity.LinkName = meetupEntity.LinkName + "-" + GetRandomString(5);
            meetupEntity.State = GatheringState.Ok;

            meetupEntity.Attendees = new List<GatheringMemberEntity>();
            GroupMemberEntity currentCreator = existingGroup.GroupMembers
                .FirstOrDefault(groupMember => groupMember.UserProfile.UserIdentifier == currentUserName);

            meetupEntity.Attendees.Add(new GatheringMemberEntity()
            {
                UserProfileId = currentCreator.UserProfileId,
                Role = GatheringRole.Organiser,
                Modified = DateTime.UtcNow
            });

            existingGroup.Gatherings.Add(meetupEntity);

            if (_gatheringRepository.Save() <= 0)
            {
                throw new Exception("Deleting an item failed on save.");
            }

            return new ObjectDescriptor<GatheringDto>()
            {
                Value = _mapper.Map<GatheringDto>(meetupEntity),
            };
        }

        public IObjectDescriptor<object> Remove(Guid id)
        {
            GatheringEntity existingItem = _gatheringRepository.GetSingle(x => x.Id == id);

            if (existingItem == null)
            {
                return null;
            }

            _gatheringRepository.Delete(x => x.Id == id);

            if (_gatheringRepository.Save() <= 0)
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
