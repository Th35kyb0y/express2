import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { FollowUpPopUpComponent } from 'src/app/model-popups/cs/follow-up-pop-up/follow-up-pop-up.component';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';

@Component({
  selector: 'app-cs-search-customer',
  templateUrl: './cs-search-customer.component.html',
  styleUrls: ['./cs-search-customer.component.scss']
})
export class CsSearchCustomerComponent {
  obj:any={Search:''};
  list: any = [];
  constructor(public ApiService: ApiService ,
    public csModelService:CSModelService,
    private router:Router,
    private toast:ToastService,
    private modalService: NgbModal,
    private CartService :CartService,
  ){}
 

  clear(){
    this.list=[];
  }
  
  search(){
    this.list=[];
     if(this.obj.Search.length>3){
       let Q="&Search="+this.obj.Search
       this.ApiService.httpget(Q, "/UserMaster/GetCSRegistrationSearch").subscribe(
         (response: any) => {
   debugger
           if (response.isSuccess) {
             if(response.data.length>0){
               this.list = response.data;
              
             }else{
               alert("Record not found")
             }
            
           }
   
   
         },
         (err) => {
         }
       );
     }
   }


   

   ViewDetails(item: any) {
     this.registration('Edit', item.userId)
   }
   registration(type: string, UserId: number) {
     const modalRef = this.modalService.open(UserRegistrationComponent, {
       size: "xl",
       centered: true,
       fullscreen: true,
       //windowClass: 'xlModal-100'
     });
     modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
       
       if (receivedEntry) {
         //this.getRegistredUserWithFilter();
       }
 
     })
     modalRef.componentInstance.type = type;
     modalRef.componentInstance.UserId = UserId;
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

   followUp(item: any,type:string) {
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     const modalRef = this.modalService.open(FollowUpPopUpComponent, {
       size: "xl",
       centered: true,
       fullscreen: true,
       //windowClass: 'xlModal-100'
     });
     modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
 
       if (receivedEntry) {
         //this.getRegistredUserWithFilter();
       }
 
     })
 
     modalRef.componentInstance.UserId = item.userId;
     modalRef.componentInstance.obj = item;
     modalRef.componentInstance.type = type;
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
 
   async createProposal(item: any) {
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     
     var data:any  =  await this.getUserProfile(item);
     if(data.isSuccess){
       localStorage.setItem("userid",data.data.id);
       localStorage.setItem("profile",JSON.stringify(data.data));
       await this.CartService.AddToCardByApi();
       this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
       setTimeout(() => {
         this.router.navigate(['/FireAuditForYourPremises']);
       }, 100);
     }else{
       this.toast.showToast(data.message,ToastType.Warning)
     }
   }
   async createOrder(item: any) {
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     var data:any  =  await this.getUserProfile(item);
     if(data.isSuccess){
       localStorage.setItem("userid",data.data.id);
       localStorage.setItem("profile",JSON.stringify(data.data));
       await this.CartService.AddToCardByApi();
       this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
       setTimeout(() => {
         this.router.navigate(['/']);
       }, 100);
     }else{
       this.toast.showToast(data.message,ToastType.Warning)
     }
   }
   async ViewOrder(item: any) {
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     var data:any  =  await this.getUserProfile(item);
     if(data.isSuccess){
       localStorage.setItem("userid",data.data.id);
       localStorage.setItem("profile",JSON.stringify(data.data));
       await this.CartService.AddToCardByApi();
       this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
       setTimeout(() => {
         this.router.navigate(['/user/order']);
       }, 100);
     }else{
       this.toast.showToast(data.message,ToastType.Warning)
     }
   }
   enqueryStatus(item:any){
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     const modalRef = this.modalService.open(EnquiryStatusModelComponent, {
       size: "xl",
       centered: true,
       fullscreen: false,
       
     });
     
     modalRef.componentInstance.userId = item.userId;
     modalRef.componentInstance.enq_Ref = item.enq_Ref;
     
     modalRef.result.then(
       (result) => {
         console.log('Modal closed with:', result);
       },
       (reason) => {
         console.log('Modal dismissed with:', reason);
       }
     );
   }
   assignEnquery(item:any){
     debugger
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     if(item.enq_Ref){
       this.toast.showToast("Already Created",ToastType.Error);
       return;
     }
     let obj = {
       EmpCode: this.ApiService.getCSEmpCode(),
       UserId: item.userId,
     }
     this.ApiService.httpost(obj, "/UserMaster/CSAssignEnquiryINSMP").subscribe(
       (response: any) => {
 
         if (response.isSuccess) {
          
           this.toast.showToast(response.message,ToastType.Success)
           
         }else{
           this.toast.showToast(response.message,ToastType.Error)
         }
 
 
       },
       (err) => {
       }
     );
   }
   getUserProfile(item: any) {
     return new Promise<string>((resolve, reject) => {
       let Q = "&UserId=" + item.userId
       this.ApiService.httpget(Q, "/UserMaster/getUserProfile").subscribe(
         (response: any) => {
           
           if (response.isSuccess) {
 
           }else{
 
           }
           resolve(response);
 
         },
         (err) => {
           reject(err)
         }
       );
     });
 
   }
   async sendProposal(item: any) {
     if(item.isApproved != 1){
       this.toast.showToast('Admint is not approved',ToastType.Error);
       return
     }
     var data:any  =  await this.getUserProfile(item);
     if(data.isSuccess){
       localStorage.setItem("userid",data.data.id);
       localStorage.setItem("profile",JSON.stringify(data.data));
       await this.CartService.AddToCardByApi();
       this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
       setTimeout(() => {
         this.router.navigate(['/user/proposal']);
       }, 100);
     }else{
       this.toast.showToast(data.message,ToastType.Warning)
     }
   }

}
