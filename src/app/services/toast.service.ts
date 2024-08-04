import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../model-popups/alerts/alert/alert.component';
import { ConfirmAlertComponent } from '../model-popups/alerts/confirm-alert/confirm-alert.component';
export enum ToastType {
    Success='toast-success',
    Error='toast-error',
    Warning='toast-warning',
    Info='toast-info',
  }
  const types = ['success', 'error', 'info', 'warning'];
  const iconClasses = {
    error: 'toast-error',
    info: 'toast-info',
    success: 'toast-success',
    warning: 'toast-warning',
  };
@Injectable({
    providedIn: 'root'
})
export class ToastService {

 
    constructor(private toastr: ToastrService,  private modalService: NgbModal,) { }

   showToast(msg:string,type:ToastType){
        //alert(msg)
      
        if(type==ToastType.Success){
          this.toastr.success(msg,'Success', {
            timeOut: 30000,
            positionClass:'toast-top-right',
            closeButton:true,
            progressBar:true,
            progressAnimation:'decreasing'
          } );
        }else if(type==ToastType.Error){
          this.toastr.error(msg,'Error' , {
            timeOut: 30000,
            positionClass:'toast-top-right',
           closeButton:true,
            progressBar:true,
            progressAnimation:'decreasing'
          });
        } 
        else if(type==ToastType.Warning){
          this.toastr.warning(msg,'Warning' , {
            timeOut: 30000,
            positionClass:'toast-top-right',
            closeButton:true,
            progressBar:true,
            progressAnimation:'decreasing'
          });
        } else if(type==ToastType.Info){
          this.toastr.info(msg,'Info' , {
            timeOut: 30000,
            positionClass:'toast-top-right',
            closeButton:true,
            progressBar:true,
            progressAnimation:'decreasing'
          });
        } 
      
      //  this.toastr.show(
      //     msg,
      //     type,
      //     undefined,
      //     type,
      //   );
     
   }
   Alert(message:string){
    const options: NgbModalOptions = {
      centered: true,
      size: 'md',
      animation:true,
      keyboard : false,
      backdrop: true, // 'static' to prevent closing on clicking outside the modal
    };
    const modalRef = this.modalService.open(AlertComponent,options);
    modalRef.componentInstance.message = message;
    
     modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
   }
   async ConfirmAlert(message:string) : Promise<string>{
    const options: NgbModalOptions = {
      centered: true,
      size: 'md',
      animation:true,
      keyboard : false,
      backdrop: true, 
    };
    return new Promise((resolve) => {
      

      const modalRef = this.modalService.open(ConfirmAlertComponent,options);
    modalRef.componentInstance.message = message;
    
     modalRef.result.then(
      (result) => {
        resolve(result);
        console.log('Modal closed with:', result);
      },
      (reason) => {
        resolve(reason);
        console.log('Modal dismissed with:', reason);
      }
    );
    });
    
   }
}
