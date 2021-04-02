import { ActionReducerMap } from '@ngrx/store';
import { GroupSignalREffects } from './groups/groups-signalr.effects';
import { GroupEffects } from './groups/groups.effects';
import { groupReducer, ReducerGroupState } from './groups/groups.reducer';
import { MeetupsSignalREffects } from './meetups/meetup.signalr.effects';
import { MeetupEffects } from './meetups/meetups.effects';
import { meetupReducer, ReducerMeetupState } from './meetups/meetups.reducer';

export * from './groups';
export * from './meetups';

export interface GroupState {
  groups: ReducerGroupState;
  meetups: ReducerMeetupState;
}

export const groupReducers: ActionReducerMap<GroupState> = {
  groups: groupReducer,
  meetups: meetupReducer,
};

export const allGroupEffects = [
  GroupEffects,
  GroupSignalREffects,
  MeetupEffects,
  MeetupsSignalREffects,
];
