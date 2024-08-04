import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-spenco-wise',
  templateUrl: './spenco-wise.component.html',
  styleUrls: ['./spenco-wise.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class SpencoWiseComponent implements OnInit{
  List2: any = [];
  columns2: any = [];
  IsShowLoader:boolean= false; 
  filterObj:any={Spanco:''}
  constructor( public ApiService: ApiService ,

    private apiService:ApiService
  ){

  }

ngOnInit(): void {
  this.getRecord()
}
getRecord() {
  debugger
  this.IsShowLoader =  true;
  this.List2 = [];
  this.columns2 = [];

  let q = '&EmpCode='+this.apiService.getCSEmpCode()+'&flag=Spanco'
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
