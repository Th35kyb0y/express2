import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CSDashboardComponent } from './csdashboard/csdashboard.component';
import { CsDashboardComponent } from './cs-dashboard/cs-dashboard.component';
import { CsProjectComponent } from './cs-project/cs-project.component';
import { CSDashBoardGraphsComponent } from './csdash-board-graphs/csdash-board-graphs.component';
import { CsProposalComponent } from './cs-proposal/cs-proposal.component';

const routes: Routes = [
  { path: '', redirectTo: 'cs-dashboard-graph', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'cs-dashboard', component: CsDashboardComponent },
      { path: 'cs-dashboard-graph', component: CSDashBoardGraphsComponent },
      { path: 'cs-project', component: CsProjectComponent },
      { path: 'cs-home', component: CSDashboardComponent },
      { path: 'about', component: CSDashboardComponent },
      { path: 'cs-proposal', component: CsProposalComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsRoutingModule { }
