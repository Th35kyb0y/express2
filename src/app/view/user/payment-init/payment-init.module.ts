import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentInitRoutingModule } from './payment-init-routing.module';
import { PaymentInitComponent } from './payment-init.component';
import { PayUModule } from '../pay-u/pay-u.module';


@NgModule({
  declarations: [
    PaymentInitComponent
  ],
  imports: [
    CommonModule,
    PayUModule,
    PaymentInitRoutingModule
  ]
})
export class PaymentInitModule { }
