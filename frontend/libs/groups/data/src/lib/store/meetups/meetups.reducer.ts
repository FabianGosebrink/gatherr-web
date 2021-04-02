import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Meetup, MeetupMember } from '@workspace/shared/data';
import * as meetupSignalRActions from './meetup-signalr.actions';
import * as meetupActions from './meetups.actions';

export const featureName = 'meetups';
export interface ReducerMeetupState {
  entities: { [id: string]: Meetup };
  selectedItem: Meetup;
  attendees: MeetupMember[];
  address: string;
  loading: boolean;
  roles: any;
}

export const initialState: ReducerMeetupState = {
  entities: {},
  attendees: [],
  selectedItem: null,
  address: '',
  loading: false,
  roles: null,
};

const meetupReducerInternal = createReducer(
  initialState,

  on(
    meetupActions.addMeetupToCurrentGroup,
    meetupActions.updateMeetup,
    meetupActions.getAllMeetupsFromGroup,
    meetupActions.getSingleMeetup,
    meetupActions.getAttendeesFromCurrentMeetup,
    meetupActions.addCurrentUserToAttendMeetup,
    meetupActions.removeCurrentUserFromMeetupAttendees,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),

  on(
    meetupSignalRActions.signalrMeetupAdded,
    meetupActions.updateMeetupSuccess,
    meetupActions.cancelMeetupSuccess,
    (state, { meetup }) => {
      const entities = {
        ...state.entities,
        [meetup.value.id]: meetup.value,
      };

      return {
        ...state,
        entities,
        loading: false,
      };
    }
  ),

  on(meetupActions.getAllMeetupsFromGroupSuccess, (state, { payload }) => {
    const entities: { [id: string]: Meetup } = {};

    for (const entity of payload.value) {
      entities[entity.id] = entity;
    }

    return {
      ...state,
      entities,
      loading: false,
    };
  }),

  on(meetupActions.getSingleMeetupSuccess, (state, { payload }) => {
    return {
      ...state,
      selectedItem: payload.value,
      loading: false,
    };
  }),

  on(
    meetupActions.getAttendeesFromCurrentMeetupSuccess,
    (state, { payload }) => {
      return {
        ...state,
        attendees: payload.value,
        loading: false,
      };
    }
  ),

  on(meetupSignalRActions.signalrMeetupMemberAdded, (state, { payload }) => {
    const attendees = [...state.attendees, payload.value];

    return {
      ...state,
      attendees,
      loading: false,
    };
  }),

  on(meetupSignalRActions.signalrMeetupMemberRemoved, (state, { payload }) => {
    const toRemove = payload.value;

    const attendees = state.attendees.filter(
      (x) => x.memberId !== toRemove.memberId
    );

    return {
      ...state,
      attendees,
      loading: false,
    };
  }),

  on(meetupActions.getMeetupRolesSuccess, (state, { payload }) => {
    return {
      ...state,
      roles: payload,
      loading: false,
    };
  }),

  on(meetupActions.getMeetupsAddressSuccess, (state, { address }) => {
    return {
      ...state,
      address,
    };
  })
);

export function meetupReducer(
  state: ReducerMeetupState | undefined,
  action: Action
) {
  return meetupReducerInternal(state, action);
}

export const getMeetupFeatureState = createFeatureSelector(featureName);
