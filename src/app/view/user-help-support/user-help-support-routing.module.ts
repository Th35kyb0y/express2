import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHelpSupportComponent } from './user-help-support.component';

const routes: Routes = [{path:'',component:UserHelpSupportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHelpSupportRoutingModule { }
