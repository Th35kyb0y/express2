import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayURoutingModule } from './pay-u-routing.module';
import { PayUComponent } from './pay-u.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PayUComponent],
  exports: [PayUComponent],
  imports: [
    CommonModule,
    FormsModule,
    PayURoutingModule
  ]
})
export class PayUModule { }
