import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AddressExtractor {
  extract(value: any, key: string): any {
    for (const addressComponent of value.address_components) {
      if (addressComponent.types.includes(key)) {
        return addressComponent;
      }
    }
  }
}
