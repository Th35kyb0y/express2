import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveRejectAllComponent } from 'src/app/model-popups/cs/approve-reject-all/approve-reject-all.component';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { FollowUpPopUpComponent } from 'src/app/model-popups/cs/follow-up-pop-up/follow-up-pop-up.component';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { CartService } from 'src/app/services/CartService';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import { ApiService } from 'src/app/services/api.service';
import { PayUMoneyService } from 'src/app/services/pay-umoney.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cs-dashboard',
  templateUrl: './cs-dashboard.component.html',
  styleUrls: ['./cs-dashboard.component.scss',
  '../../../../assets/CS/cs.css'],
  providers:[Location]
})
export class CsDashboardComponent  implements OnInit{
	list: any = [];
	data:any = [];
	logout() {
		window.localStorage.clear();
		window.sessionStorage.clear();
		this.router.navigate(['/']);
		setTimeout(() => {
	  
		  window.location.reload()
		}, 100);
	  }
	  filterObj={
		EmpCode:'',
		companyName:'',
		email:'',
		type:'',
	  }


	  addRecord() {
		// Logic to add a record
	  }
	
	  editRecord(id: number) {
		// Logic to edit a record
	  }
	
	  deleteRecord(id: number) {
		// Logic to delete a record
	  }


	  showNavbar(toggleId:any, navId:any, bodyId:any, headerId:any){
		const toggle = document.getElementById(toggleId),
		nav = document.getElementById(navId),
		bodypd = document.getElementById(bodyId),
		headerpd = document.getElementById(headerId)
		
		// Validate that all variables exist
		if(toggle && nav && bodypd && headerpd){
		toggle.addEventListener('click', ()=>{
		 
		// show navbar
		if(nav.classList.toggle('show')){
		  var element = document.getElementsByClassName("l-navbar");
		 this.removeClass(element,"l-navbar2")
		  //element.classList.remove("l-navbar2");
		}else{
		 var element = document.getElementsByClassName("l-navbar");
		 this.addClass(element,"l-navbar2")
		  //element.classList.add("l-navbar2");
		}
		// change icon
		toggle.classList.toggle('fa-times')
		// add padding to body
		bodypd.classList.toggle('body-pd')
		// add padding to header
		headerpd.classList.toggle('body-pd')
		})
		}
		}
	  
		 addClass(elements:any, className:any) {
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (element.classList) {
					element.classList.add(className);
				} else {
					element.className += ' ' + className;
				}
			}
		}
		
		removeClass(elements:any, className:any) {
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (element.classList) {
					element.classList.remove(className);
				} else {
					element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}
		}
		   

  constructor(public ApiService: ApiService, 
		public excelDownloadService:ExcelDownloadService,
		private _location: Location, private router: Router,
		private modalService: NgbModal,
		private CartService :CartService,
		private toast:ToastService,
		private pay:PayUMoneyService) { }
		ngOnInit(): void {
			//this.showNavbar('header-toggle','nav-bar','body-pd','header')
			//this.getRegistredUser();
			this.getRegistredUserWithFilter();
			//const linkColor = document.querySelectorAll('.nav_link')
   
//    function colorLink(){

// 	debugger
//    if(linkColor){
//    linkColor.forEach(l=> l.classList.remove('active'))
//    //this.classList.add('active')
//    }
//    }
//    debugger
//    linkColor.forEach(l=> l.addEventListener('click', colorLink))
			
		}

		clear(){
			this.filterObj.companyName = '';
			this.filterObj.email = '';
			this.filterObj.type = 'Self';
			this.Filter()
		}
		Filter(){
			this.getRegistredUserWithFilter()
			// if(this.filterObj.companyName && this.filterObj.email){
			// 	this.list = this.data.filter((item:any) =>
			//   		item.email.toLowerCase().includes(this.filterObj.email.toLowerCase())
			// 		&&
			// 		  item.companyName.toLowerCase().includes(this.filterObj.companyName.toLowerCase())
			// 		);
			// }
			// else if(this.filterObj.companyName && !this.filterObj.email){
			// 	this.list = this.data.filter((item:any) =>
			//   		item.companyName.toLowerCase().includes(this.filterObj.companyName.toLowerCase())
			// 		);
			// }
			// else if(!this.filterObj.companyName && this.filterObj.email){
			// 	this.list = this.data.filter((item:any) =>
			//   		item.email.toLowerCase().includes(this.filterObj.email.toLowerCase())
			// 		);
			// }else{
			// 	this.list = this.data;
			// }
		}
		applyFilter() {
			this.list = this.data.filter((item:any) =>
			item.name
			  //item.name.toLowerCase().includes(this.filterText.toLowerCase())
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

	approveReject(item: any,Flag:string) {
		if(item.isApproved == 1){
			this.toast.showToast('Approved already',ToastType.Error);
			return
		}
		const modalRef = this.modalService.open(ApproveRejectAllComponent, {
			size: "xl",
			centered: true,
			fullscreen: true,
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


    getRegistredUserWithFilter() {
    //   let obj = {
    //     EmpCode: this.ApiService.getCSEmpCode()
    //   }
	  this.filterObj.EmpCode = this.ApiService.getCSEmpCode();
      this.ApiService.httpost(this.filterObj, "/UserMaster/GetCSRegistrationWithFilter").subscribe(
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

    getRegistredUser() {
      let obj = {
        EmpCode: this.ApiService.getCSEmpCode()
      }
      this.ApiService.httpost(obj, "/UserMaster/GetCSRegistration").subscribe(
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
}
