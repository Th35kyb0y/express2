import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})
export class KeyValuePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any[] {
    if (value === null || value === undefined) {
      return [];
    }
    return Object.keys(value).map(key => ({ key, value: value[key] }));
  }
}
