import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthRootState, featureName } from './auth.reducer';

export const getAuthFeatureState = createFeatureSelector(featureName);

export const selectCurrentUserProfile = createSelector(
  getAuthFeatureState,
  (state: AuthRootState) => state.userProfile || { displayName: '', uid: '' }
);

export const selectCurrentUserName = createSelector(
  selectCurrentUserProfile,
  (profile: any) => profile.name
);

export const selectCurrentUserIdentifier = createSelector(
  selectCurrentUserProfile,
  (profile: any) => profile.email
);

export const selectIsLoggedIn = createSelector(
  getAuthFeatureState,
  (state: AuthRootState) => state.isLoggedIn
);

export const selectCurrentUserPicture = createSelector(
  selectCurrentUserProfile,
  (state: any) => state.picture
);
