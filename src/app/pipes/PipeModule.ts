
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatNamePipe } from './catename.pipe';
import { SafePipe } from './safe.pipe';
import { SafeHtmlPipe } from './safe-html-pipe';
import { KeyValuePipe } from './keyvalue.pipe';

@NgModule({
  declarations: [CatNamePipe,SafePipe,SafeHtmlPipe,KeyValuePipe],
  imports: [CommonModule],
  exports: [CatNamePipe,SafePipe,SafeHtmlPipe,KeyValuePipe],
})
export class PipeModule {}