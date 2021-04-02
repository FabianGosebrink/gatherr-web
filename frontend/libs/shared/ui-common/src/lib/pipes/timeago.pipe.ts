import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeAgoPipe implements PipeTransform {
  templates = {
    prefix: '',
    suffix: ' ago',
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years'
  };

  template(t, n) {
    return (
      this.templates[t] &&
      this.templates[t].replace(/%d/i, Math.abs(Math.round(n)))
    );
  }

  transform(value: any): any {
    if (!value) {
      return;
    }

    if (value instanceof Date) {
      value = value.toUTCString();
    }

    value = value.replace(/\.\d+/, ''); // remove milliseconds
    value = value.replace(/-/, '/').replace(/-/, '/');
    value = value.replace(/T/, ' ').replace(/Z/, ' UTC');
    value = value.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    value = new Date(value * 1000 || value);

    const now = new Date();
    // tslint:disable-next-line: no-bitwise
    const seconds = ((now.getTime() - value) * 0.001) >> 0;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    return (
      this.templates.prefix +
      ((seconds < 45 && this.template('seconds', seconds)) ||
        (seconds < 90 && this.template('minute', 1)) ||
        (minutes < 45 && this.template('minutes', minutes)) ||
        (minutes < 90 && this.template('hour', 1)) ||
        (hours < 24 && this.template('hours', hours)) ||
        (hours < 42 && this.template('day', 1)) ||
        (days < 30 && this.template('days', days)) ||
        (days < 45 && this.template('month', 1)) ||
        (days < 365 && this.template('months', days / 30)) ||
        (years < 1.5 && this.template('year', 1)) ||
        this.template('years', years)) +
      this.templates.suffix
    );
  }
}
