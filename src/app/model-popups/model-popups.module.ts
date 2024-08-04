import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignUoModelComponent } from './login-sign-uo-model/login-sign-uo-model.component';
import { NGBModule } from '../shared-module/ngb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from './user/add-address/add-address.component';
import { CartOrderSummeryByProductComponent } from './cart-order-summery-by-product/cart-order-summery-by-product.component';
import { EditProfileChangePwdComponent } from './user/edit-profile-change-pwd/edit-profile-change-pwd.component';
import { GalleryPopupComponent } from './gallery-popup/gallery-popup.component';
import { GalleryModule } from '../components/gallery/gallery.module';


@NgModule({
  declarations: [
    LoginSignUoModelComponent,
    AddAddressComponent,
    CartOrderSummeryByProductComponent,
    EditProfileChangePwdComponent,
    GalleryPopupComponent
  ],
  imports: [
    CommonModule,
    NGBModule,
    FormsModule,
    GalleryModule,
    ReactiveFormsModule
  ],
  exports: [
    GalleryModule,
    LoginSignUoModelComponent,
    AddAddressComponent,
    CartOrderSummeryByProductComponent,
    EditProfileChangePwdComponent
  ],
  providers:[]
})
export class ModelPopupsModule { }
