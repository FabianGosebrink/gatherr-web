import { Injectable } from '@angular/core';
import { ModelDescriptor, UserProfile } from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private userProfileUrl: string;

  constructor(private http: HttpBaseService) {
    this.userProfileUrl = 'userprofile';
  }

  getSingle(id: string) {
    return this.http.get<ModelDescriptor<UserProfile>>(
      `${this.userProfileUrl}/${id}`
    );
  }

  update(item: UserProfile) {
    return this.http.put<ModelDescriptor<UserProfile>>(
      `${this.userProfileUrl}/${item.id}`,
      item
    );
  }
}
