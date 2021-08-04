import { createAction, props } from '@ngrx/store';
import {
  GatheringFilter,
  ModelDescriptor,
  Place,
} from '@workspace/shared/data';

const prefix = `[Home]`;

export const getCurrentPlace = createAction(`${prefix} getCurrentPlace`);

export const getCurrentPlaceComplete = createAction(
  `${prefix} getCurrentPlaceComplete`,
  props<{ payload: Place }>()
);

export const getLocalGatherings = createAction(
  `${prefix} getLocalGatherings`,
  props<{ payload: GatheringFilter }>()
);
export const getMoreLocalGatherings = createAction(
  `${prefix} getMoreLocalGatherings`,
  props<{ payload: GatheringFilter }>()
);

export const getLocalGatheringsComplete = createAction(
  `${prefix} getLocalGatheringsComplete`,
  props<{ payload: ModelDescriptor<any[]> }>()
);

export const getMoreLocalGatheringsComplete = createAction(
  `${prefix} getMoreLocalGatheringsComplete`,
  props<{ payload: ModelDescriptor<any[]> }>()
);

export const homeError = createAction(
  `${prefix} homeError`,
  props<{ payload: any }>()
);
