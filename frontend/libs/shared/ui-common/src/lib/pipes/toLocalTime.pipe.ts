import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '@workspace/shared/utils';

@Pipe({
  name: 'toLocalTime'
})
export class ToLocalTimePipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(value: any): any {
    if (!value) {
      return '';
    }

    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    return this.utilsService.convertUTCDateToLocalDate(value);
  }
}
