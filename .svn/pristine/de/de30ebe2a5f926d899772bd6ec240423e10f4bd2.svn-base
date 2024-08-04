import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-approve-reject-all',
  templateUrl: './approve-reject-all.component.html',
  styleUrls: ['./approve-reject-all.component.scss']
})
export class ApproveRejectAllComponent {
  @Input() UserId: any = '';
  @Input() Flag: any = '';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  approverRemarks:string=''
  constructor(
    public activeModal: NgbActiveModal,
    public ApiService: ApiService,
		private Toast: ToastService,) {}
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
     
    }

    RejectApproved(status:number){
      debugger
      let obj={
        approverRemarks:this.approverRemarks,
        status:status,
        EmpCode:this.ApiService.getCSEmpCode(),
        UserId:this.UserId,
        Flag:'ApproveOne'
      }
  
      this.ApiService.httpost({
        
        ...obj
        }, "/UserMaster/RejectApproveRegistration").subscribe(
        (response: any) => {
        if(response.isSuccess){
          debugger
          
         this.Toast.showToast(response.message,ToastType.Success);
          this.passEntry.emit('refresh');
          this.closeModal("")
         
        }else{
          this.Toast.showToast(response.message,ToastType.Error);
        }
        },
        (err) => {
          this.Toast.showToast(err.Message,ToastType.Error)
        }
        );
    }

 


}

