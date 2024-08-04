import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/CartService';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cs-virtualcall-requests',
  templateUrl: './cs-virtualcall-requests.component.html',
  styleUrls: ['./cs-virtualcall-requests.component.scss'],
  providers:[DatePipe]
})
export class CsVirtualcallRequestsComponent implements OnInit {
  list: any = [];
	data:any = [];
  filterObj={
		fromDate:'',
		toDate:"",
	  }
  constructor(
    private router:Router,
    public ApiService: ApiService,
      private datepipe:DatePipe,
    private toast:ToastService,
    private CartService :CartService,
		private modalService: NgbModal,){
    
  }
  ngOnInit(): void {
    
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    //this.filterObj.toDate =  new Date(aYearFromNow);

    this.filterObj.fromDate = this.datepipe.transform(new Date(),'yyyy-MM-dd')|| "";
    this.filterObj.toDate = this.datepipe.transform(new Date(aYearFromNow),'yyyy-MM-dd')|| "";
    this.getVirtualcallRequest();
  }

  Filter(){
    this.getVirtualcallRequest()
   
  }

  callInvalk(item:any){
    
    let postData = {
      loginCode:this.ApiService.getCSEmpCode(),
      MobileNumber:item.virtualContactNo
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
  getVirtualcallRequest() {
  
      this.ApiService.httpost(this.filterObj, "/UserMaster/GetVirtualAssistantForCs").subscribe(
        (response: any) => {
  
          if (response.isSuccess) {
            this.list = response.data;
			
          }
  
  
        },
        (err) => {
        }
      );
    }

  
}
