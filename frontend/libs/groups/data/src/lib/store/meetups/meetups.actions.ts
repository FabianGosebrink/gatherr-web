import { createAction, props } from '@ngrx/store';
import {
  ContactGathering,
  Meetup,
  MeetupCreate,
  MeetupMember,
  MeetupUpdate,
  ModelDescriptor,
} from '@workspace/shared/data';

export const getAllMeetupsFromGroup = createAction(
  '[Meetups] getAllMeetupsFromGroup'
);
export const getAllMeetupsFromGroupSuccess = createAction(
  '[Meetups] getAllMeetupsFromGroupSuccess',
  props<{ payload: ModelDescriptor<Meetup[]> }>()
);

export const addMeetupToCurrentGroup = createAction(
  '[Meetups] addMeetupToCurrentGroup',
  props<{ meetup: MeetupCreate; formData: FormData }>()
);

export const addMeetup = createAction(
  '[Meetups] addMeetup',
  props<{ groupLinkName: string; meetup: MeetupCreate }>()
);
export const addMeetupToCurrentGroupSuccess = createAction(
  '[Meetups] addMeetupToCurrentGroupSuccess',
  props<{ groupLinkName: string; meetup: ModelDescriptor<Meetup> }>()
);

export const getSingleMeetup = createAction('[Meetups] getSingleMeetup');
export const getSingleMeetupSuccess = createAction(
  '[Meetups] getSingleMeetupSuccess',
  props<{ payload: ModelDescriptor<Meetup> }>()
);
export const getMeetupsAddress = createAction('[Meetups] getMeetupsAdress');
export const getMeetupsAddressSuccess = createAction(
  '[Meetups] getMeetupsAdressSuccess',
  props<{ address: string }>()
);
export const getAttendeesFromCurrentMeetup = createAction(
  '[Meetups] getAttendeesFromCurrentMeetup',
  props<{ payload: ModelDescriptor<Meetup> }>()
);
export const getAttendeesFromCurrentMeetupSuccess = createAction(
  '[Meetups] getAttendeesFromCurrentMeetupSuccess',
  props<{ payload: ModelDescriptor<MeetupMember[]> }>()
);

export const updateMeetup = createAction(
  '[Meetups] updateMeetup',
  props<{ meetup: MeetupUpdate }>()
);
export const updateMeetupSuccess = createAction(
  '[Meetups] updateMeetupSuccess',
  props<{ meetup: ModelDescriptor<Meetup> }>()
);

export const deleteMeetup = createAction(
  '[Meetups] deleteMeetup',
  props<{ groupLinkName: string; meetupId: string }>()
);
export const deleteMeetupSuccess = createAction(
  '[Meetups] deleteMeetupSuccess'
);

export const addCurrentUserToAttendMeetup = createAction(
  '[Meetups] addCurrentUserToAttendMeetup'
);

export const removeCurrentUserFromMeetupAttendees = createAction(
  '[Meetups] removeCurrentUserFromMeetupAttendees'
);

export const meetupError = createAction(
  '[Meetups] meetupError',
  props<{ payload: any }>()
);

export const getMeetupRoles = createAction('[Meetups] getMeetupRoles');
export const getMeetupRolesSuccess = createAction(
  '[Meetups] getMeetupRolesSuccess',
  props<{ payload: any }>()
);

export const updateMeetupMember = createAction(
  '[Meetups] updateMeetupMember',
  props<{ memberId: string; role: number }>()
);
export const updateMeetupMemberSuccess = createAction(
  '[Meetups] updateMemberSuccess',
  props<{ payload: ModelDescriptor<MeetupMember> }>()
);

export const cancelMeetup = createAction('[Meetups] cancelMeetup');
export const cancelMeetupSuccess = createAction(
  '[Meetups] cancelMeetupSuccess',
  props<{ meetup: ModelDescriptor<Meetup> }>()
);

export const sendGatheringMessage = createAction(
  '[Groups] sendGatheringMessage',
  props<{ payload: ContactGathering }>()
);
export const sendGatheringMessageSuccess = createAction(
  '[Groups] sendGatheringMessageSuccess'
);
