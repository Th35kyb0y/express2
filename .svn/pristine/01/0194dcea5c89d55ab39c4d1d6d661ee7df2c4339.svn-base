import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from '../products/products.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from 'src/app/pipes/PipeModule';
import { ProductsComponentsModule } from 'src/app/components/Products/products-components.module';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';
import { AddRemoveWishListModule } from 'src/app/components/add-remove-wish-list/add-remove-wish-list.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MobileProductFilterModule } from 'src/app/model-popups/mobile-product-filter/mobile-product-filter.module';


@NgModule({
  declarations: [
    ProductsComponent,
    MyCartComponent
  ],
  imports: [
    CommonModule,
    
    PipeModule,
    FormsModule,RouterModule,
    ProductsRoutingModule,
    ProductsComponentsModule,
    AddRemoveWishListModule,
    MobileProductFilterModule,
    NgbPopoverModule,
    ModelPopupsModule,
  ]
})
export class ProductsModule { }
