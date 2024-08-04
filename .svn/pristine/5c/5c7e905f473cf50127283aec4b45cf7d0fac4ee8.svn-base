import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
import { ProductsComponentsModule } from 'src/app/components/Products/products-components.module';


@NgModule({
  declarations: [WishlistComponent],
  exports: [WishlistComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,
    HomeLayoutComponentModule,
    ProductsComponentsModule,
    WishlistRoutingModule
  ]
})
export class WishlistModule { }
