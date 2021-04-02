import { Injectable } from '@angular/core';
import {
  Meetup,
  MeetupCreate,
  MeetupMember,
  MeetupRole,
  MeetupUpdate,
  ModelDescriptor,
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class MeetupsApiService {
  constructor(private http: HttpBaseService) {}

  getMeetupsFromGroup(groupLinkName: string) {
    return this.http.get<ModelDescriptor<Meetup[]>>(
      `groups/${groupLinkName}/meetups`
    );
  }

  addMeetupToGroup(groupLinkName: string, meetup: MeetupCreate) {
    return this.http.post<ModelDescriptor<Meetup>>(
      `groups/${groupLinkName}/meetups`,
      meetup
    );
  }

  getSingle(groupLinkName: string, meetupLinkName: string) {
    return this.http.get<ModelDescriptor<Meetup>>(
      `groups/${groupLinkName}/meetups/${meetupLinkName}`
    );
  }

  update(groupLinkName: string, item: MeetupUpdate) {
    return this.http.put<ModelDescriptor<Meetup>>(
      `groups/${groupLinkName}/meetups/${item.id}`,
      item
    );
  }

  delete(groupLinkName: string, item: Meetup) {
    return this.http.delete(`groups/${groupLinkName}/meetups/${item.id}`);
  }

  getAllAttendeesFromMeetup(groupLinkName: string, meetupId: string) {
    return this.http.get<ModelDescriptor<MeetupMember[]>>(
      `groups/${groupLinkName}/meetups/${meetupId}/members`
    );
  }

  addUserAsAttendee(groupLinkName: string, meetupId: string) {
    return this.http.post<ModelDescriptor<MeetupMember[]>>(
      `groups/${groupLinkName}/meetups/${meetupId}/members`,
      {}
    );
  }

  removeUserFromAttendees(
    groupLinkName: string,
    meetupId: string,
    memberId: string
  ) {
    return this.http.delete<ModelDescriptor<MeetupMember[]>>(
      `groups/${groupLinkName}/meetups/${meetupId}/members/${memberId}`
    );
  }

  getAllMeetupRoles() {
    return this.http.get<MeetupRole[]>(`memberroles/meetups`);
  }

  updateMember(
    groupLinkName: string,
    meetupId: string,
    memberId: string,
    role: number
  ) {
    return this.http.put<ModelDescriptor<MeetupMember>>(
      `groups/${groupLinkName}/meetups/${meetupId}/members/${memberId}`,
      {
        memberId,
        role,
      }
    );
  }
}
