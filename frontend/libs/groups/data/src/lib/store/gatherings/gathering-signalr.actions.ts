import { createAction, props } from '@ngrx/store';
import {
  Gathering,
  GatheringMember,
  ModelDescriptor,
} from '@workspace/shared/data';

const GatheringMemberPrefix = `[GatheringMembers SignalR]`;
const GatheringsPrefix = `[Gathering SignalR]`;
export const signalrGatheringMemberAdded = createAction(
  `${GatheringMemberPrefix} GatheringMember Added`,
  props<{ payload: ModelDescriptor<GatheringMember> }>()
);

export const signalrGatheringMemberRemoved = createAction(
  `${GatheringMemberPrefix} GatheringMember removed`,
  props<{ payload: ModelDescriptor<GatheringMember> }>()
);

export const signalrGatheringAdded = createAction(
  `${GatheringsPrefix} Gathering Added`,
  props<{ gathering: ModelDescriptor<Gathering> }>()
);

export const signalrGatheringRemoved = createAction(
  `${GatheringsPrefix} Gathering removed`,
  props<{ payload: string }>()
);
