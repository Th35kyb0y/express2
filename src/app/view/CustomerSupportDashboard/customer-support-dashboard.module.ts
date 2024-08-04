import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { CustomerSupportDashboardRoutingModule } from './customer-support-dashboard-routing.module';
import { CustomerSupportHomeComponent } from './customer-support-home/customer-support-home.component';
import { CSHeaderModule } from '../cs/csheader/csheader.module';
import { CscomponentsModule } from 'src/app/components/cs/cscomponents.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CspopupModule } from 'src/app/model-popups/cs/cspopup.module';



@NgModule({
  declarations: [
    CustomerSupportHomeComponent

  ],
  imports: [
    CommonModule,
    CustomerSupportDashboardRoutingModule,
    CSHeaderModule,
    NgbPopoverModule,
    CspopupModule,
    CscomponentsModule
  ],
  providers:[Location]
})
export class CustomerSupportDashboardModule { }
