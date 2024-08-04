import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {path:'',component:OrderComponent},
  {path:'order-details', loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsModule)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
