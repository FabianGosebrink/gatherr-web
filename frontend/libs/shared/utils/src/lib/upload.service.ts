import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';

@Injectable({ providedIn: 'root' })
export class UploadApiService {
  constructor(private http: HttpBaseService) {}

  uploadProfile(formData: FormData) {
    return this.http.post<{ path: string }>('upload/profile', formData);
  }

  uploadGathering(formData: FormData) {
    return this.http.post<{ path: string }>('upload/profile', formData);
  }

  uploadGroup(formData: FormData) {
    return this.http.post<{ path: string }>('upload/group', formData);
  }
}
