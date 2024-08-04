import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function gstNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!control.value) {
      return null; // Don't validate if the control is empty
    }
    const valid = gstPattern.test(control.value);
    return valid ? null : { invalidGstNumber: { value: control.value } };
  };
}
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent  implements OnInit{  
  @Input('type') type: string='';
  @Input('obj') obj: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  address :FormGroup = this.formBuilder.group({
    id:0,
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    mobile: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: [''],
    //companyName: ['', Validators.required],
    pincode: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    line1: ['', Validators.required],
    line2: "",
    deliveryInstruction: [''],
    addressType: "",
    isDefault: 0,
    isActive: 1,
    createdOn: (new Date()).toISOString(),
    //gST_Number:'',
    gST_Number:['', [ gstNumberValidator()]],
    EnterTime:'',
		EnquirySource:''
		,Segment:'',
		Category1:'',
		Category2:'',
		Category3:'',
		Remarks:''
  });

  contact :FormGroup = this.formBuilder.group({
		id:0,
		addressId:'',
		email: ['', Validators.required],
		mobile: ['', Validators.required],
		ContactPersonName: ['', Validators.required],
		companyName: [''],
		//companyName: ['', Validators.required],
		isDefault: 1,
		isActive: 1,
		createdOn: (new Date()).toISOString(),
	
	  });

  id:number =0;
  contactId:number =0;
  isFieldInvalid(field: string): boolean {
    const control = this.address.get(field);
   let res =  control?.invalid && (control.dirty || control.touched);
    return res==null?false:res;
  }
  options1:any=[]
	options2:any=[]
	options3:any=[]
	segmentList:any=[];
	EnquirySourceList:any=[];
	StateCommanDropdownEntity: any=[];
	ciltyList: any=[];
  profile:any = null;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private ApiService:ApiService, 
    private Toast:ToastService
   ) {

    this.getSettings();
    this.id = 0;
   }
   isFieldInvalidInContact(field: string): boolean {
		const control = this.contact.get(field);
	   let res =  control?.invalid && (control.dirty || control.touched);
		return res==null?false:res;
	  }
   ngOnInit(): void {
    
    this.setprofile();
    if(this.type=='Edit'){

      this.id = this.obj.id;
      this.setFormValues()
     // this.getAddressById();
      if(this.obj.contactAddress.length>0){
        this.contactId =  this.obj.contactAddress[0].id
        this.setFormContact(this.obj.contactAddress[0]);
      }
      
       
    }else{
      this.contact.patchValue({companyName:this.profile.companyName});
      this.address.patchValue({companyName:this.profile.companyName});
    }
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
   setprofile(){
    
    this.profile = ApiService.getProfile();
  }

   getPostCodeData(){
 
    
      if(this.address.value.pincode.length==6){
        let Q ='&Pincode='+this.address.value.pincode
        this.ApiService.httpget(Q, "/Settings/getCityByStatePinCode").subscribe(
          (response: any) => {
            
            if(response.data.length>0){

              this.address.patchValue({
                state:response.data[0].state.toUpperCase(),
                city: response.data[0].city.toUpperCase()
              })
              //this.address.value.state = response.data[0].state;
              this.getCityAPI(this.address.value.state);
              //this.address.value.city = response.data[0].city;
              // this.objAddress.StateName = data[0].state;
              // this.objAddress.City = data[0].city;
            }
            
          },(err) => {}
        );
      }
      
     
      
  
   }
   getCityAPI(stateName:string){
		
		let find = this.StateCommanDropdownEntity.filter((x:any)=>x.stateName==stateName)
		if(find.length>0){
		  let q='&stateId='+find[0].stateId;
		  this.ApiService.httpget(q, "/Settings/getCityByStateId").subscribe(
			  (response: any) => {this.ciltyList= response.data;},(err) => {}
		  );
		  
		}
	}
	getCity(e:any){
		let value =  e.target.value;
		if(value){
			
		 this.getCityAPI(value)
		  
		}else{
		  this.ciltyList = [];
		}
	  }

   getSettings(){
    let Q =''
    this.ApiService.httpget(Q, "/SegmentMaster/GetAll").subscribe(
      (response: any) => {this.segmentList= response.data;},(err) => {}
    );
    this.ApiService.httpget(Q, "/Settings/getInquirySources").subscribe(
      (response: any) => {this.EnquirySourceList= response.data;},(err) => {}
    );
    this.ApiService.httpget(Q, "/Settings/getAllStates").subscribe(
      (response: any) => {this.StateCommanDropdownEntity= response.data;},(err) => {}
    );
    
}
  //  getAddressById(){
  //   let Q='&id='+this.id
  //   this.ApiService.httpget(Q,'/AddressMaster/getUserAddres').subscribe(
  //     (response: any) => {
  //     if(response.isSuccess){
  //       let obj  =   response.data;
  //       const dynamicValues = {
  //         id:obj.id,
  //         email: obj.email,
  //         mobile: obj.mobile,
  //         firstName: obj.firstName,
  //         lastName: obj.lastName,
  //         companyName: obj.companyName,
  //         pincode: obj.pincode,
  //         city: obj.city,
  //         state: obj.state,
  //         line1:obj.line1,
  //         line2:obj.line2,
  //         deliveryInstruction:obj.deliveryInstruction,
  //         addressType:obj.addressType,
  //         isDefault:obj.isDefault,
  //         isActive:obj.isActive,
  //         createdOn:obj.createdOn,
  //         gST_Number :obj.gST_Number
  //       };
  //       // Use patchValue to set values without affecting other controls
  //       this.address.patchValue(dynamicValues);
      
  //     }else{
  //       this.Toast.showToast(response.message,ToastType.Error)
  //     }
  //     },
  //     (err) => {
  //       this.Toast.showToast(err.Message,ToastType.Error)
  //     }
  //   );
  //  }

  //  getContactById(){
  //   let Q='&id='+this.contactId
  //   this.ApiService.httpget(Q,'/AddressMaster/getUserContact').subscribe(
  //     (response: any) => {
  //     if(response.isSuccess){
  //       let obj  =   response.data;
      
	//       this.contactId =  obj.id;
        
  //     }else{
  //       this.Toast.showToast(response.message,ToastType.Error)
  //     }
  //     },
  //     (err) => {
  //       this.Toast.showToast(err.Message,ToastType.Error)
  //     }
  //   );
  //  }
   setFormContact(obj:any){
    const dynamicValues = {
      id:obj.id,
      addressId:obj.addressId,
      email: obj.email,
      mobile: obj.mobile,
      ContactPersonName: obj.ContactPersonName,
    
      companyName: obj.companyName,
     
      isDefault:obj.isDefault,
      isActive:obj.isActive,
      createdOn:obj.createdOn,
    };
    // Use patchValue to set values without affecting other controls
    this.address.patchValue(dynamicValues);
  
   }

   setFormValues() {
    
    // Simulating dynamic values (replace with your dynamic data)
    const dynamicValues = {
      id:this.obj.id,
      email: this.obj.email,
      mobile: this.obj.mobile,
      firstName: this.obj.firstName,
      lastName: this.obj.lastName,
      companyName: this.obj.companyName,
      pincode: this.obj.pincode,
      city: this.obj.city,
      state: this.obj.state,
      line1:this.obj.line1,
      line2:this.obj.line2,
      deliveryInstruction:this.obj.deliveryInstruction,
      addressType:this.obj.addressType,
      isDefault:this.obj.isDefault,
      isActive:this.obj.isActive,
      createdOn:this.obj.createdOn,
      gST_Number :this.obj.gsT_Number
    };

    
    // Use patchValue to set values without affecting other controls
    this.address.patchValue(dynamicValues);

    // Alternatively, use setValue to set values for all controls
    // this.companyForm.setValue(dynamicValues);
    if(this.StateCommanDropdownEntity.length>0){
      this.getCityAPI(this.address.value.state);
    }else{
      setTimeout(() => {
        this.getCityAPI(this.address.value.state);
      }, 2000);
    }
  }

  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
   
  }

  SubmitBtn(){
		
			if(this.address.valid){
        this.contact.patchValue({
          ContactPersonName:this.address.value.firstName +" "+this.address.value.lastName,
          companyName:this.address.value.companyName,
          mobile:this.address.value.mobile,
          email:this.address.value.email,
        });
				if(this.contact.valid){
					this.saveAddressMaster();

				}else{
					this.contact.markAllAsTouched();
				}
			}else{
				this.address.markAllAsTouched();
			}
		
	}
  saveAddressMaster() {

    

    if (this.address.valid) {

      let script = "/AddressMaster/save";
      if(this.type=='Edit'){
         script = "/AddressMaster/update";
      }
      this.ApiService.httpost({
        id: this.id,
        userID: this.ApiService.getUserId(),
        ...this.address.value
      }, script).subscribe(
        (response: any) => {
          
        if(response.isSuccess){
          this.contact.patchValue({addressId:response.data})
          if( this.id==0){
            this.id =   response.data;
          }
          
				  this.saveContactMaster();
          this.Toast.showToast(response.message,ToastType.Success);
          this.passEntry.emit('refresh');

          this.activeModal.dismiss();
        }else{
          this.Toast.showToast(response.message,ToastType.Error)
        }
        },
        (err) => {
          this.Toast.showToast(err.Message,ToastType.Error)
        }
      );
    } else {
      // Form is invalid, highlight the fields
      this.address.markAllAsTouched();
    }

   
  }
  saveContactMaster() {
		
	
		
	
		if (this.contact.valid) {
	
		  let script = "/AddressMaster/contact-save";
    
      if(this.type=='Edit'){
         script = "/AddressMaster/contact-update";
      }
	
		  //return
		  this.ApiService.httpost({
			id: this.contactId,
			AddressId: this.id,
			...this.contact.value
		  }, script).subscribe(
			(response: any) => {
			if(response.isSuccess){
			
			 // this.Toast.showToast(response.message,ToastType.Success);
			  //this.passEntry.emit('refresh');
		   
			}else{
			  //this.Toast.showToast(response.message,ToastType.Error)
			}
			},
			(err) => {
			  this.Toast.showToast(err.Message,ToastType.Error)
			}
		  );
		} else {
		  // Form is invalid, highlight the fields
		  this.address.markAllAsTouched();
		}
	
	   
	  }
}
