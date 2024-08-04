import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { OrderSummarByCartModule } from './order-summar-by-cart/order-summar-by-cart.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    ShippingAddressModule ,
    OrderSummarByCartModule,
    UserRoutingModule
  ]
})
export class UserModule { }
