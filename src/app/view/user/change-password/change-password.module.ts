import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    SharedModule,
    ChangePasswordRoutingModule
  ]
})
export class ChangePasswordModule { }
