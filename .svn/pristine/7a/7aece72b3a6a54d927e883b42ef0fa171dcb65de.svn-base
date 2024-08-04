import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CscomponentsModule } from 'src/app/components/cs/cscomponents.module';
import { FollowUpPopUpComponent } from './follow-up-pop-up/follow-up-pop-up.component';
import { CreateProjectPopupComponent } from './create-project-popup/create-project-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFollowUpAddComponent } from './project-follow-up-add/project-follow-up-add.component';
import { ProjectFollowUpHistoryComponent } from './project-follow-up-history/project-follow-up-history.component';
import { EnquiryStatusModelComponent } from './enquiry-status-model/enquiry-status-model.component';
import { ApproveRejectAllComponent } from './approve-reject-all/approve-reject-all.component';
import { CsReportsModelPopUpComponent } from './cs-new/cs-reports-model-pop-up/cs-reports-model-pop-up.component';
import { CsOrderDetailsPopUpComponent } from './cs-new/cs-order-details-pop-up/cs-order-details-pop-up.component';
import { CreateProspectPopupComponent } from './cs-new/create-prospect-popup/create-prospect-popup.component';



@NgModule({
  declarations: [
    UserRegistrationComponent,
    FollowUpPopUpComponent,
    CreateProjectPopupComponent,
    ProjectDetailsComponent,
    ProjectFollowUpAddComponent,
    ProjectFollowUpHistoryComponent,
    EnquiryStatusModelComponent,
    ApproveRejectAllComponent,
    CsReportsModelPopUpComponent,
    CsOrderDetailsPopUpComponent,
    CreateProspectPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CscomponentsModule
  ],
  exports:[UserRegistrationComponent,FollowUpPopUpComponent,CreateProjectPopupComponent,ProjectDetailsComponent,
    ProjectFollowUpAddComponent,CreateProspectPopupComponent,
    ProjectFollowUpHistoryComponent,EnquiryStatusModelComponent,CsReportsModelPopUpComponent,CsOrderDetailsPopUpComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class CspopupModule { }
