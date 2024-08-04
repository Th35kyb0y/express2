import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { now } from 'lodash';
import { ApproveRejectAllComponent } from 'src/app/model-popups/cs/approve-reject-all/approve-reject-all.component';
import { CreateProjectPopupComponent } from 'src/app/model-popups/cs/create-project-popup/create-project-popup.component';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { FollowUpPopUpComponent } from 'src/app/model-popups/cs/follow-up-pop-up/follow-up-pop-up.component';
import { ProjectDetailsComponent } from 'src/app/model-popups/cs/project-details/project-details.component';
import { ProjectFollowUpAddComponent } from 'src/app/model-popups/cs/project-follow-up-add/project-follow-up-add.component';
import { ProjectFollowUpHistoryComponent } from 'src/app/model-popups/cs/project-follow-up-history/project-follow-up-history.component';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { CartService } from 'src/app/services/CartService';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import { ApiService } from 'src/app/services/api.service';
import { PayUMoneyService } from 'src/app/services/pay-umoney.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
	selector: 'app-csdashboard',
	templateUrl: './csdashboard.component.html',
	styleUrls: ['./csdashboard.component.scss']
})
export class CSDashboardComponent implements OnInit {

	list: any = [];
	list2: any = [];
	constructor(public ApiService: ApiService, 
		public excelDownloadService:ExcelDownloadService,
		private _location: Location, private router: Router,
		private modalService: NgbModal,
		private CartService :CartService,
		private toast:ToastService,
		private pay:PayUMoneyService) { }
		Pay(){
		this.pay.PayNow("OR123454")
		}

	ngOnInit(): void {
		this.getRegistredUser();
		this.getCreatedProject();
	}
	getCreatedProject() {
		let obj = {
			EmpCode: this.ApiService.getCSEmpCode()
		}
		this.ApiService.httpost(obj, "/UserMaster/GetCSCreatedProject").subscribe(
			(response: any) => {

				if (response.isSuccess) {
					this.list2 = response.data
				}


			},
			(err) => {
			}
		);
	}
	getRegistredUser() {
		let obj = {
			EmpCode: this.ApiService.getCSEmpCode()
		}
		this.ApiService.httpost(obj, "/UserMaster/GetCSRegistration").subscribe(
			(response: any) => {

				if (response.isSuccess) {
					this.list = response.data
				}


			},
			(err) => {
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
					this.getRegistredUser();
					this.toast.showToast(response.message,ToastType.Success)
					
				}else{
					this.toast.showToast(response.message,ToastType.Error)
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
			size: "lg",
			centered: true,
			fullscreen: false,
			//windowClass: 'xlModal-100'
		});
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
			
			if (receivedEntry) {
				this.getRegistredUser();
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
	getProjectDetails(item:any){
		const modalRef = this.modalService.open(ProjectDetailsComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
		});
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getCreatedProject();
			}

		})
		modalRef.componentInstance.projectId = item.projectId;
//projectId
		modalRef.result.then(
			(result) => {
				console.log('Modal closed with:', result);
			},
			(reason) => {
				console.log('Modal dismissed with:', reason);
			}
		);
	}
	createGroup(){
		const modalRef = this.modalService.open(CreateProjectPopupComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
		});
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getCreatedProject();
			}

		})

		modalRef.result.then(
			(result) => {
				console.log('Modal closed with:', result);
			},
			(reason) => {
				console.log('Modal dismissed with:', reason);
			}
		);
	}
	
	onCSRegistredFileSelected(event: any) {
		
		const file2 = event.target.files && event.target.files[0];
		const file: File = event.target.files[0];

		if (file) {

			let fileName = file.name;

			const formData = new FormData();

			formData.append("file", file);
			formData.append("EmpCode", this.ApiService.getCSEmpCode());
			if (this.ApiService.getCSEmpCode()) {
				let Q = "&EmpCode=" + this.ApiService.getCSEmpCode()
				this.ApiService.httpostForm1("/UserMaster/CSUploadExcel", formData).subscribe(
					(response: any) => {
						

						if (response.isSuccess) {
							this.getRegistredUser();
							this.toast.showToast(response.message,ToastType.Success);
						}else{
							this.toast.showToast(response.message,ToastType.Error);
						}


					},
					(err) => {
					}
				);
			}


			// const upload$ = this.http.post("/api/thumbnail-upload", formData);

			// upload$.subscribe();
		}
	}

	downloadTemplate(type:string){
		this.ApiService.downloadFile('&type='+type,"/UserMaster/downloadExcel").subscribe((data: any) => {
			
			const currentTime = new Date();
			// Get the hours, minutes, and seconds
			const hours = currentTime.getHours();
			const minutes = currentTime.getMinutes();
			const seconds = currentTime.getSeconds();
			const formattedTime = `${hours}:${minutes}:${seconds}`;
			const fileName = 'template -'+formattedTime+'.xlsx'; 
			const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = fileName;
			link.click();
		  });
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

	followUp(item: any,type:string) {
		if(item.isApproved != 1){
			this.toast.showToast('Admint is not approved',ToastType.Error);
			return
		}
		const modalRef = this.modalService.open(FollowUpPopUpComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
			//windowClass: 'xlModal-100'
		});
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getRegistredUser();
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

	blnkItem:any={
		isApproved:0,
		UserId:0
	}
	approveReject(item: any,Flag:string) {
		if(item.isApproved == 1){
			this.toast.showToast('Approved already',ToastType.Error);
			return
		}
		const modalRef = this.modalService.open(ApproveRejectAllComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
			//windowClass: 'xlModal-100'
		});
		
		modalRef.componentInstance.UserId = item.userId;
		modalRef.componentInstance.Flag = Flag;
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getRegistredUser();
			}

		})

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


	addProjectFollowUp(item: any) {
		const modalRef = this.modalService.open(ProjectFollowUpAddComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
			
		});
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getCreatedProject();
			}

		})

		modalRef.componentInstance.ProjectId = item.projectId;
		modalRef.result.then(
			(result) => {
				console.log('Modal closed with:', result);
			},
			(reason) => {
				console.log('Modal dismissed with:', reason);
			}
		);
	}
	followUpHistory(item: any) {
		const modalRef = this.modalService.open(ProjectFollowUpHistoryComponent, {
			size: "lg",
			centered: true,
			fullscreen: false,
			
		});
		
		modalRef.componentInstance.ProjectId = item.projectId;
		modalRef.componentInstance.ProjectName = item.projectName;
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				this.getCreatedProject();
			}

		})

		modalRef.result.then(
			(result) => {
				console.log('Modal closed with:', result);
			},
			(reason) => {
				console.log('Modal dismissed with:', reason);
			}
		);
	}

	enqueryStatus(item:any){
		if(item.isApproved != 1){
			this.toast.showToast('Admint is not approved',ToastType.Error);
			return
		}
		const modalRef = this.modalService.open(EnquiryStatusModelComponent, {
			size: "lg",
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
	
}
