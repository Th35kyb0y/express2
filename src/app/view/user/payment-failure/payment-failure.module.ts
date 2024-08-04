import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentFailureRoutingModule } from './payment-failure-routing.module';
import { PaymentFailureComponent } from './payment-failure.component';


@NgModule({
  declarations: [
    PaymentFailureComponent
  ],
  imports: [
    CommonModule,
    PaymentFailureRoutingModule
  ]
})
export class PaymentFailureModule { }
