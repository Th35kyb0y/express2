import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddressRoutingModule } from './user-address-routing.module';
import { UserAddressComponent } from './user-address.component';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';


@NgModule({
  declarations: [UserAddressComponent],
  exports: [UserAddressComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    ModelPopupsModule,
    SharedModule,
    HomeLayoutComponentModule,
    UserAddressRoutingModule
  ]
})
export class UserAddressModule { } 
