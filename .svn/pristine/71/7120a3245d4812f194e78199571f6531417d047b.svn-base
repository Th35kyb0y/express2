import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent {
  menus:any = [];
  categories: any = [];
  areas: any = [];
  segments: any = [];
  isLogin: boolean = false;
  searchInput = "";
  routedata: any;
  isHomePage = false;
  condition:boolean= false;
  firstName:string='';
  lastName:string='';
  email:string='';
  phoneNumber:string='';
  address:string='';
  message:string='';

  objenq:any={
    enquiryDate: new Date(),
		id: 0,
		enquirySourceOther: '',
		PostCodeAddress: '',
		isAdded: 0,
		enquirySource: 'Express Direct',
		multiCategory1: '',
		multiCategory2: '',
		multiCategory3: '',
		Category1: '',
		Category2: '',
		Category3: '',
		Category1Id: '',
		Category2Id: '',
		Category3Id: '',
		product: '',
		productName: '',
		ProductMasterID: '',
		EnquiryType : 'End Customer',
		EnquiryTypeOther : '',
		ProductCategory: '',
		organizationName: '',
		state: '',
		contactPersonName: '',
		city: '',
		contactPersonNumber: '',
		pinCode: '',
		countryId: '47',
		CountryCode: '91',
		createdBy: '',
		organizationAddress: '',
		contactPersonEmail: '',
		remarks: '',
		addressLine1:'',
		addressLine2: '',
    enqueiryid:''
  } 
  constructor(private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }
    changeStyle($event:any){
      this.condition = $event.type == 'mouseover' ? true : false;
    }
    emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    onSubmit()
    {
      debugger
      if(!this.firstName){
        alert('First name is required')
        return;
      }
      if(!this.lastName){
        alert('Last name is required')
        return;
      }
      if(!this.email){
        alert('Email is required')
        return;
      }
      if(!this.emailPattern.test(this.email)){
        alert('Please enter valid emial')
        return;
      }
      if(!this.phoneNumber){
        alert('Please enter phone no.')
        return;
      }
      this.phoneNumber = this.phoneNumber.replace(/\s+/g, '');
      if(this.phoneNumber.length<10){
        alert('Please enter a 10-digit number in phone no.')
        return;
      }

      this.objenq.contactPersonName=this.firstName + ' ' + this.lastName;
      this.objenq.Category1Id="FIRE EXTINGUISHER";//this.Category1;
      this.objenq.contactPersonEmail=this.email;
      this.objenq.contactPersonNumber=this.phoneNumber;
      this.objenq.organizationAddress=this.address;
      this.objenq.remarks=this.message;
      this.objenq.createdBy='Direct';
      console.log(this.objenq)
      this.ApiService.httpost(this.objenq, '/Mailer/saveEnquiry')
      .subscribe((res:any)=>{
        alert("Enquiry Sent Suceessfully!");
        this.firstName='';
        this.lastName='';
        this.email='';
        this.phoneNumber='';
        this.address='';
        this.message='';

      },(error=>{
  
      }))

    }
    keyPress(event: any) {


      if (event.charCode !== 0) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
  
        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
      }
  
    }
}
