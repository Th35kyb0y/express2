import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTabBrochuresComponent } from './search-tab-brochures/search-tab-brochures.component';
import { SearchTabPresentationsComponent } from './search-tab-presentations/search-tab-presentations.component';
import { SearchTabProductsComponent } from './search-tab-products/search-tab-products.component';
import { SearchTabSparesComponent } from './search-tab-spares/search-tab-spares.component';
import { SearchTabTechspecComponent } from './search-tab-techspec/search-tab-techspec.component';
import { SearchTabVideosComponent } from './search-tab-videos/search-tab-videos.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { PipeModule } from 'src/app/pipes/PipeModule';
import { MobileProductFilterModule } from 'src/app/model-popups/mobile-product-filter/mobile-product-filter.module';
import { AddRemoveWishListModule } from '../add-remove-wish-list/add-remove-wish-list.module';
import { ProductsComponentsModule } from '../Products/products-components.module';



@NgModule({
  declarations: [SearchTabBrochuresComponent,
    SearchTabPresentationsComponent,
    SearchTabProductsComponent,
    SearchTabSparesComponent,
    SearchTabTechspecComponent,
    SearchTabVideosComponent],
  imports: [
    CommonModule,
    PipeModule,
    ProductsComponentsModule,
    AddRemoveWishListModule,
    MobileProductFilterModule,
    SharedModule
  ],
  exports: [SearchTabBrochuresComponent,
    SearchTabPresentationsComponent,
    SearchTabProductsComponent,
    SearchTabSparesComponent,
    SearchTabTechspecComponent,
    SearchTabVideosComponent],
})
export class ProductSearchComponentModule { }
