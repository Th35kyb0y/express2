import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cs-user-add-edit-address',
  templateUrl: './cs-user-add-edit-address.component.html',
  styleUrls: ['./cs-user-add-edit-address.component.scss']
})
export class CSUserAddEditAddressComponent implements OnInit,OnChanges { 
  @Input() UserId: any='';
  @Input('obj') obj: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  address :FormGroup = this.formBuilder.group({
    id:0,
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: ['', Validators.required],
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
    gST_Number:''
  });

 

  id:number =0;
  isFieldInvalid(field: string): boolean {
    const control = this.address.get(field);
   let res =  control?.invalid && (control.dirty || control.touched);
    return res==null?false:res;
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private ApiService:ApiService,
    private Toast:ToastService
   ) {

    
    this.id = 0;

   }
   ngOnChanges(changes: SimpleChanges): void {
     
   }
   ngOnInit(): void {
    
    // if(this.addressId=='Edit'){

    //   this.id = this.obj.id;

    //     this.setFormValues()
    // }
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
      gST_Number :this.obj.gST_Number
    };
    // Use patchValue to set values without affecting other controls
    this.address.patchValue(dynamicValues);

    // Alternatively, use setValue to set values for all controls
    // this.companyForm.setValue(dynamicValues);
  }

 
  saveAddressMaster() {
    debugger
    if(!this.UserId){
      this.Toast.showToast('User not found please enter user',ToastType.Success)
    }
    

    if (this.address.valid) {

      let script = "/AddressMaster/save";
      // if(this.addressId=='Edit'){
      //    script = "/AddressMaster/update";
      // }

      //return
      this.ApiService.httpost({
        id: this.id,
        userID: this.UserId,
        ...this.address.value
      }, script).subscribe(
        (response: any) => {
        if(response.isSuccess){
          this.Toast.showToast(response.message,ToastType.Success);
          this.passEntry.emit('refresh');
       
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
}