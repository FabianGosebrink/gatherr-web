import { Injectable } from '@angular/core';
import {
  ContactGathering,
  ContactGroup
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  constructor(private http: HttpBaseService) {}

  contactGroup(contactGroupModel: ContactGroup) {
    return this.http.post(
      `contactmembers/contactgroup`, contactGroupModel
    );
  }

  contactGathering(contactGatheringModel: ContactGathering) {
   return this.http.post(
      `contactmembers/contactgathering`, contactGatheringModel
    );
  }
}
