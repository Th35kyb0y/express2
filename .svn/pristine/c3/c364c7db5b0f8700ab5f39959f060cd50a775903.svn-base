import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import { ToastService, ToastType } from 'src/app/services/toast.service';
import { CartService } from 'src/app/services/CartService';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cs-proposal',
  templateUrl: './cs-proposal.component.html',
  styleUrls: ['./cs-proposal.component.scss']
})
export class CsProposalComponent {
	list: any[] = [];
 
	filters: any = {
		proposalCode: '',
		createdBy: '',
		status: '',
		createdOn: '',
		productType: '',
		proposalRequiredDate: '',
		createdOnStart:'',
		createdOnEnd:'',
		proposalRequiredDateStart:'',
		proposalRequiredDateEnd:'',
		customerName:''
	  };
	globalFilter: string='';
  constructor(private location: Location,private CartService :CartService,private toast:ToastService,private router: Router,public ApiService: ApiService,public excelDownloadService:ExcelDownloadService) { }

  logout() {
		window.localStorage.clear();
		window.sessionStorage.clear();
		this.router.navigate(['/']);
		setTimeout(() => {
	  
		  window.location.reload()
		}, 100);
	  }
	
	  ngOnInit(): void {
		const d= this.calculateMonthRange()
		this.proposalSearchFilter.fromDate=d.firstDate
		this.proposalSearchFilter.toDate=d.lastDate
		this.getProposalData();
	  }

	  proposalSearchFilter:any={
		fromDate:'',
		toDate:'',
		status:'Pending with Design Cell'
	  }
	  getProposalData() {
		const query=`&EmpCode=${this.ApiService.getCSEmpCode()}&fromDate=${this.proposalSearchFilter.fromDate}&toDate=${this.proposalSearchFilter.toDate}&status=CS`
		this.ApiService.httpgetMaster(query, "/Proposal/getProposalDataDesign").subscribe(
		  (response: any) => {
			this.list=response.data;
			//console.log(JSON.stringify(response.data))
		  },
		  (err) => {
		  }
		);
	  }

	  calculateMonthRange(): { firstDate: string, lastDate: string } {
		let currentDate = new Date();
		let firstDate = new Date(currentDate.getFullYear(), 0, 1); 
		let lastDate = new Date(currentDate.getFullYear(), 11, 31); 
	  
		return {
		  firstDate: formatDate(firstDate, 'yyyy-MM-dd', 'en-US'),
		  lastDate: formatDate(lastDate, 'yyyy-MM-dd', 'en-US')
		};
	  }


	  get filteredList() {
		return this.list.filter(item =>
			item.customerName.toLowerCase().includes(this.filters.customerName.toLowerCase()) &&
			item.proposalCode.toLowerCase().includes(this.filters.proposalCode.toLowerCase()) &&
			item.createdBy.toLowerCase().includes(this.filters.createdBy.toLowerCase()) &&
			item.status.toLowerCase().includes(this.filters.status.toLowerCase()) &&
			(
				// Check if createdOn is within the specified range
				(!this.filters.createdOnStart || new Date(item.createdOn) >= new Date(this.filters.createdOnStart)) &&
				(!this.filters.createdOnEnd || new Date(item.createdOn) <= new Date(this.filters.createdOnEnd))
			) &&
			//item.createdOn.toLowerCase().includes(this.filters.createdOn.toLowerCase()) &&
			item.productType.toLowerCase().includes(this.filters.productType.toLowerCase()) &&
			(
				// Check if createdOn is within the specified range
				(!this.filters.proposalRequiredDateStart || new Date(item.proposalRequiredDate) >= new Date(this.filters.proposalRequiredDateStart)) &&
				(!this.filters.proposalRequiredDateEnd || new Date(item.proposalRequiredDate) <= new Date(this.filters.proposalRequiredDateEnd))
			) &&
			//item.proposalRequiredDate.toLowerCase().includes(this.filters.proposalRequiredDate.toLowerCase()) &&
			(
			  // Include global filter logic
			  this.globalFilter.trim() === '' || // If global filter is empty, return true for all items
			  // Otherwise, check if any column contains the global filter text
			  Object.values(item).some(val => val && val.toString().toLowerCase().includes(this.globalFilter.toLowerCase()))
			)
		  );
	  }

	  currentPage: number = 1; // Current page number
	  itemsPerPage: number = 10; // Number of items per page
  get totalPages(): number {
    return Math.ceil(this.filteredList.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const endIndex = this.startIndex + this.itemsPerPage;
    return endIndex > this.filteredList.length ? this.filteredList.length : endIndex;
  }
	  
  showAll(): void {
	this.itemsPerPage = this.filteredList.length;
  }
  
  async sendProposal(item: any) {

	var data:any  =  await this.getUserProfile(item);
	if(data.isSuccess){
		localStorage.setItem("userid",data.data.id);
		localStorage.setItem("profile",JSON.stringify(data.data));
		await this.CartService.AddToCardByApi();
		this.CartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
		setTimeout(() => {
			window.localStorage.setItem("previousURL", this.location.path());
			this.router.navigate(['/user/proposal', { proposalCode: item.proposalCode}]);
		}, 100);
	}else{
		this.toast.showToast(data.message,ToastType.Warning)
	}
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
showInput: { [key: string]: boolean } = {
    proposalCode: false,
    createdBy: false,
    status: false,
    createdOn: false,
    productType: false,
    proposalRequiredDate: false,
	customerName:false
  };
toggleInput(fieldName: string) {
    this.showInput[fieldName] = !this.showInput[fieldName];
  }

  backClicked(){

      this.router.navigate(['/cs']);

  }
}
