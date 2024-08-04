import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPurchaseHistoryRoutingModule } from './my-purchase-history-routing.module';
import { MyPurchaseHistoryComponent } from './my-purchase-history/my-purchase-history.component';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { SharedModule } from 'src/app/shared-module/shared.module';


@NgModule({
  declarations: [
    MyPurchaseHistoryComponent
  ],
  imports: [
    CommonModule,
    MyPurchaseHistoryRoutingModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,
    ModelPopupsModule
  ]
})
export class MyPurchaseHistoryModule { }
