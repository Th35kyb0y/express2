import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalRoutingModule } from './proposal-routing.module';
import { ProposalComponent } from './proposal.component';
import { sidebarComponentModule } from 'src/app/common/user-layout/sidebar.module';
import { AppChatComponentModule } from 'src/app/common/app-chat-assistance/app-chat-components.module';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { HomeLayoutComponentModule } from 'src/app/common/home-layout/home-layout-components.module';
// import { ProposalSummaryComponent } from '../express-proposal/proposal-summary/proposal-summary.component';

@NgModule({
  declarations: [ProposalComponent],
  exports: [ProposalComponent],
  imports: [
    CommonModule,
    sidebarComponentModule,
    AppChatComponentModule,
    SharedModule,
    ProposalRoutingModule,
    HomeLayoutComponentModule,
    // ProposalSummaryComponent
  ]
})
export class ProposalModule { }
