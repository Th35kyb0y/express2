import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingReviewComponent } from './rating-review.component';

const routes: Routes = [{path:'',component:RatingReviewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingReviewRoutingModule { }
