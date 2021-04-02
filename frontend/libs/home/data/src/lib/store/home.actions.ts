import { createAction, props } from '@ngrx/store';
import { MeetupFilter, ModelDescriptor, Place } from '@workspace/shared/data';

const prefix = `[Home]`;

export const getCurrentPlace = createAction(`${prefix} getCurrentPlace`);

export const getCurrentPlaceComplete = createAction(
  `${prefix} getCurrentPlaceComplete`,
  props<{ payload: Place }>()
);

export const getLocalMeetups = createAction(
  `${prefix} getLocalMeetups`,
  props<{ payload: MeetupFilter }>()
);
export const getMoreLocalMeetups = createAction(
  `${prefix} getMoreLocalMeetups`,
  props<{ payload: MeetupFilter }>()
);

export const getLocalMeetupsComplete = createAction(
  `${prefix} getLocalMeetupsComplete`,
  props<{ payload: ModelDescriptor<any[]> }>()
);

export const getMoreLocalMeetupsComplete = createAction(
  `${prefix} getMoreLocalMeetupsComplete`,
  props<{ payload: ModelDescriptor<any[]> }>()
);

export const homeError = createAction(
  `${prefix} homeError`,
  props<{ payload: any }>()
);
