import { createAction, props } from '@ngrx/store';
import {
  ContactGathering,
  Gathering,
  GatheringCreate,
  GatheringMember,
  GatheringUpdate,
  ModelDescriptor,
} from '@workspace/shared/data';

export const getAllGatheringsFromGroup = createAction(
  '[Gatherings] getAllGatheringsFromGroup'
);
export const getAllGatheringsFromGroupSuccess = createAction(
  '[Gatherings] getAllGatheringsFromGroupSuccess',
  props<{ payload: ModelDescriptor<Gathering[]> }>()
);

export const addGatheringToCurrentGroup = createAction(
  '[Gatherings] addGatheringToCurrentGroup',
  props<{ gathering: GatheringCreate; formData: FormData }>()
);

export const addGathering = createAction(
  '[Gatherings] addGathering',
  props<{ groupLinkName: string; gathering: GatheringCreate }>()
);
export const addGatheringToCurrentGroupSuccess = createAction(
  '[Gatherings] addGatheringToCurrentGroupSuccess',
  props<{ groupLinkName: string; gathering: ModelDescriptor<Gathering> }>()
);

export const getSingleGathering = createAction(
  '[Gatherings] getSingleGathering'
);
export const getSingleGatheringSuccess = createAction(
  '[Gatherings] getSingleGatheringSuccess',
  props<{ payload: ModelDescriptor<Gathering> }>()
);
export const getGatheringsAddress = createAction(
  '[Gatherings] getGatheringsAdress'
);
export const getGatheringsAddressSuccess = createAction(
  '[Gatherings] getGatheringsAdressSuccess',
  props<{ address: string }>()
);
export const getAttendeesFromCurrentGathering = createAction(
  '[Gatherings] getAttendeesFromCurrentGathering',
  props<{ payload: ModelDescriptor<Gathering> }>()
);
export const getAttendeesFromCurrentGatheringSuccess = createAction(
  '[Gatherings] getAttendeesFromCurrentGatheringSuccess',
  props<{ payload: ModelDescriptor<GatheringMember[]> }>()
);

export const updateGathering = createAction(
  '[Gatherings] updateGathering',
  props<{ gathering: GatheringUpdate }>()
);
export const updateGatheringSuccess = createAction(
  '[Gatherings] updateGatheringSuccess',
  props<{ gathering: ModelDescriptor<Gathering> }>()
);

export const deleteGathering = createAction(
  '[Gatherings] deleteGathering',
  props<{ groupLinkName: string; gatheringId: string }>()
);
export const deleteGatheringSuccess = createAction(
  '[Gatherings] deleteGatheringSuccess'
);

export const addCurrentUserToAttendGathering = createAction(
  '[Gatherings] addCurrentUserToAttendGathering'
);

export const removeCurrentUserFromGatheringAttendees = createAction(
  '[Gatherings] removeCurrentUserFromGatheringAttendees'
);

export const gatheringError = createAction(
  '[Gatherings] gatheringError',
  props<{ payload: any }>()
);

export const getGatheringRoles = createAction('[Gatherings] getGatheringRoles');
export const getGatheringRolesSuccess = createAction(
  '[Gatherings] getGatheringRolesSuccess',
  props<{ payload: any }>()
);

export const updateGatheringMember = createAction(
  '[Gatherings] updateGatheringMember',
  props<{ memberId: string; role: number }>()
);
export const updateGatheringMemberSuccess = createAction(
  '[Gatherings] updateMemberSuccess',
  props<{ payload: ModelDescriptor<GatheringMember> }>()
);

export const cancelGathering = createAction('[Gatherings] cancelGathering');
export const cancelGatheringSuccess = createAction(
  '[Gatherings] cancelGatheringSuccess',
  props<{ gathering: ModelDescriptor<Gathering> }>()
);

export const sendGatheringMessage = createAction(
  '[Groups] sendGatheringMessage',
  props<{ payload: ContactGathering }>()
);
export const sendGatheringMessageSuccess = createAction(
  '[Groups] sendGatheringMessageSuccess'
);
