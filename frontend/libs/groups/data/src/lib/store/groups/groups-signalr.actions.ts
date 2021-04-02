import { createAction, props } from '@ngrx/store';
import { Group, GroupMember, ModelDescriptor } from '@workspace/shared/data';

const groupsPrefix = `[Groups SignalR]`;
const groupsMembersPrefix = `[Groups Members SignalR]`;
export const signalrGroupAdded = createAction(
  `${groupsPrefix} Group Added`,
  props<{ payload: ModelDescriptor<Group> }>()
);

export const signalrGroupMemberAdded = createAction(
  `${groupsMembersPrefix} GroupMember Added`,
  props<{ payload: ModelDescriptor<GroupMember[]> }>()
);

export const signalrGroupMemberRemoved = createAction(
  `${groupsMembersPrefix} GroupMember Removed`,
  props<{ payload: ModelDescriptor<GroupMember[]> }>()
);
