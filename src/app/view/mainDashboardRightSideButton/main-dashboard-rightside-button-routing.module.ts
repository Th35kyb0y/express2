import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegmentDetaitListComponent } from './segment-detait-list/segment-detait-list.component';

const routes: Routes = [
  {path:'segmentDetails',component:SegmentDetaitListComponent},
  {path:'RiskAreaDetails',component:SegmentDetaitListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRightsideButtonRoutingModule { }
