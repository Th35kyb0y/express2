import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkcomponentComponent } from './quicklinkcomponent.component';



@NgModule({
  declarations: [
    QuicklinkcomponentComponent
  ],
  exports: [
    QuicklinkcomponentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuicklinkcomponentModule { }
