import { createAction, props } from '@ngrx/store';
import {
  ModelDescriptor,
  UserProfile,
  UserProfileCreate,
} from '@workspace/shared/data';

const prefix = `[SharedProfile]`;
export const getSharedProfile = createAction(`${prefix} getProfile`);
export const addSharedProfile = createAction(
  `${prefix} addSharedProfile`,
  props<{ payload: UserProfileCreate }>()
);
export const addSharedProfileSuccess = createAction(
  `${prefix} addSharedProfileSuccess`,
  props<{ payload: ModelDescriptor<UserProfileCreate> }>()
);
export const updateSharedProfileSuccess = createAction(
  `${prefix} updateSharedProfileSuccess`,
  props<{ payload: ModelDescriptor<UserProfile> }>()
);
export const getSharedProfileSuccess = createAction(
  `${prefix} getSharedProfileSuccess`,
  props<{ payload: ModelDescriptor<UserProfile> }>()
);
export const sharedProfileError = createAction(
  `${prefix} export const sharedProfileError = createAction(
`,
  props<{ payload: any }>()
);
