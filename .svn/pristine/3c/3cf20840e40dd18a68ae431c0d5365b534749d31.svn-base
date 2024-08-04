import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  list: any = [];
  ProjectName:string='';
  @Input() projectId:any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ApiService: ApiService,
    private toast: ToastService
  ) {
   

  }
  ngOnInit(): void {
    this.getProjctDetails()
  }
  closeModal(msg: any) {
    this.activeModal.dismiss(msg);
    // You can add any logic before closing the modal if needed
    //this.modalService.dismissAll();
    //this.modalService.dismissAll();
  }
  delete(item:any,index:number){
    if(confirm('Are you sure?')){
      let Q =  "&userId="+item.userId+"&projectid="+this.projectId
      this.ApiService.httpget(Q, "/UserMaster/deleteUserFromProject").subscribe(
        (response: any) => {
          if(response.isSuccess){
            this.toast.showToast(response.message,ToastType.Success)
            this.list.splice(index, 1);
          }else{
            this.toast.showToast(response.message,ToastType.Error)
          }
        
        },
        (err) => {
        }
      );
    }
   
  }
 

  getProjctDetails() {
  
    let Q =  "&projectId="+this.projectId
    this.ApiService.httpget(Q, "/UserMaster/GetCSProjectDetails").subscribe(
      (response: any) => {

        if (response.isSuccess) {
         
          this.list = response.data
        }


      },
      (err) => {
      }
    );
  }

}