import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-project-popup',
  templateUrl: './create-project-popup.component.html',
  styleUrls: ['./create-project-popup.component.scss']
})
export class CreateProjectPopupComponent {
  list: any = [];
  obj={
    ProjectName:'',
    Sales_Pitch:'',
    Notes:'',
    Remarks:''
  };
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ApiService: ApiService,
    private toast: ToastService
  ) {
    this.getRegistredUser()

  }
  closeModal(msg: any) {
    this.activeModal.dismiss(msg);
    // You can add any logic before closing the modal if needed
    //this.modalService.dismissAll();
    //this.modalService.dismissAll();
  }
  submit() {
	debugger
 
	if(this.obj.ProjectName){
		let selected = this.list.filter((x: any) => x.isSelected == true)
		if (selected.length > 0) {
	 		let userId =  "";
			 selected.forEach((e:any) => {
				userId =  userId+""+e.userId+"#UserName"+e.firstName +" "+e.lastName+","
			 });

			 userId = userId.replace(/,\s*$/, "");
			 let obj = {
				UserIds : userId,
				ProjectName : this.obj.ProjectName,
				Sales_Pitch : this.obj.Sales_Pitch,
				Notes : this.obj.Notes,
				Remarks : this.obj.Remarks,
				CreatedBy:this.ApiService.getCSEmpCode()
			 }

			 this.ApiService.httpost(obj, "/UserMaster/CreateProject").subscribe(
				(response: any) => {debugger
		  
				  if (response.isSuccess) {
					this.toast.showToast(response.message, ToastType.Success);
					this.passEntry.emit("refresh")
					this.activeModal.dismiss('');
				  }
		  
				},
				(err) => {
				}
			  );

		} else {
		  this.toast.showToast("Please select any one", ToastType.Error)
		}
	}else{
		this.toast.showToast("Please Enter project name", ToastType.Error)
	}
   
  }

  getRegistredUser() {
    
    let obj = {
      EmpCode: this.ApiService.getCSEmpCode()
    }
    this.ApiService.httpost(obj, "/UserMaster/GetCSRegistration").subscribe(
      (response: any) => {

        if (response.isSuccess) {
          response.data.forEach((e: any) => {
            if (!e.isSelected) {
              e.isSelected = false;
            }

          });
          this.list = response.data
        }


      },
      (err) => {
      }
    );
  }

}

