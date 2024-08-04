import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { ProfileImageCropComponent } from './profile-image-crop/profile-image-crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [ProfileComponent, ProfileImageCropComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    HomeLayoutComponentModule,
    sidebarComponentModule,
    SharedModule,
    AppChatComponentModule,
    ModelPopupsModule,
    ImageCropperModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
