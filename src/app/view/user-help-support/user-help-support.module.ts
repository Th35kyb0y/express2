import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHelpSupportRoutingModule } from './user-help-support-routing.module';
import { UserHelpSupportComponent } from './user-help-support.component';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';


@NgModule({
  declarations: [UserHelpSupportComponent],
  exports: [UserHelpSupportComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule ,
    HomeLayoutComponentModule,
    UserHelpSupportRoutingModule
  ]
})
export class UserHelpSupportModule { }
