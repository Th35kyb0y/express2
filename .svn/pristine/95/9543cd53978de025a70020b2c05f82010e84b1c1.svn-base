import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from 'src/app/model-popups/user/add-address/add-address.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  addresses:any = [];
  editObj = null;

  constructor(
    private ApiService:ApiService,
    private modalService: NgbModal,
    private toastservice:ToastService,
  ) { } 

  ngOnInit(): void {
    this.getAddressMaster();
  }


  addAddress(isEdit:string,obj:any){
    
    const modalRef = this.modalService.open(AddAddressComponent, {
      size: "dialog-centered",
      centered: true,
      windowClass: 'xlModal'
    });
   
    modalRef.componentInstance.type = isEdit;
    modalRef.componentInstance.obj = obj;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
      if(receivedEntry){
        this.getAddressMaster();
      }
        
        })
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }


  setDetault(item:any,event: Event) {
    
    // Get the selected value from the event
    const selectedValue = (event.target as HTMLInputElement).value;
    let Q =  '&ID='+item.id+'&userId='+this.ApiService.getUserId()
    this.ApiService.httpget(Q, "/AddressMaster/setDefault").subscribe(
      (response: any) => {
        
        if(response.isSuccess){
          this.toastservice.showToast(response.message,ToastType.Success)
        }else{
          this.toastservice.showToast(response.message,ToastType.Error)
        }
        
      },
      (err) => {
        this.toastservice.showToast('Error occoured please try again later',ToastType.Error)
      }
    );
  }
  
  remove(item:any) {
    
    
    if(confirm('Are you sure?')){
      let Q =  '&ID='+item.id+'&userId='+this.ApiService.getUserId()
      this.ApiService.httpget(Q, "/AddressMaster/Delete").subscribe(
        (response: any) => {
          
          if(response.isSuccess){
            this.getAddressMaster();
            this.toastservice.showToast(response.message,ToastType.Success)
          }else{
            this.toastservice.showToast(response.message,ToastType.Error)
          }
        },
        (err) => {
        }
      );
    }
   
  }

  getAddressMaster() {
    
    let Q =  '&userID='+this.ApiService.getUserId()
    this.ApiService.httpget(Q, "/AddressMaster/getUserAddresses").subscribe(
      (response: any) => {
        response.data.forEach((e:any) => {
			if(!e.IsEditInstruction){
				e.IsEditInstruction  =  false;
			}
			
		});
        this.addresses = response.data;
      },
      (err) => {
      }
    );
   
  }


}
