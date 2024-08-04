import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CSModelService {

  constructor(private modalService: NgbModal,
private ApiService:ApiService,
private  route :Router,
private toast:ToastService,
  ) { }


  addNewRegistration(UserId:number,type:string){
    const modalRef = this.modalService.open(UserRegistrationComponent, {
      size: "xl",
      centered: true,
      fullscreen: true,
      //windowClass: 'xlModal-100'
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      
      if (receivedEntry) {
		
        this.route.navigateByUrl("/cs/cs-my-customers");
		//window.location.reload()
        //this.getRegistredUser();
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
              this.route.navigateByUrl("/cs")
							//this.getRegistredUser();
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
}
