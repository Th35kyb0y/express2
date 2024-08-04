import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
	selector: 'app-cs-user-registration',
	templateUrl: './cs-user-registration.component.html',
	styleUrls: ['./cs-user-registration.component.scss'],
	providers: [DatePipe]
})
export class CSUserRegistrationComponent implements OnChanges {
	@Input() UserId: any = '';
	@Input() type: any = '';
	AddressId: any = 0
	contactId: any = 0
	approverRemarks: string = '';
	@Output() passEntry: EventEmitter<any> = new EventEmitter();
	options1: any = []
	options2: any = []
	options3: any = []
	segmentList: any = [];
	EnquirySourceList: any = [];
	StateCommanDropdownEntity: any = [];
	ciltyList: any = [];
	isApproved: number = 0;
	userSignUp: FormGroup = this.formBuilder.group({
		ID: 0,
		firstName: [null, Validators.required],
		lastName: [null, Validators.required],
		mobile: [null, Validators.required],
		email: [null, [Validators.required, Validators.email]],
		password: [null],
		photo: [""],
		referCode: [""],
		isEmailVerified: [0],
		isMobileVerified: [0],
		forceLogout: [0],
		isActive: [1],
		createdOn: [(new Date()).toISOString()],

		createdByEmpCode: [''],
		companyName: [null, Validators.required],
		enquiry_Date: [null, Validators.required],
		EnterTime: '',
		Category_1: '',
		Category_2: '',
		Category_3: '',
		AssignedBy: '',
		isApproved: 0,
		Category_1Name: '',
		Category_2Name: '',
		Category_3Name: '',
		ApproverRemarks: '',
		Sales_Pitch: '',
		Notes: '',
		Remarks: '',
		isCustomerSelfCreated: ['', Validators.required]
	});
	userProfile: any = {
		id: 0,
		firstName: '',
		lastName: '',
		mobile: '',
		email: ''
	};

	address: FormGroup = this.formBuilder.group({
		id: 0,
		email: ['', Validators.required],
		mobile: ['', Validators.required],
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		companyName: ['', ''],
		pincode: ['', Validators.required],
		city: ['', Validators.required],
		state: ['', Validators.required],
		line1: ['', Validators.required],
		line2: "",
		deliveryInstruction: [''],
		addressType: "",
		isDefault: 1,
		isActive: 1,
		createdOn: (new Date()).toISOString(),
		gST_Number: '',
		EnterTime: '',
		EnquirySource: ''
		, Segment: '',
		Category1: '',
		Category2: '',
		Category3: '',
		Remarks: ''
	});
	contact: FormGroup = this.formBuilder.group({
		id: 0,
		addressId: '',
		email: ['', Validators.required],
		mobile: ['', Validators.required],
		ContactPersonName: ['', Validators.required],
		companyName: ['', Validators.required],
		isDefault: 1,
		isActive: 1,
		createdOn: (new Date()).toISOString(),

	});

	resetForm() {
		this.userSignUp.reset(); // Reset values
		this.userSignUp.markAsPristine(); // Clear dirty state
		this.userSignUp.markAsUntouched(); // Clear touched state

		this.address.reset(); // Reset values
		this.address.markAsPristine(); // Clear dirty state
		this.address.markAsUntouched(); // Clear touched state


		this.contact.reset(); // Reset values
		this.contact.markAsPristine(); // Clear dirty state
		this.contact.markAsUntouched(); // Clear touched state
		this.UserId = '';
		this.AddressId = 0;
		this.contactId = 0;
	}
	constructor(
		private formBuilder: FormBuilder,
		public ApiService: ApiService,
		private router: Router,
		private Toast: ToastService,
		private datepipe: DatePipe
	) {


		this.userSignUp.patchValue({

			enquiry_Date: this.datepipe.transform(new Date(), 'YYYY-MM-dd'),

		});

		this.getSettings();
		this.getCat1();
	}
	ngOnChanges(changes: SimpleChanges): void {

		console.log(this.UserId);
		console.log(this.type);
		if (this.UserId) {
			this.getRegistredUserdetails()
		}
	}

	getSettings() {
		let Q = ''
		this.ApiService.httpget(Q, "/SegmentMaster/GetAll").subscribe(
			(response: any) => { this.segmentList = response.data; }, (err) => { }
		);
		this.ApiService.httpget(Q, "/Settings/getInquirySources").subscribe(
			(response: any) => { this.EnquirySourceList = response.data; }, (err) => { }
		);
		this.ApiService.httpget(Q, "/Settings/getAllStates").subscribe(
			(response: any) => { this.StateCommanDropdownEntity = response.data; }, (err) => { }
		);

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
	getCityAPI(stateName: string) {

		let find = this.StateCommanDropdownEntity.filter((x: any) => x.stateName == stateName)
		if (find.length > 0) {
			let q = '&stateId=' + find[0].stateId;
			this.ApiService.httpget(q, "/Settings/getCityByStateId").subscribe(
				(response: any) => { this.ciltyList = response.data; }, (err) => { }
			);

		}
	}
	getCity(e: any) {
		let value = e.target.value;
		if (value) {

			this.getCityAPI(value)

		} else {
			this.ciltyList = [];
		}
	}

	getRegistredUserdetails() {

		let q = '&UserId=' + this.UserId
		this.ApiService.httpget(q, "/UserMaster/GetCSRegistratedUserDetails").subscribe(
			(response: any) => {


				if (response.isSuccess) {
					let data = response.data;
					this.AddressId = data.addressId;
					this.contactId = data.contactId;
					let isCustomerSelfCreated = data.isCustomerSelfCreated;
					this.userSignUp.patchValue({
						ID: this.UserId,
						firstName: data.firstName,
						lastName: data.lastName,
						mobile: data.mobile,
						email: data.email,
						companyName: data.companyName,
						enquiry_Date: this.datepipe.transform(data.enquiry_Date, 'YYYY-MM-dd'),
						EnterTime: data.enterTime,
						Category_1: data.category1,
						Category_2: data.category2,
						Category_3: data.category3,
						Sales_Pitch: data.sales_Pitch,
						Notes: data.notes,
						isCustomerSelfCreated: isCustomerSelfCreated
					});
					this.approverRemarks = data.approverRemarks;
					this.isApproved = data.isApproved;
					if (data.category2) {
						this.getCat2(data.category1)
					}
					if (data.category3) {
						this.getCat3(data.category2)
					} if (data.city) {
						this.getCityAPI(data.state)
					}

					this.address.patchValue({
						id: data.addressId,
						email: data.addressEmail,
						mobile: data.addressMobile,
						firstName: data.addressfirstName,
						lastName: data.addresslastName,
						companyName: data.companyName,
						pincode: data.pincode,
						city: data.city,
						state: data.state,
						line1: data.line1,
						line2: data.line2,
						deliveryInstruction: data.deliveryInstruction,
						addressType: "",
						isDefault: 1,
						isActive: 1,
						// createdOn: data.createdOn,
						gST_Number: data.gsT_Number,
						EnterTime: data.enterTime,
						EnquirySource: data.enquirySource
						, Segment: data.segment,
						Category1: data.category1,
						Category2: data.category2,
						Category3: data.category3,
						Remarks: data.remarks
					});
					this.contact.patchValue({
						id: data.contactId,
						addressId: data.addressId,
						email: data.contactPersonEmail,
						mobile: data.contactPersonMobile,
						ContactPersonName: data.contactPersonName,
						companyName: data.companyName

					});

				}


			},
			(err) => {
			}
		);
	}

	getCat2(id: number) {
		let Q = '&CategoryId1=' + id
		this.ApiService.httpget(Q, "/Categories/getAllCategories2").subscribe(
			(response: any) => {
				this.options2 = response.data;
			},
			(err) => {
			}
		);
	}
	selectCat2(event: any) {
		// Handle the change event, e.g., log the selected option
		console.log('Selected Option:', event.target.value);
		if (event.target.value) {
			this.getCat2(event.target.value)
		}
	}

	getCat3(id: number) {
		let Q = '&CategoryId2=' + id
		this.ApiService.httpget(Q, "/Categories/getAllCategories3").subscribe(
			(response: any) => {
				this.options3 = response.data;
			},
			(err) => {
			}
		);
	}


	selectCat3(event: any) {

		if (event.target.value) {
			this.getCat3(event.target.value)
			// let Q ='&CategoryId2='+event.target.value
			// this.ApiService.httpget(Q, "/Categories/getAllCategories3").subscribe(
			// 	(response: any) => {
			// 		this.options3= response.data;
			// 	},
			// 	(err) => {
			// 	}
			// );
		}
	}

	getCat1() {
		this.ApiService.httpget('', "/Categories/getAllCategories1").subscribe(
			(response: any) => {
				this.options1 = response.data;

			},
			(err) => {
			}
		);
	}

	isFieldInvalid(field: string): boolean {
		const control = this.address.get(field);
		let res = control?.invalid && (control.dirty || control.touched);
		return res == null ? false : res;
	}
	isFieldInvalidInContact(field: string): boolean {
		const control = this.contact.get(field);
		let res = control?.invalid && (control.dirty || control.touched);
		return res == null ? false : res;
	}

	registerUser() {

		if (this.userSignUp.valid) {

			// if (this.UserId) {
			// 	this.userProfile = {
			// 		id: this.UserId,
			// 		firstName: this.userSignUp.value.firstName,
			// 		lastName: this.userSignUp.value.lastName,
			// 		mobile: this.userSignUp.value.mobile,
			// 		email: this.userSignUp.value.email
			// 	};
			// 	this.updateProfile()
			// } else {

				var Category_1Name = "", Category_2Name = "", Category_3Name = "";
				if (this.address.value.Category1) {
					let f = this.options1.filter((x: any) => x.id == this.address.value.Category1);
					if (f.length > 0) {
						Category_1Name = f[0].name;
					}
				}
				if (this.address.value.Category2) {
					let f = this.options2.filter((x: any) => x.id == this.address.value.Category2);
					if (f.length > 0) {
						Category_2Name = f[0].name;
					}
				}
				if (this.address.value.Category3) {
					let f = this.options3.filter((x: any) => x.id == this.address.value.Category3);
					if (f.length > 0) {
						Category_3Name = f[0].name;
					}
				}

				this.userSignUp.patchValue({
					Category_1: this.address.value.Category1,
					Category_2: this.address.value.Category2,
					Category_3: this.address.value.Category3,
					Category_1Name: Category_1Name,
					Category_2Name: Category_2Name,
					Category_3Name: Category_3Name,
					Remarks: this.address.value.Remarks
				})
				


				this.userSignUp.patchValue({ createdByEmpCode: this.ApiService.getCSEmpCode(), password: '123456' });
			
				const formValues = this.userSignUp.value;
				for (const key in formValues) {
				  if (formValues[key] === null) {
					this.userSignUp.patchValue({
					  [key]: ''
					});
				  }
				}
				const formValues2 = this.address.value;
				for (const key in formValues2) {
					if (formValues2[key] === null) {
					  this.address.patchValue({
						[key]: ''
					  });
					}
				  }
				  const formValues3 = this.contact.value;
				  for (const key in formValues3) {
					  if (formValues3[key] === null) {
						this.contact.patchValue({
						  [key]: ''
						});
					  }
					}
				// 	let aaa= this.address.value;
				// 	let aaa2= this.contact.value;
				// 	let aaa3= this.userSignUp.value;
				// return;
				if (this.UserId && this.UserId>0){
					this.updateProfile();
					this.saveAddressMaster();
					
				}else{
					this.ApiService.httpost(this.userSignUp.value, "/UserMaster/save").subscribe(
						(response: any) => {
							this.Toast.showToast(response.message, ToastType.Success);
							if (response.isSuccess) {
								this.UserId = response.data.id;
								this.saveAddressMaster();
								setTimeout(() => {
									this.passEntry.emit({ Id: response.data.id });
								}, 2000);
	
							}
	
	
						},
						(err) => {
						}
					);
				}
				
			//}

		}
		else {
			// Mark the form controls as touched to display validation messages
			this.userSignUp.markAllAsTouched();
		}
	}

	saveAddressMaster() {
debugger
		if (!this.UserId) {
			this.Toast.showToast('User not found please enter user', ToastType.Success)
		}


		if (this.address.valid) {

			let script = "/AddressMaster/save";
			if(this.type=='Edit' && this.AddressId>0){
			   script = "/AddressMaster/update";
			}

			//return
			this.ApiService.httpost({
				id: this.AddressId,
				userID: this.UserId,
				...this.address.value
			}, script).subscribe(
				(response: any) => {
					debugger
					if (response.isSuccess) {
						if(this.type=='Edit' && this.AddressId>0){
							this.saveContactMaster();
						 }else{
							this.AddressId = response.data;
							this.contact.patchValue({ addressId: response.data })
							this.saveContactMaster();
						 }
						
						// this.Toast.showToast(response.message,ToastType.Success);
						//this.passEntry.emit('refresh');

					} else {
						//// this.Toast.showToast(response.message,ToastType.Error)
					}
				},
				(err) => {
					this.Toast.showToast(err.Message, ToastType.Error)
				}
			);
		} else {
			// Form is invalid, highlight the fields
			this.address.markAllAsTouched();
		}


	}

	saveContactMaster() {


debugger

		if (this.contact.valid) {

			let script = "/AddressMaster/contact-save";
			if(this.type=='Edit' && this.contactId>0){
			   script = "/AddressMaster/contact-update";
			}

			//return
			this.ApiService.httpost({
				id: this.contactId,
				AddressId: this.AddressId,
				...this.contact.value
			}, script).subscribe(
				(response: any) => {
					if (response.isSuccess) {
						this.resetForm();
						// this.Toast.showToast(response.message,ToastType.Success);
						//this.passEntry.emit('refresh');

					} else {
						//this.Toast.showToast(response.message,ToastType.Error)
					}
				},
				(err) => {
					this.Toast.showToast(err.Message, ToastType.Error)
				}
			);
		} else {
			// Form is invalid, highlight the fields
			this.address.markAllAsTouched();
		}


	}

	updateProfile() {


		this.ApiService.httpost(this.userSignUp.value, "/UserMaster/updateProfileByCS").subscribe(
			(response: any) => {
				this.Toast.showToast(response.message, ToastType.Success);
				if (response.isSuccess) {
					setTimeout(() => {
						this.passEntry.emit({ Id: this.UserId });
					}, 1000);
				}
				//alert(response.message);
			},
			(err) => {
			}
		);

	}

	SubmitBtn() {
		if (this.userSignUp.valid) {
			this.address.patchValue({
				firstName: this.userSignUp.value.firstName,
				lastName: this.userSignUp.value.lastName,
				mobile: this.userSignUp.value.mobile,
				email: this.userSignUp.value.email,
				EnterTime: this.userSignUp.value.EnterTime
			})
			this.contact.patchValue({
				ContactPersonName: this.userSignUp.value.firstName + " " + this.userSignUp.value.lastName,
				companyName: this.userSignUp.value.companyName,
				mobile: this.userSignUp.value.mobile,
				email: this.userSignUp.value.email,
			});


			if (this.address.valid) {
				if (this.contact.valid) {
					this.registerUser();

				} else {
					this.contact.markAllAsTouched();
				}
			} else {
				this.address.markAllAsTouched();
			}
		}
		else {
			// Mark the form controls as touched to display validation messages
			this.userSignUp.markAllAsTouched();
		}
	}

	RejectApproved(status: number) {

		let obj = {
			approverRemarks: this.approverRemarks,
			status: status,
			EmpCode: this.ApiService.getCSEmpCode(),
			UserId: this.UserId,
			Flag: 'ApproveOne'
		}

		this.ApiService.httpost({

			...obj
		}, "/UserMaster/RejectApproveRegistration").subscribe(
			(response: any) => {
				if (response.isSuccess) {


					this.Toast.showToast(response.message, ToastType.Success);
					this.passEntry.emit('refresh');

				} else {
					this.Toast.showToast(response.message, ToastType.Error);
				}
			},
			(err) => {
				this.Toast.showToast(err.Message, ToastType.Error)
			}
		);
	}

}
