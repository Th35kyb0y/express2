import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb.component';



@NgModule({
 imports:      [ CommonModule,FormsModule ],
 declarations: [ BreadcrumbComponent],
 exports:      [ BreadcrumbComponent, FormsModule ]
})
export class BreadcrumbModule { }