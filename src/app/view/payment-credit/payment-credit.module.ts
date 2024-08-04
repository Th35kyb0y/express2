import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCreditRoutingModule } from './payment-credit-routing.module';
import { PaymentCreditComponent } from './payment-credit.component';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';


@NgModule({
  declarations: [PaymentCreditComponent],
  imports: [
    CommonModule,

    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,HomeLayoutComponentModule,

    PaymentCreditRoutingModule
  ]
})
export class PaymentCreditModule { }
