import { Pipe, PipeTransform } from '@angular/core';
import { AddressExtractor } from '@workspace/shared/utils';

@Pipe({
  name: 'formatAddress',
})
export class AddressPipe implements PipeTransform {
  constructor(private addressExtractor: AddressExtractor) {}
  transform(value: any, toExtract: string[]): any {
    if (!value) {
      return '';
    }

    const streetnumber =
      this.addressExtractor.extract(value, 'street_number')?.short_name || '';
    const streetname =
      this.addressExtractor.extract(value, 'route')?.short_name || '';
    const postalCode =
      this.addressExtractor.extract(value, 'postal_code')?.short_name || '';
    const locality =
      this.addressExtractor.extract(value, 'locality')?.short_name || '';
    const country =
      this.addressExtractor.extract(value, 'country')?.long_name || '';

    return `${streetname} ${streetnumber} - ${postalCode} ${locality} - ${country}`;
  }
}
