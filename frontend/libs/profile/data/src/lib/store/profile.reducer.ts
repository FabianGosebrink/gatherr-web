import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { UserProfile } from '@workspace/shared/data';
import * as personalActions from './profile.actions';

export interface ReducerProfileState {
  userProfile: UserProfile;
  loading: boolean;
}

export const initialState: ReducerProfileState = {
  userProfile: null,
  loading: false,
};

export const profileReducer = createReducer(
  initialState,

  on(
    personalActions.updateCompleteProfile,
    personalActions.updateProfile,
    personalActions.updatePicture,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),

  on(
    personalActions.updateProfileSuccess,
    personalActions.getProfileSuccess,
    (state, { payload }) => {
      return {
        ...state,
        userProfile: payload.value,
        loading: false,
      };
    }
  )
);

export interface ProfileState {
  profile: ReducerProfileState;
}

export const profileReducers: ActionReducerMap<ProfileState> = {
  profile: profileReducer,
};
