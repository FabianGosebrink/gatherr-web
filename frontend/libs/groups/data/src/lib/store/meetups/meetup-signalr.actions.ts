import { createAction, props } from '@ngrx/store';
import { Meetup, MeetupMember, ModelDescriptor } from '@workspace/shared/data';

const meetupMemberPrefix = `[MeetupMembers SignalR]`;
const meetupsPrefix = `[Meetup SignalR]`;
export const signalrMeetupMemberAdded = createAction(
  `${meetupMemberPrefix} MeetupMember Added`,
  props<{ payload: ModelDescriptor<MeetupMember> }>()
);

export const signalrMeetupMemberRemoved = createAction(
  `${meetupMemberPrefix} MeetupMember removed`,
  props<{ payload: ModelDescriptor<MeetupMember> }>()
);

export const signalrMeetupAdded = createAction(
  `${meetupsPrefix} Meetup Added`,
  props<{ meetup: ModelDescriptor<Meetup> }>()
);

export const signalrMeetupRemoved = createAction(
  `${meetupsPrefix} Meetup removed`,
  props<{ payload: string }>()
);
