import { Injectable } from '@angular/core';
import { ModelDescriptor, Category } from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  private actionUrl: string;

  constructor(private http: HttpBaseService) {
    this.actionUrl = 'categories/';
  }

  getAll() {
    return this.http.get<ModelDescriptor<Category[]>>(`${this.actionUrl}`);
  }
}
