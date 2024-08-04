import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnquiryStatusModelComponent } from 'src/app/model-popups/cs/enquiry-status-model/enquiry-status-model.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cs-enquiry-in-smpstatus',
  templateUrl: './cs-enquiry-in-smpstatus.component.html',
  styleUrls: ['./cs-enquiry-in-smpstatus.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class CsEnquiryInSmpstatusComponent  implements OnInit{
  List2: any = [];
  columns2: any = [];
  IsShowLoader:boolean= false; 
  filterObj:any={Spanco:''}
  constructor( public ApiService: ApiService ,
    private modalService: NgbModal,
    private apiService:ApiService
  ){

  }

ngOnInit(): void {
  this.getRecord()
}

enqueryStatus(item:any){
 
  const modalRef = this.modalService.open(EnquiryStatusModelComponent, {
    size: "xl",
    centered: true,
    fullscreen: false,
    
  });
  
  modalRef.componentInstance.userId = item.userId;
  modalRef.componentInstance.enq_Ref = item.Enq_Ref;
  
  modalRef.result.then(
    (result) => {
      console.log('Modal closed with:', result);
    },
    (reason) => {
      console.log('Modal dismissed with:', reason);
    }
  );
}
getRecord() {
  debugger
  this.IsShowLoader =  true;
  this.List2 = [];
  this.columns2 = [];

  let q = '&EmpCode='+this.apiService.getCSEmpCode()+'&flag=EnqStatus'
  this.apiService.httpget(q, '/UserMaster/CSAssignEnquiryStatusFromSMP').subscribe(
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

  Filter(){

  }
  clear(){

  }

}
