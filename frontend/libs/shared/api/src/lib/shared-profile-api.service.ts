import { Injectable } from '@angular/core';
import {
  ModelDescriptor,
  UserProfile,
  UserProfileCreate,
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class SharedProfileApiService {
  private userProfileUrl: string;

  constructor(private http: HttpBaseService) {
    this.userProfileUrl = 'userprofile';
  }

  getSingle() {
    return this.http.get<ModelDescriptor<UserProfile>>(
      `${this.userProfileUrl}`
    );
  }

  addProfile(payload: UserProfileCreate) {
    return this.http.post<ModelDescriptor<UserProfile>>(
      `${this.userProfileUrl}`,
      payload
    );
  }
}
