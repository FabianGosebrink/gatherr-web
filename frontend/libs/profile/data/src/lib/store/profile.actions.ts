import { createAction, props } from '@ngrx/store';
import { ModelDescriptor, UserProfile } from '@workspace/shared/data';

export const getProfile = createAction(
  `[Profile] getProfile`,
  props<{ payload: string }>()
);
export const getProfileSuccess = createAction(
  `[Profile] getProfileSuccess`,
  props<{ payload: ModelDescriptor<UserProfile> }>()
);

export const updateCompleteProfile = createAction(
  '[Profile] updateCompleteProfile',
  props<{ payload: UserProfile; formData: FormData }>()
);
export const updateProfile = createAction(
  '[Profile] updateProfile',
  props<{ payload: UserProfile }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] updateProfileSuccess',
  props<{ payload: ModelDescriptor<UserProfile> }>()
);

export const updatePicture = createAction(
  '[Profile] updatePicture',
  props<{ payload: UserProfile; formData: FormData }>()
);
export const updatePictureSuccess = createAction(
  '[Profile] updatePictureSuccess'
);

export const profileError = createAction(
  `[Profile] getProfileError`,
  props<{ payload: any }>()
);
