import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferAndEarnComponent } from './refer-and-earn.component';

const routes: Routes = [{path:'',component:ReferAndEarnComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferAndEarnRoutingModule { }
