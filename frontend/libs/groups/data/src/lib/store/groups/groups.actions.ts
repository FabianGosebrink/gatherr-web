import { createAction, props } from '@ngrx/store';
import {
  ContactGroup,
  Group,
  GroupMember,
  ModelDescriptor,
} from '@workspace/shared/data';

export const getAllGroups = createAction(
  '[Groups] getAllGroups',
  props<{ query?: string; category?: string; page?: number }>()
);
export const getAllGroupsSuccess = createAction(
  '[Groups] getAllGroupsSuccess',
  props<{ payload: ModelDescriptor<Group[]> }>()
);

export const addCompleteGroup = createAction(
  '[Groups] addCompleteGroup',
  props<{ payload: any; formData: FormData }>()
);
export const addGroup = createAction(
  '[Groups] addGroup',
  props<{ payload: any }>()
);
export const addGroupSuccess = createAction(
  '[Groups] addGroupSuccess',
  props<{ payload: ModelDescriptor<Group> }>()
);

export const getSingleGroup = createAction('[Groups] getSingleGroup');
export const getSingleGroupSuccess = createAction(
  '[Groups] getSingleSuccess',
  props<{ payload: ModelDescriptor<Group> }>()
);

export const getAllMembersFromGroup = createAction(
  '[Groups] getAllMembersFromGroup',
  props<{ payload: string }>()
);
export const getAllMembersFromGroupSuccess = createAction(
  '[Groups] getAllMembersFromGroupSuccess',
  props<{ payload: ModelDescriptor<GroupMember[]> }>()
);

export const becomeMember = createAction('[Groups] becomeMember');

export const removeCurrentMember = createAction('[Groups] removeCurrentMember');
export const removeCurrentMemberSuccess = createAction(
  '[Groups] removeCurrentMemberSuccess'
);

export const updateCompleteGroup = createAction(
  '[Groups] updateCompleteGroup',
  props<{ payload: Group; formData: FormData }>()
);
export const updateGroup = createAction(
  '[Groups] updateGroup',
  props<{ payload: Group }>()
);
export const updateGroupSuccess = createAction(
  '[Groups] updateGroupSuccess',
  props<{ payload: ModelDescriptor<Group> }>()
);

export const updateMember = createAction(
  '[Groups] updateMember',
  props<{ memberId: string; role: number }>()
);
export const updateMemberSuccess = createAction(
  '[Groups] updateMemberSuccess',
  props<{ payload: ModelDescriptor<GroupMember> }>()
);
export const groupError = createAction(
  '[Groups] groupError',
  props<{ payload: any }>()
);

export const getGroupRoles = createAction('[Groups] getGroupRoles');
export const getGroupRolesSuccess = createAction(
  '[Groups] getGroupRolesSuccess',
  props<{ payload: any }>()
);

export const sendGroupMessage = createAction(
  '[Groups] sendGroupMessage',
  props<{ payload: ContactGroup }>()
);
export const sendGroupMessageSuccess = createAction(
  '[Groups] sendGroupMessageSuccess'
);
