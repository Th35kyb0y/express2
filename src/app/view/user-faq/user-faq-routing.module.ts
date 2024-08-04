import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFaqComponent } from './user-faq.component';

const routes: Routes = [{path:'',component:UserFaqComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFaqRoutingModule { }
