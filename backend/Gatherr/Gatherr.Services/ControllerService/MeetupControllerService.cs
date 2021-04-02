using AutoMapper;
using Gatherr.Data.Repositories;
using Gatherr.Models.Common;
using Gatherr.Models.Dtos;
using Gatherr.Models.Dtos.Meetups;
using Gatherr.Models.Entities;
using Gatherr.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Gatherr.Services.ControllerService
{
    public class MeetupControllerService : IMeetupControllerService
    {
        private readonly IMeetupRepository _meetupRepository;
        private readonly IGroupsRepository _groupsRepository;
        private readonly IMeetupMemberRepository _meetupMemberRepository;
        private readonly IHateOasHelper _hateOasHelper;
        private readonly IMapper _mapper;

        public MeetupControllerService(
            IMeetupRepository meetupRepository,
            IGroupsRepository groupsRepository,
            IHateOasHelper hateOasHelper,
            IMeetupMemberRepository meetupMemberRepository,
            IMapper mapper)
        {
            _meetupRepository = meetupRepository;
            _groupsRepository = groupsRepository;
            _hateOasHelper = hateOasHelper;
            _meetupMemberRepository = meetupMemberRepository;
            _mapper = mapper;
        }

        public IMeetupControllerService WithController(string controllerName)
        {
            _hateOasHelper.Init(controllerName);
            return this;
        }

        public IObjectDescriptor<List<MeetupDto>> GetAllMeetupsFromGroup(string groupLinkName)
        {
            GroupEntity item = _groupsRepository.GetSingle(predicate: x => x.LinkName == groupLinkName,
               include: source => source
                    .Include(y => y.GroupCategories)
                    .Include(y => y.Meetups)
               );

            if (item == null)
            {
                return null;
            }

            if (item.Meetups.Any())
            {
                item.Meetups = item.Meetups.OrderBy(x => x.Date).ToList();
            }

            var meetupDtos = _mapper.Map<List<MeetupDto>>(item.Meetups);

            return new ObjectDescriptor<List<MeetupDto>>()
            {
                Value = meetupDtos,
            };
        }

        public IObjectDescriptor<List<MeetupDto>> GetMeetupsInArea(MeetupsFilterDto meetupsFilterDto)
        {
            ParameterExpression argument = Expression.Parameter(typeof(MeetupEntity), "x");
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

            var dbFilter = Expression.Lambda<Func<MeetupEntity, bool>>(expression, argument);

            IQueryable<MeetupEntity> meetups = _meetupRepository.GetAll(
                predicate: dbFilter,
               include: source => source.Include(y => y.Group));

            List<MeetupEntity> meetupsToReturn = meetups.Skip(meetupsFilterDto.Skip).Take(meetupsFilterDto.Take).ToList();

            var meetupDtos = _mapper.Map<List<MeetupDto>>(meetupsToReturn);

            return new ObjectDescriptor<List<MeetupDto>>()
            {
                Value = meetupDtos,
            };
        }

        public IObjectDescriptor<List<MeetupDto>> GetAllPersonalMeetups(string currentUserName)
        {
            List<MeetupMemberEntity> result = _meetupMemberRepository
                .GetAll(x => x.UserProfile.UserIdentifier == currentUserName, source => source.Include(x => x.Meetup).ThenInclude(x => x.Group)).ToList();

            var mappedDtos = _mapper.Map<List<MeetupDto>>(result.Select(x => x.Meetup));

            mappedDtos.ForEach(x => _hateOasHelper.AddLinks<MeetupDto>(x, x.Id));

            return new ObjectDescriptor<List<MeetupDto>>()
            {
                Value = mappedDtos,
            };
        }

        public IObjectDescriptor<MeetupDto> GetSingle(string groupLinkName, string meetupLinkName)
        {
            GroupEntity existingGroup = _groupsRepository.GetSingle(predicate: x => x.LinkName == groupLinkName);

            if (existingGroup == null)
            {
                return null;
            }

            MeetupEntity item = _meetupRepository
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

            var itemDto = _mapper.Map<MeetupDto>(item);
            _hateOasHelper.AddLinks<MeetupDto>(itemDto, itemDto.Id);

            return new ObjectDescriptor<MeetupDto>()
            {
                Value = itemDto,
            };
        }

        public IObjectDescriptor<MeetupDto> Update(Guid id, MeetupUpdateDto updateDto)
        {
            MeetupEntity existingItem = _meetupRepository.GetSingle(x => x.Id == id);

            if (existingItem == null)
            {
                return null;
            }

            _mapper.Map(updateDto, existingItem);

            _meetupRepository.Update(existingItem);

            if (_meetupRepository.Save() <= 0)
            {
                throw new Exception("Updating an item failed on save.");
            }

            var existingDto = _mapper.Map<MeetupDto>(existingItem);
            _hateOasHelper.AddLinks<MeetupDto>(existingDto, existingDto.Id);

            return new ObjectDescriptor<MeetupDto>()
            {
                Value = existingDto,
            };
        }

        public IObjectDescriptor<MeetupDto> AddMeetupToGroup(
            string existingGroupName, MeetupCreateDto createDto, string currentUserName)
        {
            GroupEntity existingGroup = _groupsRepository
                .GetSingle(
                predicate: b => b.LinkName == existingGroupName,
                include: x => x.Include(y => y.Meetups)
                                .Include(y => y.GroupMembers)
                                .ThenInclude(y => y.UserProfile));

            if (existingGroup == null)
            {
                return null;
            }

            var meetupEntity = _mapper.Map<MeetupEntity>(createDto);
            meetupEntity.Created = DateTime.UtcNow;
            meetupEntity.Date = meetupEntity.Date.ToUniversalTime();
            meetupEntity.GroupId = existingGroup.Id;
            meetupEntity.LinkName = meetupEntity.Title.Replace(" ", "-").ToLowerInvariant();
            meetupEntity.LinkName = meetupEntity.LinkName + "-" + GetRandomString(5);
            meetupEntity.State = MeetupState.Ok;

            meetupEntity.Attendees = new List<MeetupMemberEntity>();
            GroupMemberEntity currentCreator = existingGroup.GroupMembers
                .FirstOrDefault(groupMember => groupMember.UserProfile.UserIdentifier == currentUserName);

            meetupEntity.Attendees.Add(new MeetupMemberEntity()
            {
                UserProfileId = currentCreator.UserProfileId,
                Role = MeetupRole.Organiser,
                Modified = DateTime.UtcNow
            });

            existingGroup.Meetups.Add(meetupEntity);

            if (_meetupRepository.Save() <= 0)
            {
                throw new Exception("Deleting an item failed on save.");
            }

            return new ObjectDescriptor<MeetupDto>()
            {
                Value = _mapper.Map<MeetupDto>(meetupEntity),
            };
        }

        public IObjectDescriptor<object> Remove(Guid id)
        {
            MeetupEntity existingItem = _meetupRepository.GetSingle(x => x.Id == id);

            if (existingItem == null)
            {
                return null;
            }

            _meetupRepository.Delete(x => x.Id == id);

            if (_meetupRepository.Save() <= 0)
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
