import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSuccessResponseRoutingModule } from './payment-success-response-routing.module';
import { PaymentSuccessResponseComponent } from './payment-success-response.component';


@NgModule({
  declarations: [
    PaymentSuccessResponseComponent
  ],
  imports: [
    CommonModule,
    PaymentSuccessResponseRoutingModule
  ]
})
export class PaymentSuccessResponseModule { }
