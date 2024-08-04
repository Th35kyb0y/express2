import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { RatingModule } from 'src/app/model-popups/rating/rating.module';

 
@NgModule({
  declarations: [OrderComponent],
  exports: [OrderComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,
    RatingModule,
    ModelPopupsModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
