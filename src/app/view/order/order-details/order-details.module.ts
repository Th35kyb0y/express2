import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';


@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  exports: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModelPopupsModule,
    OrderDetailsRoutingModule
  ]
}) 
export class OrderDetailsModule { }
