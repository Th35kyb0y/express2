import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/CartService';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {
  proposalData: any;
  objUserList: any;
  userData: any;

  constructor(private toast:ToastService,private CartService :CartService,private ApiService: ApiService,private _router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const d= this.calculateMonthRange()
    this.proposalSearchFilter.fromDate=d.firstDate
    this.proposalSearchFilter.toDate=d.lastDate
    this.getProposalData();
    this.GetAllUsers();
  }

  getProposalData() {
    const query=`&EmpCode=${this.ApiService.getDEEmpCode()}&fromDate=${this.proposalSearchFilter.fromDate}&toDate=${this.proposalSearchFilter.toDate}&status=${'Pending with Design Cell'}`
    this.ApiService.httpgetMaster(query, "/Proposal/getProposalDataDesign").subscribe(
      (response: any) => {
        this.proposalData=response.data;
      },
      (err) => {
      }
    );
  }

   routeToProposal(item:any) {

    this._router.navigate(['/eproposal', { proposalCode: item.proposalCode,customerCode:item.customerCode,email:item.email }]);
  }

  GetAllUsers() {
    debugger;
    this.ApiService.httpgetMaster("", "/UserMaster/getAll").subscribe(
      (response: any) => {
        this.objUserList = response.data;

      },
      (err) => {
      }
    );
  }

  setUserCredentials(e:any)
  {
    this.userData=this.objUserList.find((p: { id: any; })=>p.id==e)
  }


    async createProposal() {
      debugger
      var data:any  =  await this.getUserProfile(this.userData);
      if(data.isSuccess){
        localStorage.setItem("userid",data.data.id);
        localStorage.setItem("profile",JSON.stringify(data.data));
        await this.CartService.AddToCardByApi();
        this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
        setTimeout(() => {
          this.ApiService.setDE(false);
          this._router.navigate(['/']);
        }, 100);
      }else{
        this.toast.showToast(data.message,ToastType.Warning)
      }
    }

    getUserProfile(item: any) {
      return new Promise<string>((resolve, reject) => {
        let Q = "&UserId=" + item.id
        this.ApiService.httpget(Q, "/UserMaster/getUserProfile").subscribe(
          (response: any) => {
            debugger
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

    getImageSrc(e:number): string {
      switch (e) {
        case 2:
          return 'https://ccrmuk.ceasefire.biz/assets/icons/Category1_20240117172159.png'; // Change the path accordingly
        case 3:
          return 'https://ccrmuk.ceasefire.biz/assets/icons/kss.jpg'; // Change the path accordingly
        case 4:
          return 'https://ccrmuk.ceasefire.biz/assets/icons/gas_ss.png'; // Change the path accordingly
          case 11:
          return 'https://cfx.api.ceasefire.biz/Images/46d924ff-7558-40cd-88b7-3348b0f3135f.png';
        default:
          return 'https://ccrmuk.ceasefire.biz/assets/icons/kss.jpg'; // Provide a default image path or handle other cases
      }

  }

  //Ajay Yadav

  proposalSearchFilter:any={
    fromDate:'',
    toDate:'',
    status:'Pending with Design Cell'
  }



  proposalDataByFilter:any
//Ajay




calculateMonthRange(): { firstDate: string, lastDate: string } {
  let currentDate = new Date();
  let firstDate = new Date(currentDate.getFullYear(), 0, 1); 
  let lastDate = new Date(currentDate.getFullYear(), 11, 31); 

  return {
    firstDate: formatDate(firstDate, 'yyyy-MM-dd', 'en-US'),
    lastDate: formatDate(lastDate, 'yyyy-MM-dd', 'en-US')
  };
}

 //Ajay
statusDataArray:any[]=['Pending with Design Cell','BOQ in Progress','Completed Proposal','Submitted To Client','Pending with Design Head','All']
OnSearchProposal(){
  const query=`&EmpCode=${this.ApiService.getDEEmpCode()}&fromDate=${this.proposalSearchFilter.fromDate}&toDate=${this.proposalSearchFilter.toDate}&status=${this.proposalSearchFilter.status}`
  this.ApiService.httpgetMaster(query, "/Proposal/getProposalDataDesign").subscribe(
   {
    next:(response:any)=>{
      this.proposalDataByFilter=response.data;
      this.proposalData=this.proposalDataByFilter
    },
    error:(error:Error)=>{
      console.log("Something Wrong ",error)
    }
   }
  );
}



ClearFilterProposalData(){

this.getProposalData()
}
}
