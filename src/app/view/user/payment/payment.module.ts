import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { SharedModule } from 'src/app/shared-module/shared.module';


@NgModule({
  declarations: [
    PaymentSuccessComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
