import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummarByCartComponent } from './order-summar-by-cart.component';

const routes: Routes = [
  {path:'',component:OrderSummarByCartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSummarByCartRoutingModule  { 

 



}
