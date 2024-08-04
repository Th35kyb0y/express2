import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTermsRoutingModule } from './user-terms-routing.module';
import { UserTermsComponent } from './user-terms.component';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';


@NgModule({
  declarations: [UserTermsComponent],
  exports: [UserTermsComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,HomeLayoutComponentModule,

    UserTermsRoutingModule
  ]
})
export class UserTermsModule { }
