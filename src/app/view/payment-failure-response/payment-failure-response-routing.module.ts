import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFailureResponseComponent } from './payment-failure-response.component';

const routes: Routes = [{path:'',component:PaymentFailureResponseComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentFailureResponseRoutingModule { }
