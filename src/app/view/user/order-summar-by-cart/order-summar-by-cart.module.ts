import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSummarByCartRoutingModule } from './order-summar-by-cart-routing.module';
import { OrderSummarByCartComponent } from './order-summar-by-cart.component';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderSummarByCartComponent],
  imports: [
    CommonModule,
    ModelPopupsModule,
    FormsModule,
    OrderSummarByCartRoutingModule
  ],
  exports:[OrderSummarByCartComponent]
})
export class OrderSummarByCartModule { }
