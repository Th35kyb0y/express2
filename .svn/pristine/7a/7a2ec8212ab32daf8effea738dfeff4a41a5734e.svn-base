import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmAlertComponent } from './confirm-alert/confirm-alert.component';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AlertComponent,
    ConfirmAlertComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [
    AlertComponent,
    ConfirmAlertComponent
  ],
  providers: [NgbModalConfig, NgbModal],
})
export class AlertsModule { }
