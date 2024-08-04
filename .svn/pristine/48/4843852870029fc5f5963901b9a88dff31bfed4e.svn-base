import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLibraryRoutingModule } from './my-library-routing.module';
import { MyLibraryComponent } from './my-library/my-library.component';

import { SharedModule } from 'src/app/shared-module/shared.module';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { LibraryBrochureComponent } from './library-brochure/library-brochure.component';
import { LibraryMainPageComponent } from './library-main-page/library-main-page.component';
import { ProductSubcategoryListComponent } from './product-subcategory-list/product-subcategory-list.component';

@NgModule({
  declarations: [
    MyLibraryComponent,
    LibraryBrochureComponent,
    LibraryMainPageComponent,
    ProductSubcategoryListComponent
  ],
  imports: [
    CommonModule,
    MyLibraryRoutingModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,
    ModelPopupsModule
  ]
})
export class MyLibraryModule { }
