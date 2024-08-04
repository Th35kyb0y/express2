import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRemoveWishListComponent } from './add-remove-wish-list/add-remove-wish-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModelPopupsModule } from 'src/app/model-popups/model-popups.module';



@NgModule({
  declarations: [
    AddRemoveWishListComponent
  ],
  exports: [
    AddRemoveWishListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModelPopupsModule
  ]
})
export class AddRemoveWishListModule { }
