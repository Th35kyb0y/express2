import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CsReportsModelPopUpComponent } from 'src/app/model-popups/cs/cs-new/cs-reports-model-pop-up/cs-reports-model-pop-up.component';
import { CartService } from 'src/app/services/CartService';
import { ExcelDownloadService } from 'src/app/services/ExcelDownloadService';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cs-reports',
  templateUrl: './cs-reports.component.html',
  styleUrls: ['./cs-reports.component.scss',
  '../../../../../../assets/CS/cs-new.scss'
  ],
  providers:[Location,DatePipe]
})
export class CsReportsComponent implements OnInit{
  List2: any = [];
  columns2: any = [];
  obj:any={
    todate:'',
    fromdate:'',
    EmpCode:''
  } 
  constructor(
    private router:Router,
    public ApiService: ApiService,
    private modalService: NgbModal,
    private location: Location,private CartService :CartService,
    private toast:ToastService,
    public excelDownloadService:ExcelDownloadService,
  public datepipe: DatePipe ){
    
  }
  ngOnInit(): void {
    var oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
    this.obj.todate =  this.datepipe.transform(new Date(),'yyyy-MM-dd')
    this.obj.fromdate =  this.datepipe.transform(oneYearFromNow,'yyyy-MM-dd')
    this.getRecord();
  }

  goToSearch(){
    
  }

  getRecord() {
   
    this.List2 = [];
    this.columns2 = [];
  
    let q = '&EmpCode='+this.ApiService.getCSEmpCode()+'&fromdate='+this.obj.fromdate+'&todate='+this.obj.todate
    this.ApiService.httpget(q, '/UserMaster/getCSReports').subscribe(
      (response: any) => {
        
       
      if (response.isSuccess) {
        let data:any = JSON.parse(response.data);
        if(data.length>0){
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
  
    details(item:any,cell:string){
 
      const modalRef = this.modalService.open(CsReportsModelPopUpComponent, {
        size: "xl",
        centered: true,
        fullscreen: false,
        
      });
      
      modalRef.componentInstance.EmpCode = item.EmpCode;
      modalRef.componentInstance.cell =cell;
      modalRef.componentInstance.fromdate =this.obj.fromdate;
      modalRef.componentInstance.todate =this.obj.todate;
      
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
