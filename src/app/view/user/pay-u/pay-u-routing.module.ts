import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayUComponent } from './pay-u.component';

const routes: Routes = [
  {path:'p',component:PayUComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayURoutingModule { }
