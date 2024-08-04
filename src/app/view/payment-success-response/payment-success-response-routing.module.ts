import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSuccessResponseComponent } from './payment-success-response.component';

const routes: Routes = [{path:'',component:PaymentSuccessResponseComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSuccessResponseRoutingModule { }
