import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { CsRoutingModule } from './cs-routing.module';
import { CSDashboardComponent } from './csdashboard/csdashboard.component';
import { CSHeaderModule } from './csheader/csheader.module';
import { CspopupModule } from 'src/app/model-popups/cs/cspopup.module';
import { CsDashboardComponent } from './cs-dashboard/cs-dashboard.component';
import { CsProjectComponent } from './cs-project/cs-project.component';
import { FormsModule } from '@angular/forms';
import { CSDashBoardGraphsComponent } from './csdash-board-graphs/csdash-board-graphs.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CsProposalComponent } from './cs-proposal/cs-proposal.component';


@NgModule({
  declarations: [
    CSDashboardComponent,
    CsDashboardComponent,
    CsProjectComponent,
    CSDashBoardGraphsComponent,
    CsProposalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CSHeaderModule,
    NgbPopoverModule,
    CspopupModule,
    CsRoutingModule
  ],
  providers:[Location]
})
export class CsModule { }
