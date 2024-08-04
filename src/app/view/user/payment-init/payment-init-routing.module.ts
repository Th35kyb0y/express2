import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentInitComponent } from './payment-init.component';

const routes: Routes = [{path:'',component:PaymentInitComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentInitRoutingModule { }
