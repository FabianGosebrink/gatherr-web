import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, ReducerProfileState } from './profile.reducer';

export const featureName = 'profile';
export const getProfileFeatureState = createFeatureSelector(featureName);

export const selectProfileState = createSelector(
  getProfileFeatureState,
  (state: ProfileState) => state.profile
);

export const selectUserProfile = createSelector(
  selectProfileState,
  (state: ReducerProfileState) => state.userProfile
);

export const selectIsLoading = createSelector(
  selectProfileState,
  (state: ReducerProfileState) => state.loading
);
