import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from 'src/app/model-popups/cs/user-registration/user-registration.component';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import { ApiService } from 'src/app/services/api.service';
import { PayUMoneyService } from 'src/app/services/pay-umoney.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import Chart from 'chart.js/auto'; 
@Component({
	selector: 'app-csdash-board-graphs',
	templateUrl: './csdash-board-graphs.component.html',
	styleUrls: ['./csdash-board-graphs.component.scss', '../../../../assets/CS/cs.css']
})
export class CSDashBoardGraphsComponent implements OnInit {
	list: any = [];
	data: any = [];
	logout() {
		window.localStorage.clear();
		window.sessionStorage.clear();
		this.router.navigate(['/']);
		setTimeout(() => {

			window.location.reload()
		}, 100);
	}
	chart: any;
	constructor(public ApiService: ApiService,
		public excelDownloadService: ExcelDownloadService,
		private router: Router,
		private modalService: NgbModal,

		private toast: ToastService,
		private pay: PayUMoneyService) { }
	ngOnInit(): void {
		this.getRegistredUser();

		this.chart = new Chart('linecanvas', {
			type: 'line',
			data: {
			  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			  datasets: [{
				label: 'Incomming/Outgoing calls',
				data: [65, 59, 80, 81, 56, 55, 40],
				borderColor: 'rgb(75, 192, 192)',
				fill: false
			  }]
			},
			options: {
			  responsive: true,
			  maintainAspectRatio: false,
			  scales: {
				x: {
				  display: true,
				  title: {
					display: true,
					text: 'Month'
				  }
				},
				y: {
				  display: true,
				  title: {
					display: true,
					text: 'Value'
				  }
				}
			  }
			}
		  });

		  let Pie = new Chart('piecanvas', {
			type: 'doughnut',
			data: {
			  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			  datasets: [{
				label: 'Incomming/Outgoing calls',
				data: [65, 59, 80, 81, 56, 55, 40],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				  ],
				  hoverOffset: 4
			  }]
			}
		  });
		  let scatter = new Chart('scattercanvas', {
			type: 'bar',
			data: {
			  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			  datasets: [{
				label: 'Order Received',
				data: [65, 59, 80, 81, 56, 55, 40],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				  ]
			  }]
			},
			options: {
				scales: {
				  y: {
					beginAtZero: true
				  }
				}
			  }
		  });
		  let polarAreacanvas = new Chart('polarAreacanvas', {
			type: 'polarArea',
			data: {
			  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			  datasets: [{
				label: 'Order Received',
				data: [65, 59, 80, 81, 56, 55, 40],
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				  ]
			  }]
			},
			options: {
				scales: {
				  y: {
					beginAtZero: true
				  }
				}
			  }
		  });
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
	downloadTemplate(type: string) {
		this.ApiService.downloadFile('&type=' + type, "/UserMaster/downloadExcel").subscribe((data: any) => {

			const currentTime = new Date();
			// Get the hours, minutes, and seconds
			const hours = currentTime.getHours();
			const minutes = currentTime.getMinutes();
			const seconds = currentTime.getSeconds();
			const formattedTime = `${hours}:${minutes}:${seconds}`;
			const fileName = 'template -' + formattedTime + '.xlsx';
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
							this.getRegistredUser();
							this.toast.showToast(response.message, ToastType.Success);
						} else {
							this.toast.showToast(response.message, ToastType.Error);
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


	getRegistredUser() {
		let obj = {
			EmpCode: this.ApiService.getCSEmpCode()
		}
		this.ApiService.httpost(obj, "/UserMaster/GetCSRegistration").subscribe(
			(response: any) => {

				if (response.isSuccess) {
					this.list = response.data;
					this.data = response.data;
				}


			},
			(err) => {
			}
		);
	}
}

