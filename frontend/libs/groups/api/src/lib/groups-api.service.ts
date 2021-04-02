import { Injectable } from '@angular/core';
import {
  Group,
  GroupMember,
  GroupRole,
  ModelDescriptor,
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class GroupsApiService {
  private actionUrl: string;

  constructor(private http: HttpBaseService) {
    this.actionUrl = 'groups';
  }

  getAll(
    query: string = '',
    page: number = null,
    pageSize: number = null,
    category: string = ''
  ) {
    const queryUrl = `${this.actionUrl}`;
    const parameters: { [key: string]: any } = {};

    if (!!query) {
      parameters['query'] = `${query}`;
    }

    if (!!page) {
      parameters['page'] = `${page}`;
    }

    if (!!pageSize) {
      parameters['pageCount'] = `${pageSize}`;
    }

    if (!!category) {
      parameters['categories'] = `${category}`;
    }

    return this.http.get<ModelDescriptor<Group[]>>(`${queryUrl}`, parameters);
  }

  getAllPersonal() {
    return this.http.get<ModelDescriptor<Group[]>>(`personal/groups`);
  }

  add(item: any) {
    return this.http.post<ModelDescriptor<Group>>(this.actionUrl, item);
  }

  getSingle(groupLinkName: string) {
    return this.http.get<ModelDescriptor<Group>>(
      this.actionUrl + '/' + groupLinkName
    );
  }

  getMembersFromGroup(groupLinkName: string) {
    return this.http.get<ModelDescriptor<GroupMember[]>>(
      this.actionUrl + '/' + groupLinkName + '/members'
    );
  }

  addUserAsMember(groupLinkName: string) {
    return this.http.post<ModelDescriptor<GroupMember[]>>(
      this.actionUrl + '/' + groupLinkName + '/members',
      {}
    );
  }

  updateMember(groupLinkName: string, memberId: string, role: number) {
    return this.http.put<ModelDescriptor<GroupMember>>(
      this.actionUrl + '/' + groupLinkName + '/members/' + memberId,
      {
        memberId,
        role,
      }
    );
  }

  removeUserAsMember(groupLinkName: string, memberId: string) {
    return this.http.delete<ModelDescriptor<GroupMember[]>>(
      this.actionUrl + '/' + groupLinkName + '/members/' + memberId
    );
  }

  update(groupId: string, item: Group) {
    return this.http.put<ModelDescriptor<Group>>(
      this.actionUrl + '/' + groupId,
      item
    );
  }

  delete(item: Group) {
    return this.http.delete(this.actionUrl + '/' + item.id);
  }

  getAllGroupRoles() {
    return this.http.get<GroupRole[]>(`memberroles/groups`);
  }
}
