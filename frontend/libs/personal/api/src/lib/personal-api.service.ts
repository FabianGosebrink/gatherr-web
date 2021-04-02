import { Injectable } from '@angular/core';
import { Group, Meetup, ModelDescriptor } from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class PersonalApiService {
  private actionUrl: string;

  constructor(private http: HttpBaseService) {
    this.actionUrl = 'personal';
  }

  getAllPersonalGroups() {
    return this.http.get<ModelDescriptor<Group[]>>(`${this.actionUrl}/groups`);
  }

  getAllPersonalMeetups() {
    return this.http.get<ModelDescriptor<Meetup[]>>(
      `${this.actionUrl}/meetups`
    );
  }
}
