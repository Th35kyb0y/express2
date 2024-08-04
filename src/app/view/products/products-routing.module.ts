import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'MyCart',
    component: MyCartComponent
  },
  // {
  //   path: 'message-details',
  //   loadChildren: () => import('./message-details/message-details.module').then( m => m.MessageDetailsPageModule)
  // }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
