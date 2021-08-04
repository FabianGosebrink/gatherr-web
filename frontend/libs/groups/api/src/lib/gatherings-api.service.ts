import { Injectable } from '@angular/core';
import {
  Gathering,
  GatheringCreate,
  GatheringMember,
  GatheringRole,
  GatheringUpdate,
  ModelDescriptor,
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class GatheringsApiService {
  constructor(private http: HttpBaseService) {}

  getGatheringsFromGroup(groupLinkName: string) {
    return this.http.get<ModelDescriptor<Gathering[]>>(
      `groups/${groupLinkName}/gatherings`
    );
  }

  addGatheringToGroup(groupLinkName: string, gathering: GatheringCreate) {
    return this.http.post<ModelDescriptor<Gathering>>(
      `groups/${groupLinkName}/gatherings`,
      gathering
    );
  }

  getSingle(groupLinkName: string, linkName: string) {
    return this.http.get<ModelDescriptor<Gathering>>(
      `groups/${groupLinkName}/gatherings/${linkName}`
    );
  }

  update(groupLinkName: string, item: GatheringUpdate) {
    return this.http.put<ModelDescriptor<Gathering>>(
      `groups/${groupLinkName}/gatherings/${item.id}`,
      item
    );
  }

  delete(groupLinkName: string, item: Gathering) {
    return this.http.delete(`groups/${groupLinkName}/gatherings/${item.id}`);
  }

  getAllAttendeesFromGathering(groupLinkName: string, gatheringId: string) {
    return this.http.get<ModelDescriptor<GatheringMember[]>>(
      `groups/${groupLinkName}/gatherings/${gatheringId}/members`
    );
  }

  addUserAsAttendee(groupLinkName: string, gatheringId: string) {
    return this.http.post<ModelDescriptor<GatheringMember[]>>(
      `groups/${groupLinkName}/gatherings/${gatheringId}/members`,
      {}
    );
  }

  removeUserFromAttendees(
    groupLinkName: string,
    gatheringId: string,
    memberId: string
  ) {
    return this.http.delete<ModelDescriptor<GatheringMember[]>>(
      `groups/${groupLinkName}/gatherings/${gatheringId}/members/${memberId}`
    );
  }

  getAllGatheringRoles() {
    return this.http.get<GatheringRole[]>(`memberroles/gatherings`);
  }

  updateMember(
    groupLinkName: string,
    gatheringId: string,
    memberId: string,
    role: number
  ) {
    return this.http.put<ModelDescriptor<GatheringMember>>(
      `groups/${groupLinkName}/gatherings/${gatheringId}/members/${memberId}`,
      {
        memberId,
        role,
      }
    );
  }
}
