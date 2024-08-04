import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.scss']
})
export class ConfirmAlertComponent {
  @Input() message: string='';
  constructor(
    public activeModal: NgbActiveModal,
  ) {}

  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  }
}
