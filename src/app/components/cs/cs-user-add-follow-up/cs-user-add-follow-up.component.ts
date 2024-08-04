import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { CSAPIPath } from 'src/app/view/CustomerSupportDashboard/cs-api-path';
@Component({
  selector: 'app-cs-user-add-follow-up',
  templateUrl: './cs-user-add-follow-up.component.html',
  styleUrls: ['./cs-user-add-follow-up.component.scss']
})
export class CSUserAddFollowUpComponent implements OnInit,OnChanges {
  @Input() UserId: any='';
  @Input('obj') obj: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  followUp :FormGroup = this.formBuilder.group({
    followUpID:0,
    userId:0,
    CustomerId:0,
    userName:[''],
    CustomerName: ['', Validators.required],
    FollowUpDate: ['', Validators.required],
    ProspectCode: ['', Validators.required],
    StartTime: ['', Validators.required],
    EndTime: ['', Validators.required],
    FollowUpType: ['', Validators.required],
    SPANCO: ['', Validators.required],
    NextFollowUpDate: [''],
    Remark: ['', Validators.required],
    Expected_Closure_Date:['', Validators.required],
    EmpCode: [''],
    ProjectId:0,
    ProjectFollowUpId:0,
	Category1:'',
	Category2:'',
	Category3:'',

	Category_1Name:'',
	Category_2Name:'',
	Category_3Name:'',
	Sales_Pitch:'',
	Notes:'',
  Expected_ClosureValue:0.00
	
  });

  customerList:any=[]
  ProspectCodeList:any=[]
  spancolist:any=[]
  id:number =0;
  isFieldInvalid(field: string): boolean {
    const control = this.followUp.get(field);
   let res =  control?.invalid && (control.dirty || control.touched);
    return res==null?false:res;
  }

  options1:any=[]
	options2:any=[]
	options3:any=[]

  constructor(
    private formBuilder: FormBuilder,
    private ApiService:ApiService,
    private Toast:ToastService
   ) {


    this.id = 0;

   }


	getCat2(id:number){
		let Q ='&CategoryId1='+id
		this.ApiService.httpget(Q, "/Categories/getAllCategories2").subscribe(
			(response: any) => {
				this.options2= response.data;
			},
			(err) => {
			}
		);
	}
	getProspect(){
		let Q ='&userId='+ parseInt(this.UserId)
		this.ApiService.httpget(Q, CSAPIPath.GetUserProspects).subscribe(
			(response: any) => {

				this.ProspectCodeList= response.data;
			},
			(err) => {
			}
		);

    
	}

	selectCat2(event: any) {
		// Handle the change event, e.g., log the selected option
		console.log('Selected Option:', event.target.value);
		if(event.target.value){
		this.getCat2(event.target.value)
		}
	  }

	  getCat3(id:number){
		let Q ='&CategoryId2='+id
			this.ApiService.httpget(Q, "/Categories/getAllCategories3").subscribe(
				(response: any) => {
					this.options3= response.data;
				},
				(err) => {
				}
			);
	}


	  selectCat3(event: any) {

		if(event.target.value){
			this.getCat3(event.target.value)

		}
	  }

getCat1(){
	this.ApiService.httpget('', "/Categories/getAllCategories1").subscribe(
		(response: any) => {
			this.options1= response.data;

		},
		(err) => {
		}
	);
}

   get isShowCat(){
    if(this.followUp.value.SPANCO=='Presentation'){
      return true;
    }
    return false;
   }
   ngOnChanges(changes: SimpleChanges): void {

   }
   ngOnInit(): void {
    
    let r = this.obj;
    this.followUp.patchValue({
      CustomerName:(this.obj.companyName?this.obj.companyName:(this.obj.firstName+' '+ this.obj.lastName)),
      EmpCode:this.ApiService.getCSEmpCode(),userId:this.UserId
    })
    this.getContact()
    this.getSettings()
    this.getCat1()
    this.getProspect()


   }
  //  getSettings(){
  //   let Q =''
  //   this.ApiService.httpget(Q, "/Settings/getSpanco").subscribe(
  //     (response: any) => {this.spancolist= response.data;},(err) => {}
  //   );

  //Ajay adav
    getSettings(){
      let Q = '';
      this.ApiService.httpget(Q, '/MenuMaster/getSpancoDropdown').subscribe(
       {
        next:(response:any)=>{
            this.spancolist = response.data;
            console.log('AAAAAAAAA', this.spancolist);
        },
        error:(error:Error)=>{
          console.log('Something Wrong', error)
        }
       }
      );

}

   getContact(){
    let Q =  '&UserId='+this.UserId
    this.ApiService.httpget(Q,'/UserMaster/GetUserCustomerDetails').subscribe(
      (response: any) => {
      if(response.isSuccess){
        let data =  response.data;
       this.followUp.patchValue({userName:data.userName,
       userId:this.UserId
      })
     this.customerList =  data.contactDetails;
      }else{

      }
      },
      (err) => {

      }
    );
   }

   resetForm() {
		//this.followUp.reset(); // Reset values
		//this.followUp.markAsPristine(); // Clear dirty state
		//this.followUp.markAsUntouched(); // Clear touched state

	  }

  saveFollowUp() {
    
    if(!this.UserId){
      this.Toast.showToast('User not found please enter user',ToastType.Success)
    }


    if (this.followUp.valid) {

      let script = "/UserMaster/FollowUpAdd";
      // if(this.addressId=='Edit'){
      //    script = "/AddressMaster/update";
      // }

	  var Category_1Name="",Category_2Name="",Category_3Name="" ;
		if(this.followUp.value.Category1){
			let f =  this.options1.filter((x:any)=>x.id==this.followUp.value.Category1);
			if(f.length>0){
				Category_1Name =  f[0].name;
			}
		}
		if(this.followUp.value.Category2){
			let f =  this.options2.filter((x:any)=>x.id==this.followUp.value.Category2);
			if(f.length>0){
				Category_2Name =  f[0].name;
			}
		}
		if(this.followUp.value.Category3){
			let f =  this.options3.filter((x:any)=>x.id==this.followUp.value.Category3);
			if(f.length>0){
				Category_3Name =  f[0].name;
			}
		}

    let Expected_ClosureValue =0;
    if(this.ProspectCodeList.length>0){
      let f = this.ProspectCodeList.filter((x:any)=>x.prospectCode==this.followUp.value.ProspectCode);
      Expected_ClosureValue = f[0].expected_ClosureValue || 0;
    }
		this.followUp.patchValue({

			Category_1Name: Category_1Name,
			Category_2Name: Category_2Name,
			Category_3Name: Category_3Name,
      Expected_ClosureValue:Expected_ClosureValue
			})

      this.ApiService.httpost({

        ...this.followUp.value
      }, script).subscribe(
        (response: any) => {
          debugger
        if(response.isSuccess){
          this.Toast.showToast(response.message,ToastType.Success);
          this.resetForm();
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
      this.followUp.markAllAsTouched();
    }


  }

}
