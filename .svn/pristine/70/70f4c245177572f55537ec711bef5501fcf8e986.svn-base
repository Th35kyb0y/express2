import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  @Input() UserId: any = '';
	@Input() type: any = '';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ApiService:ApiService,
    private router:Router,) {}
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
    }

    registrationEvent(ev:any){
      
        this.UserId = ev.Id;
        this.passEntry.emit({UserId:this.UserId});
        this.closeModal("")
        //document.getElementById('address')?.click();
    }
}
