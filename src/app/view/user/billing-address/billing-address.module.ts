import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared-module/shared.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { BillingAddressComponent } from './billing-address.component';
import { BillingAddressRoutingModule } from './billing-address-routing.module';


@NgModule({
  declarations: [BillingAddressComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModelPopupsModule,
    BillingAddressRoutingModule
  ],
  exports:[BillingAddressComponent]
})
export class BillingAddressModule { }
