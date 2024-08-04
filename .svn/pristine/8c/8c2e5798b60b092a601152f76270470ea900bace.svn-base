import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'catname'
})
export class CatNamePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(name:any) {

    if (!name) {
      return "";
    }

    const str = ApiService.toSnakeCase(name);

    return str;
  }
}
