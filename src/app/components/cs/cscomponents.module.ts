import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CSUserRegistrationComponent } from './cs-user-registration/cs-user-registration.component';
import { CSUserAddEditAddressComponent } from './cs-user-add-edit-address/cs-user-add-edit-address.component';
import { CSUserAddFollowUpComponent } from './cs-user-add-follow-up/cs-user-add-follow-up.component';
import { CSUserFollowpHistoryComponent } from './cs-user-followp-history/cs-user-followp-history.component';
import { CSUserDetailsComponent } from './cs-user-details/cs-user-details.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { CsuserfollowupdetailsComponent } from './csuserfollowupdetails/csuserfollowupdetails.component';
import { CsMyCustomersComponent } from './cs-new/cs-my-customers/cs-my-customers.component';
import { CsInboundCustomersComponent } from './cs-new/cs-inbound-customers/cs-inbound-customers.component';
import { CsOrderReportsComponent } from './cs-new/cs-order-reports/cs-order-reports.component';
import { CsProposalReportsComponent } from './cs-new/cs-proposal-reports/cs-proposal-reports.component';
import { CsProjectsComponent } from './cs-new/cs-projects/cs-projects.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CsChangePasswordComponent } from './cs-new/cs-change-password/cs-change-password.component';
import { CsProfileComponent } from './cs-new/cs-profile/cs-profile.component';
import { CsHeaderComponent } from './cs-new/cs-header/cs-header.component';
import { CsLeftNavComponent } from './cs-new/cs-left-nav/cs-left-nav.component';
import { CsEnquiryInSmpstatusComponent } from './cs-new/cs-enquiry-in-smpstatus/cs-enquiry-in-smpstatus.component';
import { SpencoWiseComponent } from './cs-new/spenco-wise/spenco-wise.component';
import { CsSearchCustomerComponent } from './cs-new/cs-search-customer/cs-search-customer.component';
import { MailerComponent } from './cs-new/mailer/mailer.component';
import { CsPlacedOrdersComponent } from './cs-new/cs-placed-orders/cs-placed-orders.component';
import { ProspectsComponent } from './cs-new/prospects/prospects.component';
import { CsProspectsComponent } from './cs-new/cs-prospects/cs-prospects.component';
import { CsVirtualcallRequestsComponent } from './cs-new/cs-virtualcall-requests/cs-virtualcall-requests.component';


@NgModule({
  declarations: [
    CSUserRegistrationComponent,
    CSUserAddEditAddressComponent,
    CSUserAddFollowUpComponent,
    CSUserFollowpHistoryComponent,
    CSUserDetailsComponent,
    CsuserfollowupdetailsComponent,
    CsMyCustomersComponent,
    CsInboundCustomersComponent,
    CsOrderReportsComponent,
    CsProposalReportsComponent,
    CsProjectsComponent,
    CsChangePasswordComponent,
    CsProfileComponent,
    CsHeaderComponent,
    CsLeftNavComponent,
    CsEnquiryInSmpstatusComponent,
    SpencoWiseComponent,
    CsSearchCustomerComponent,
    MailerComponent,
    CsPlacedOrdersComponent,
    ProspectsComponent,
    CsProspectsComponent,
    CsVirtualcallRequestsComponent,
  
   
  ],
  exports: [
    CSUserRegistrationComponent,
    CSUserAddEditAddressComponent,
    CSUserAddFollowUpComponent,
    CSUserFollowpHistoryComponent,
    CSUserDetailsComponent,
    CsuserfollowupdetailsComponent,
    CsMyCustomersComponent,
    CsInboundCustomersComponent,
    CsOrderReportsComponent,
    CsProposalReportsComponent,
    CsProjectsComponent,
    CsHeaderComponent,
    CsLeftNavComponent,
    CsEnquiryInSmpstatusComponent,
    SpencoWiseComponent,
    CsProspectsComponent,
    CsVirtualcallRequestsComponent
  ],
  imports: [
    CommonModule,
    NgbPopoverModule,
    SharedModule
  ]
})
export class CscomponentsModule { }
