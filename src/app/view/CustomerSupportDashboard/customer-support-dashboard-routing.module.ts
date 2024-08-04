import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSupportHomeComponent } from './customer-support-home/customer-support-home.component';
import { CsMyCustomersComponent } from 'src/app/components/cs/cs-new/cs-my-customers/cs-my-customers.component';
import { CsInboundCustomersComponent } from 'src/app/components/cs/cs-new/cs-inbound-customers/cs-inbound-customers.component';
import { CsOrderReportsComponent } from 'src/app/components/cs/cs-new/cs-order-reports/cs-order-reports.component';
import { CsProposalReportsComponent } from 'src/app/components/cs/cs-new/cs-proposal-reports/cs-proposal-reports.component';
import { CsProjectsComponent } from 'src/app/components/cs/cs-new/cs-projects/cs-projects.component';
import { CsChangePasswordComponent } from 'src/app/components/cs/cs-new/cs-change-password/cs-change-password.component';
import { CsProfileComponent } from 'src/app/components/cs/cs-new/cs-profile/cs-profile.component';
import { CsEnquiryInSmpstatusComponent } from 'src/app/components/cs/cs-new/cs-enquiry-in-smpstatus/cs-enquiry-in-smpstatus.component';
import { SpencoWiseComponent } from 'src/app/components/cs/cs-new/spenco-wise/spenco-wise.component';
import { CSAuthGuard } from 'src/app/services/cs-auth.guard';
import { MailerComponent } from 'src/app/components/cs/cs-new/mailer/mailer.component';
import { CsPlacedOrdersComponent } from 'src/app/components/cs/cs-new/cs-placed-orders/cs-placed-orders.component';
import { CsProspectsComponent } from 'src/app/components/cs/cs-new/cs-prospects/cs-prospects.component';
import { CsVirtualcallRequestsComponent } from 'src/app/components/cs/cs-new/cs-virtualcall-requests/cs-virtualcall-requests.component';






const routes: Routes = [
  { path: '', redirectTo: 'cs-dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'cs-dashboard', component: CustomerSupportHomeComponent },
      { path: 'cs-my-customers', component: CsMyCustomersComponent },
      { path: 'cs-inbound-customers', component: CsInboundCustomersComponent },
      { path: 'cs-order-reports', component: CsOrderReportsComponent },
      { path: 'cs-proposal-reports', component: CsProposalReportsComponent },
      { path: 'cs-projects', component: CsProjectsComponent },
      { path: 'change-password', component: CsChangePasswordComponent },
      { path: 'cs-profile', component: CsProfileComponent },
      { path: 'cs-smp-enquiry-status', component: CsEnquiryInSmpstatusComponent },
      { path: 'cs-spancowise', component: SpencoWiseComponent },
      { path: 'cs-placed-order', component: CsPlacedOrdersComponent },
      { path: 'cs-user-prospects', component: CsProspectsComponent },
      { path: 'cs-virtualcall', component: CsVirtualcallRequestsComponent },
      { path: 'cs-reports', 

      loadChildren: () => import('./../../components/cs/cs-new/cs-reports/cs-reports.module').then( m => m.CsReportsModule),
      canActivate: [CSAuthGuard]
       },
       { path: 'mailer', component: MailerComponent },
  
      
      // { path: 'cs-dashboard-graph', component: CSDashBoardGraphsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerSupportDashboardRoutingModule { }
