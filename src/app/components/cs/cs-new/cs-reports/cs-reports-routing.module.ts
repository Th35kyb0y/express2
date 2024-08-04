import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsReportsComponent } from './cs-reports/cs-reports.component';

const routes: Routes = [
  {path:'',component:CsReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsReportsRoutingModule { }
