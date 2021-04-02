import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  convertUTCDateToLocalDate(date) {
    const newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  padDigits(num: number, size: number) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  formDataHasData(formData: FormData) {
    if (!formData) {
      return false;
    }

    let count = 0;

    formData.forEach(() => count++);

    return count > 0;
  }
}
