import { createAction, props } from '@ngrx/store';
import { Group, Meetup, ModelDescriptor } from '@workspace/shared/data';

export const getAllPersonalGroups = createAction('[Personal] getAllGroups');
export const getAllPersonalGroupsSuccess = createAction(
  '[Personal] getAllGroupsSuccess',
  props<{ payload: ModelDescriptor<Group[]> }>()
);

export const getAllPersonalMeetups = createAction(
  '[Personal] getAllPersonalMeetups'
);
export const getAllPersonalMeetupsSuccess = createAction(
  '[Personal] getAllPersonalMeetupsSuccess',
  props<{ payload: ModelDescriptor<Meetup[]> }>()
);

export const personalError = createAction(
  '[Personal] personalError',
  props<{ payload: any }>()
);
