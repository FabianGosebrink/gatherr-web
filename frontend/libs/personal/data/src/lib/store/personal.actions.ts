import { createAction, props } from '@ngrx/store';
import { Gathering, Group, ModelDescriptor } from '@workspace/shared/data';

export const getAllPersonalGroups = createAction('[Personal] getAllGroups');
export const getAllPersonalGroupsSuccess = createAction(
  '[Personal] getAllGroupsSuccess',
  props<{ payload: ModelDescriptor<Group[]> }>()
);

export const getAllPersonalGatherings = createAction(
  '[Personal] getAllPersonalGatherings'
);
export const getAllPersonalGatheringsSuccess = createAction(
  '[Personal] getAllPersonalGatheringsSuccess',
  props<{ payload: ModelDescriptor<Gathering[]> }>()
);

export const personalError = createAction(
  '[Personal] personalError',
  props<{ payload: any }>()
);
