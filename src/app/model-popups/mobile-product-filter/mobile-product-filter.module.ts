import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileProductFilterComponent } from './mobile-product-filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MobileProductFilterComponent
  ],
  exports: [
    MobileProductFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MobileProductFilterModule { }
