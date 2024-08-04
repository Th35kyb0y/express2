import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserRatingComponent } from './create-user-rating/create-user-rating.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateUserRatingComponent
  ],
  exports: [
    CreateUserRatingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class RatingModule { }
