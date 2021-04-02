import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentService } from '@workspace/shared/environment';

@Pipe({
  name: 'serverPrefix',
})
export class ServerPrefixPipe implements PipeTransform {
  constructor(private evironmentService: EnvironmentService) {}
  transform(value: any): any {
    const url = `${this.evironmentService.getServerUrl()}/${value}`;
    return url.replace('\\', '/');
  }
}
