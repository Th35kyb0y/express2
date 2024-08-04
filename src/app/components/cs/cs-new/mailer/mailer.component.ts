import { Component,OnInit, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { FollowUpPopUpComponent } from 'src/app/model-popups/cs/follow-up-pop-up/follow-up-pop-up.component';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { CartService } from 'src/app/services/CartService';
// import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
// import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrls: ['./mailer.component.scss']
})
export class MailerComponent implements OnInit {

	dataMailer:any = [];
  toshowAddMore:boolean=false
refID : number=0
mailerContent:any
apiCallCounter:number=0
mailerName:string=''
newCustbyAddMore:any
mailers:any[]=[]
mailersCustomers:any[]=[]
isWPSelected:boolean=false
toShowMailSendSection:boolean=false
isEmailSelected:boolean=false
toShowNextBtnMode:boolean=false
breadcrumbs: Breadcrumb[] = [];
toShowMailCat:boolean=true
toShowCustomerList:boolean=true
selectedMailer : any
toShowHeading:boolean=true
showMode:boolean=false
list: any = [];
toShowNextBtn : boolean=false
toShowNextBtnMailer:boolean=false
selectedCustomers: Customer[] = [];
data:any = [];
filterObj={
  EmpCode:'',
  companyName:'',
  email:'',
  type:'Self',
  }
  CSList:any=[];
title: any;
  notInList: Customer={
    companyName:'',
    contactPersonName:'',
    email:'',
    mobile:'',
    selected:true
  };

  constructor( public ApiService: ApiService ,   private router:Router,
  
    private _location: Location, 
    private toast:ToastService,
    private CartService :CartService,
		private modalService: NgbModal,private http: HttpClient
    ,public excelDownloadService:ExcelDownloadService,
    private route: ActivatedRoute){
    
  }
  
  ngOnInit(): void {
    this.getMailerAndCategory();
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        let dataArray = JSON.parse(params['data']);
        this.selectedCustomers=dataArray
        console.log(dataArray, "sm"); // Use the array as needed
      }
    });
    //this.getMailerReports()
    this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
    this.getCSList()
    this.getRegistredUserWithFilter();
    this.breadcrumbs.push({label:"Main Category", type:'category',refID:'0'})
  }
  downloadExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  handleBreadCrumb(type:any){

    if(type.type=='Customer Selection'){
      // alert("eee")

      
      this.toShowHeading=true
      this.toShowNextBtn=true
      this.toShowCustomerList=true
      this.toShowMailCat=false
      this.showMode=false
      this.toShowMailSendSection=false
      this.toShowNextBtnMailer=false
      this.toShowNextBtnMode=false
      // this.breadcrumbs=this.breadcrumbs.filter((i)=>i.type=='Customer Selection')
      let Currentindex =  this.breadcrumbs.findIndex((i)=>i.label==type.label)
      // alert(Currentindex)
    
      this.breadcrumbs=this.breadcrumbs.slice(0,Currentindex+1);
      this.toShowNextBtnMode=false
      this.toShowNextBtnMailer=false
      // window.location.reload()
    }
    else if (type.type=='category'){
      // alert("eee1")

      this.toShowCustomerList=false
this.toShowNextBtn=false
this.toShowHeading=false
this.toShowMailCat=true
this.toShowMailSendSection=false
this.toshowAddMore=false
this.showMode=false
this.getMailerAndCategory_ByBreadCrumb(type.type, type.label, type.refID)
this.breadcrumbs=this.breadcrumbs.filter((i)=>i.type=='category' || i.type=='Customer Selection')

// if(type.refID==0){

//   this.breadcrumbs=this.breadcrumbs.filter((i)=>i.type=='sub-category' || i.label=='Portal' )

// }
// else {
//   this.breadcrumbs=this.breadcrumbs.filter((i)=>i.label!=type.label)

// }
      this.breadcrumbs=this.breadcrumbs.filter((i)=>i.type!='sub-category')
      this.toShowNextBtnMode=false
      this.toShowNextBtnMailer=false
    }
    else if(type.type=='sub-category'){
      // alert("eee2")

// alert(type.refID)
this.toShowCustomerList=false
this.toShowNextBtn=false
this.toShowHeading=false
this.toShowMailCat=true
this.toShowMailSendSection=false
this.toshowAddMore=false
this.showMode=false
console.log(type, "dm")
if (type.label=='Mail Shot') {
  this.getMailerAndCategory_ByBreadCrumb(type.type, type.label, type.refID);
}

// this.getMailerAndCategory_ByBreadCrumb(type.type, type.label, type.refID)
if(type.refID==0){
  // alert("77")

  this.breadcrumbs=this.breadcrumbs.filter((i)=>i.type=='sub-category' || i.label=='Portal' )

}
else {
  console.log(this.breadcrumbs, " bc")
  let Currentindex =  this.breadcrumbs.findIndex((i)=>i.label==type.label)
  // alert(Currentindex)

  this.breadcrumbs=this.breadcrumbs.slice(0,Currentindex+1);

}

this.toShowNextBtnMode=false
this.toShowNextBtnMailer=false
    }
    else if(type.type=='mailer'){
      // alert("m")
    this.toShowMailCat=true
this.showMode=false
this.toShowMailSendSection=false
this.toshowAddMore=false
this.toShowNextBtnMailer=true
this.toShowNextBtnMode=false

this.getMailerAndCategory_ByBreadCrumb(type.type, type.label, type.refID)
  this.breadcrumbs=this.breadcrumbs.filter((i)=>i.label!=type.label)
  this.toShowNextBtnMode=false
  this.toShowNextBtnMailer=false
    }
    else if (type.type=='mode'){

      this.showMode=true
      this.toShowMailSendSection=false
this.toshowAddMore=false
      this.toShowMailCat=false
      this.toShowNextBtnMode=true
      this.toShowNextBtnMailer=false
      // this.breadcrumbs=this.breadcrumbs.filter((i)=>i.label!='Mode')
      let Currentindex =  this.breadcrumbs.findIndex((i)=>i.label==type.label)
      // alert(Currentindex)
    
      this.breadcrumbs=this.breadcrumbs.slice(0,Currentindex+1);
      this.toShowNextBtnMode=true
      // this.toShowNextBtnMailer=false
    }
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Basic UWRMS2R6ZjVMTFQ1X1FIbW9VcGFPUFBSNkNsWmFKOWl4MnYweUV5VlBCNDo=',
      'Content-Type': 'application/json'
    })
  }
  
  handleNext(type:any){
    if(type=='Customer'){
      this.getMailerAndCategory()
      this.selectedCustomers = [];
      this.breadcrumbs.push({label:"Main Category", type:'category',refID:'0'})
// alert("ee"+ type.refID)
this.getMailerAndCategory_ByBreadCrumb(type.type, type.label, type.refID)

      // Filter selected customers and add them to selectedCustomers array
      this.list.forEach((customer:any) => {
        if (customer.selected) {
          this.selectedCustomers.push(customer);
        }
      });
      this.toShowCustomerList=false
      this.toShowNextBtn=false
  this.toShowHeading=false
  this.toShowMailCat=true

  // Log selected customers (you can perform further actions here)
      console.log('Selected Customers:', this.selectedCustomers);
    }
    else if(type=='Mailer'){
      console.log(this.selectedMailer)
      // this.breadcrumbs.push({label:"Main Category", type:'mainCat'})

this.showMode=true
this.toShowMailCat=false
this.toShowNextBtnMode=true
this.toShowNextBtnMailer=false
this.breadcrumbs.push({label:'Mode', type:'mode', refID:''})

    }
    else if(type=='Mode'){
      // alert("hjn")
      console.log(this.isEmailSelected, "email")
      console.log(this.isWPSelected , "whatsapp")
this.toShowNextBtnMode=false
this.toShowNextBtnMailer=false
this.toShowMailSendSection=true
this.showMode=false
this.breadcrumbs.push({label:'Send Email', type:'send', refID:''})


    }

  }
  showCustomerList(){

  }
  sendMail() {
    const customersToSend = this.selectedCustomers.filter(customer => customer.selected);

    customersToSend.forEach(customer => {
      if(this.isEmailSelected && this.isWPSelected ){
  
      
        // alert("runs")
        this.sendBothMailAndWp(customer.mobile,customer.email,this.selectedMailer)
      }
      else if (this.isEmailSelected){
        if(customer.email!=''&& customer.email!=null){

        this.sendEmail(customer.email);

        }
      }
      else if (this.isWPSelected){
        if(customer.mobile!=''&& customer.mobile!=null){

this.sendWhatsApppContent(customer.mobile, this.selectedMailer )

        }
      }
    });
    console.log(this.apiCallCounter , "api")
    console.log(this.selectedCustomers.length+1 , "length")

 

    this.storeLogs()

  }

  sendBothMailAndWp(mobile:any,email:any, mailer:any){
     
          // console.log(data.Data)
          // this.objBindAttachmentListEntity = data.Data;
          // this.ClearUrlList();
          // this.CPSProfiletabActive = 4;
          this.http.post<any>('https://api.interakt.ai/v1/public/message/', {
            "countryCode": "+91",
            "phoneNumber": mobile,
            "callbackData": "some text here",
            "type": "Template",
            "template": {
                "name": "ceasefire_express",
                "languageCode": "en",
                "bodyValues": [
                  mailer.whatsAppContent
                  
                  
                ],
                        "headerValues": [
        
                        mailer.whatsAppImgUrl
        
        ]
            }
        }, this.httpOptions ).subscribe((data:any) => {
          if(data.result==true)
          {

            this.ApiService.httpget("&email="+email+"&content="+this.selectedMailer.id+"&mailerName="+this.selectedMailer.mailerName+"&empCode="+this.ApiService.getCSEmpCode(), "/Email/sendMailerToCustomer").subscribe((data:any)=>{
              this.apiCallCounter=this.apiCallCounter+1
              if(this.apiCallCounter==this.selectedCustomers.length){
                if(this.isEmailSelected && this.isWPSelected){
                  alert("Email & WhatsApp Sent Successfully")
    this.router.navigate(['cs/cs-my-customers']);
          
                }
              }
   
          
              })
            // this.ApiServive.routerService('/mailerlist');
            // this.spinner.hide();
          }
          else
          {
            alert('Whatsapp message failed');
            // this.spinner.hide();
          }

            console.log(data)
        })
  }

  viewMailer(item:any,content: TemplateRef<any>){
   
    this.ApiService.httpgetMaster("&mainID="+item.id, "/Mailer/getMailerReportsCustomers").subscribe(
      (response: any) => {
        console.log(response.data, "mailers report customer");
      this.mailersCustomers=response.data
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,size:'xl'}).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
      },
      (err) => {
      }
    );
  }
  downloadReport(){
  
    this.ApiService.httpgetMaster("&sendBy="+this.ApiService.getCSEmpCode(), "/Mailer/getMailerReportsForExcel").subscribe(
      (response: any) => {
        console.log(response.data, " excel report")
        this.downloadExcel(response.data, 'Mailer_Reports')
      })
  }
  sendWhatsApppContent(mobile:any, mailer:any){
  
      
          // console.log(data.Data)
          // this.objBindAttachmentListEntity = data.Data;
          // this.ClearUrlList();
          // this.CPSProfiletabActive = 4;
          this.http.post<any>('https://api.interakt.ai/v1/public/message/', {
            "countryCode": "+91",
            "phoneNumber": mobile,
            "callbackData": "some text here",
            "type": "Template",
            "template": {
                "name": "ceasefire_express",
                "languageCode": "en",
                "bodyValues": [
                  mailer.whatsAppContent
                  
               
                  
                ],
                        "headerValues": [
        
                        mailer.whatsAppImgUrl
        
        ]
            }
        }, this.httpOptions ).subscribe((data:any) => {
     
            this.apiCallCounter=this.apiCallCounter+1
            if(this.apiCallCounter==this.selectedCustomers.length){
              // if(this.isEmailSelected && this.isWPSelected){
                alert("WhatsApp Sent Successfully")
        
    this.router.navigate(['cs/cs-my-customers']);
              
            

            if(this.isEmailSelected==false){
// window.location.reload()
            }
            // this.ApiServive.routerService('/mailerlist');
            // this.spinner.hide();
          }
          else
          {
            alert('Whatsapp message failed');
            // this.spinner.hide();
          }

            console.log(data)
        })
        
   
  }



  storeLogs(){
    this.ApiService.httpget(
      "&mailerName=" + this.selectedMailer.mailerName +
      "&sendBy=" +this.ApiService.getCSEmpCode()+
      "&mode=" + (
        this.isEmailSelected && this.isWPSelected ? 'Email/WhatsApp' :
        (this.isEmailSelected ? 'Email' : 'Whatsapp')
      ),
      "/Mailer/saveMainMailerLog"
    ).subscribe((data: any) => {
      console.log(data, " riw")
      let mainID= data.data[0].insertedRowId
      
      console.log(this.selectedCustomers, "sc")
      this.selectedCustomers.forEach((i:any)=>{
        i.mainID=mainID
      })
      // alert(mainID)
      console.log(this.selectedCustomers, "sc after main id")
      this.ApiService.httpost({customerLog:this.selectedCustomers},'/Mailer/saveCustomerMailerLog').subscribe((data:any)=>{

      })
   
    });
    
  }


  sendEmail(email: string) {

    this.ApiService.httpget("&email="+email+"&content="+this.selectedMailer.id+"&mailerName="+this.selectedMailer.mailerName+"&empCode="+this.ApiService.getCSEmpCode(), "/Email/sendMailerToCustomer").subscribe((data:any)=>{
    

if(this.isWPSelected==false){
// window.location.reload()
this.apiCallCounter=this.apiCallCounter+1
if(this.apiCallCounter==this.selectedCustomers.length){

    alert("Email Sent Successfully")
    this.router.navigate(['cs/cs-my-customers']);

  
}
}
    })

  }
  previewMail(content: TemplateRef<any>){
this.mailerContent=this.selectedMailer.mailerContent
this.mailerName=this.selectedMailer.mailerName
this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
  (result) => {
    //this.closeResult = `Closed with: ${result}`;
  },
  (reason) => {
    //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  },
);
  }
  previewReport(report: TemplateRef<any>){
    this.getMailerReports();

    this.modalService.open(report, { ariaLabelledBy: 'modal-basic-title' , size: 'xl' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
      }
  addMoreCust(){
    let custByID = this.list.find((i:any)=>i.userId==this.newCustbyAddMore)
    custByID.selected=true
    this.selectedCustomers.push(custByID)
    console.log(this.selectedCustomers)
    this.toshowAddMore=false
  }
  getMailerAndCategory_ByCard(iD:any, categoryName:string, refID : any){
    this.ApiService.httpgetMaster("&refID="+iD, "/Mailer/getMailerAndCategory").subscribe(
      (response: any) => {
        console.log(response.data);
      this.dataMailer=response.data
      this.breadcrumbs.push({label:categoryName, type:'sub-category', refID:refID})

      },
      (err) => {
      }
    );
  }
  getMailerAndCategory_ByBreadCrumb(iD:any, categoryName:string, refID : any){
    this.ApiService.httpgetMaster("&refID="+refID, "/Mailer/getMailerAndCategory").subscribe(
      (response: any) => {
        console.log(response.data);
      this.dataMailer=response.data
      // this.breadcrumbs.push({label:categoryName, type:'category', refID:refID})

      },
      (err) => {
      }
    );
  }
  getMailerAndCategory(){
    this.ApiService.httpgetMaster("&refID="+this.refID, "/Mailer/getMailerAndCategory").subscribe(
      (response: any) => {
        console.log(response.data);
      this.dataMailer=response.data
      },
      (err) => {
      }
    );
  }
  getMailerReports(){
    this.ApiService.httpgetMaster("&sendBy="+this.ApiService.getCSEmpCode(), "/Mailer/getMailerReports").subscribe(
      (response: any) => {
        console.log(response.data, "mailers report");
      this.mailers=response.data
      // this.mailers=this.mailers.sort((a, b) => b - a);
      this.mailers.sort((a, b) => b.id - a.id);
      },
      (err) => {
      }
    );
  }

  onMouseEnter() {

  }

  onMouseLeave() {
   
  }

  private selectedItem: any = null;
  toggleSelection(item: any) {
    if (this.selectedItem && this.selectedItem !== item) {
      this.selectedItem.selected = false;
    }

    item.selected = !item.selected;

    if (item.selected) {
      this.selectedItem = item;
      this.toShowNextBtnMailer = true;
      this.selectedMailer = item;
    } else {
      this.selectedItem = null;
      this.toShowNextBtnMailer = false;
      this.selectedMailer = null;
    }

    console.log(item, "mailer");
  }
  toggleSelectionCustomer(item: any) {
    item.selected = !item.selected;
    this.toShowNextBtn=true

  }
  toggleSelectionCustomerSend(item: any) {
    item.selected = !item.selected;

  }
  
  getCSList() {
   
    this.ApiService.httpget('', "/UserMaster/GetCSList").subscribe(
      (response: any) => {
debugger
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
    this.ApiService.httpost(this.filterObj, "/Mailer/GetCSCustomers").subscribe(
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

  addNotInList(){

    if(this.isEmailSelected)
      {
        if (this.notInList.email=='')
          {
            alert("Please Enter Email Id");
            return;
          }
          
      }
      if(this.isWPSelected)
        {
          if (this.notInList.mobile=='')
            {
              alert("Please Enter Mobile No");
              return;
            }
        }
    this.notInList.selected=true
    this.selectedCustomers.push(this.notInList)
    this.notInList={
      companyName:'',
      contactPersonName:'',
      email:'',
      mobile:'',
      selected:true
    };
    console.log(this.selectedCustomers)
    this.toshowAddMore=false
  }

}

interface Customer {
  companyName: string;
  contactPersonName: string;
  email: string;
  mobile: string;
  selected: boolean;
}

interface Breadcrumb {
  label: string;
  type: string;
  refID:string;
}
