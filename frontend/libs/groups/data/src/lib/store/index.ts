import { ActionReducerMap } from '@ngrx/store';
import { GatheringsSignalREffects } from './gatherings/gathering.signalr.effects';
import { GatheringEffects } from './gatherings/gatherings.effects';
import {
  gatheringReducer,
  ReducerGatheringState,
} from './gatherings/gatherings.reducer';
import { GroupSignalREffects } from './groups/groups-signalr.effects';
import { GroupEffects } from './groups/groups.effects';
import { groupReducer, ReducerGroupState } from './groups/groups.reducer';

export * from './gatherings';
export * from './groups';

export interface GroupState {
  groups: ReducerGroupState;
  gatherings: ReducerGatheringState;
}

export const groupReducers: ActionReducerMap<GroupState> = {
  groups: groupReducer,
  gatherings: gatheringReducer,
};

export const allGroupEffects = [
  GroupEffects,
  GroupSignalREffects,
  GatheringEffects,
  GatheringsSignalREffects,
];
