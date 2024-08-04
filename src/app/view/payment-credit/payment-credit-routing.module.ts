import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentCreditComponent } from './payment-credit.component';

const routes: Routes = [{path:'',component:PaymentCreditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCreditRoutingModule { }
