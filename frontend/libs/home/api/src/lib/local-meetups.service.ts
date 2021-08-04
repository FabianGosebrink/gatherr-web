import { Injectable } from '@angular/core';
import {
  Gathering,
  GatheringFilter,
  ModelDescriptor,
} from '@workspace/shared/data';
import { HttpBaseService } from '@workspace/shared/utils';

@Injectable({ providedIn: 'root' })
export class LocalGatheringsApiService {
  constructor(private http: HttpBaseService) {}

  getLocalGatherings(filterDto: GatheringFilter) {
    const url = 'gatherings';
    const filter = this.turnFilterIntoUrl(filterDto);
    return this.http.get<ModelDescriptor<Gathering[]>>(`${url}${filter}`);
    //.subscribe(result => console.log(result));
    // const length = Math.round(Math.random() * 10);
    // const toReturn = [];
    // for (let index = 0; index < length; index++) {
    //   toReturn.push({
    //     id: Math.random(),
    //     title: this.makeid(10)
    //   });
    // }
    // return of({ value: toReturn, links: null, metadata: null });
  }

  private turnFilterIntoUrl(filterDto?: GatheringFilter) {
    if (!filterDto) {
      return '';
    }

    if (!Object.entries(filterDto).length) {
      return '';
    }

    let urlFilter = '?';

    for (const [key, value] of Object.entries(filterDto)) {
      urlFilter += `${key}=${value}&`;
    }

    return urlFilter.substring(0, urlFilter.length - 1);
  }

  private makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
