import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, chars: number, suffix = '...'): any {
    if (value.length > chars) {
      return value.substring(0, chars) + suffix;
    }

    return value;
  }
}
