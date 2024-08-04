import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProspectPopupComponent } from 'src/app/model-popups/cs/cs-new/create-prospect-popup/create-prospect-popup.component';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { FollowUpPopUpComponent } from 'src/app/model-popups/cs/follow-up-pop-up/follow-up-pop-up.component';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';

@Component({
  selector: 'app-cs-my-customers',
  templateUrl: './cs-my-customers.component.html',
  styleUrls: ['./cs-my-customers.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class CsMyCustomersComponent  implements OnInit{
  list: any = [];
	data:any = [];
  selectedCustomersForMailer:any[]=[]
  toShowMailerBtn:boolean=false
  filterObj={
		EmpCode:'',
		companyName:'',
		email:'',
		type:'Self',
		Status:'',
	  }
    CSList:any=[];
title: any;
  constructor(
    private router:Router,
    public ApiService: ApiService ,
    private _location: Location, 
    private toast:ToastService,
    private CartService :CartService,
		private modalService: NgbModal,
    public csModelService:CSModelService,){
    
  }
  ngOnInit(): void {
    
    this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
    if(this.ApiService.IsAdMin){
      this.filterObj.Status='0'
    }
    this.getCSList()
    this.getRegistredUserWithFilter();
  }
  handleEmailerBtn(){
    this.selectedCustomersForMailer = [];
    this.list.forEach((customer:any) => {
      if (customer.selected) {
        this.selectedCustomersForMailer.push(customer);
      }
    });
    this.router.navigate(['cs/mailer'], { queryParams: { data: JSON.stringify(this.selectedCustomersForMailer) } });
    console.log(this.selectedCustomersForMailer, "sm")
  }
  toggleSelectionCustomer(item: any) {
    item.selected = !item.selected;
    this.updateShowMailerBtn();
  }

  updateShowMailerBtn() {
    this.toShowMailerBtn = this.list.some((customer :any)=> customer.selected);
  }

  Filter(){
    if(!this.filterObj.EmpCode){
      this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
    }
    this.getRegistredUserWithFilter()
   
  }
  clear(){
    this.filterObj.companyName = '';
    this.filterObj.email = '';
    this.filterObj.type = 'Self';
    this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
    this.Filter()
  }

  getProspectList(item:any){
    this.router.navigate(['/cs/cs-user-prospects'], { queryParams: { userId: item.userId }});
  }
  callInvalk(item:any){
    if(item.isApproved != 1){
      this.toast.showToast('The record is awaiting admin approval.',ToastType.Error);
      return
    }
    let postData = {
      loginCode:this.ApiService.getCSEmpCode(),
      MobileNumber:item.mobile
    }
    this.ApiService.httpost(postData, "/UserMaster/intalkCall").subscribe(
      (response: any) => {
        
        if(response.isSuccess){
          if(response.data.status==1){
            this.toast.showToast(response.data.message,ToastType.Success);
          }else{
            this.toast.showToast(response.data.message,ToastType.Error);
          }
        }else{
          this.toast.showToast(response.message,ToastType.Error);
        }

      },
      (err) => {
      }
    );

  }

  getCSList() {
   
      this.ApiService.httpget('', "/UserMaster/GetCSList").subscribe(
        (response: any) => {
  
          if (response.isSuccess) {
            this.CSList = JSON.parse(response.data);
          }
  
  
        },
        (err) => {
        }
      );
    }

  getRegistredUserWithFilter() {
    //   let obj = {
    //     EmpCode: this.ApiService.getCSEmpCode()
    //   }
	  //this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
      this.ApiService.httpost(this.filterObj, "/UserMaster/GetCSSelfRegistrationWithAssigned").subscribe(
        (response: any) => {
  
          if (response.isSuccess) {
            this.list = response.data;
			this.data =   response.data;
          }
  
  
        },
        (err) => {
        }
      );
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
          this.getRegistredUserWithFilter();
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
        this.toast.showToast('The record is awaiting admin approval.',ToastType.Error);
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
          this.getRegistredUserWithFilter();
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

    async createProspect(item:any){
      if(item.isApproved != 1){
        this.toast.showToast('Admint is not approved',ToastType.Error);
        return
      }
      const modalRef = this.modalService.open(CreateProspectPopupComponent, {
        size: "xl",
        centered: true,
        fullscreen: false,
        
      });
      let companyName  =  item.companyName?item.companyName:(item.firstName+' '+item.lastName)
      modalRef.componentInstance.userId = item.userId;
      modalRef.componentInstance.companyName = companyName;
      
      modalRef.result.then(
        (result) => {
          console.log('Modal closed with:', result);
        },
        (reason) => {
          console.log('Modal dismissed with:', reason);
        }
      );
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
            this.getRegistredUserWithFilter();
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
