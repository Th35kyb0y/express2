import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-up-pop-up',
  templateUrl: './follow-up-pop-up.component.html',
  styleUrls: ['./follow-up-pop-up.component.scss']
})
export class FollowUpPopUpComponent {
  @Input('obj') obj: any;
  @Input() UserId: any = '';
	@Input() type: any = '';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,) {}
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
      // You can add any logic before closing the modal if needed
      //this.modalService.dismissAll();
      //this.modalService.dismissAll();
    }

    Event(ev:any){
      
        this.UserId = ev.Id;
        this.closeModal('Dismissed')
        //this.passEntry.emit({UserId:this.UserId});
        //document.getElementById('address')?.click();
    }


}
