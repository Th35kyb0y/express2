import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-enquiry-status-model',
  templateUrl: './enquiry-status-model.component.html',
  styleUrls: ['./enquiry-status-model.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EnquiryStatusModelComponent implements OnInit{
  @Input() userId: any = '';
  @Input() enq_Ref: any = '';
  EmpCode:string = ''
  List1: any = [];
  List2: any = [];
  IsShowLoader1:boolean= false;
  IsShowLoader:boolean= false; 
 
	private _columns1: any = [];
	columns2: any = [];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService:ApiService) {


      this.EmpCode =  this.apiService.getCSEmpCode();
    }
	get columns1(){
		return this._columns1;
	}
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
     
    }
    ngOnInit(): void {
     
      this.getFirst();
	  this.getSecound(2);
    }

    getFirst() {
      this.IsShowLoader1 =  true;
      let obj ={
        enq_Ref:this.enq_Ref,
        type:'AssignEnquiry',
        empCode :this.EmpCode,
		filterTab:1
      }
      this.apiService.httpost(obj, '/UserMaster/CSAssignEnquiryStatusByEnqId').subscribe(
        (response: any) => {
          this.IsShowLoader1 =  false;
          if (response.isSuccess) {
            let data:any = JSON.parse(response.data.response);
            if(data.length==0){
              let data2 = JSON.parse(response.data.response2);
			  this.List1 = [];
              
				if(data2.length>0){
					this._columns1 = Object.keys(data2[0])
					//this._columns1 = data2[0]
					this.List1 = data2;
				}
              	
            }else{
				//this._columns1 = data[0]
				this._columns1 = Object.keys(data[0])
                this.List1 = data;
            }
           
          } else {
  
          }
        },
        (err) => {
  
        }
      );
    }

	getSecound(filterTab:number) {
		debugger
    this.IsShowLoader =  true;
		this.List2 = [];
		this.columns2 = [];
		let obj ={
		  enq_Ref:this.enq_Ref,
		  type:'Enquiry',
		  empCode :this.EmpCode,
		  filterTab:filterTab
		}
		this.apiService.httpost(obj, '/UserMaster/CSAssignEnquiryStatusByEnqId').subscribe(
		  (response: any) => {debugger
        this.IsShowLoader =  false;
			if (response.isSuccess) {
			  let data:any = JSON.parse(response.data.response);
			  if(data.length>0){
				//this.columns2 = data[0]
				this.columns2 = Object.keys(data[0])
				this.List2 = data;
			  }
			 
			} else {
	
			}
		  },
		  (err) => {
	
		  }
		);
	  }
  
}
