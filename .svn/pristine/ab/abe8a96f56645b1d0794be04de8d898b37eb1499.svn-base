import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cs-reports-model-pop-up',
  templateUrl: './cs-reports-model-pop-up.component.html',
  styleUrls: ['./cs-reports-model-pop-up.component.scss']
})
export class CsReportsModelPopUpComponent implements OnInit{
  @Input() EmpCode: string = '';
  @Input() cell: any = '';
  @Input() fromdate: any = '';
  @Input() todate: any = '';
 
  List1: any = [];
  IsShowLoader:boolean= false; 
 
	private _columns1: any = [];
	columns2: any = [];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService:ApiService) {

    }
	get columns1(){
		return this._columns1;
	}
    closeModal(msg:any) {
      this.activeModal.dismiss(msg);
     
    }
    ngOnInit(): void {
     
      this.getFirst();

    }
    goToLink(url: string) { 
      
      window.open(url, "_blank"); 
  } 
    getFirst() {
      
      this.IsShowLoader =  true;
      let obj ={
        header:this.cell,
        EmpCode :this.EmpCode,
        fromdate :this.fromdate,
        todate :this.todate,
      }
      this.apiService.httpost(obj, '/UserMaster/getCSReportsDetails').subscribe(
        (response: any) => {
          this.IsShowLoader =  false;
          if (response.isSuccess) {
            let data:any = JSON.parse(response.data);
            if(data.length>0){
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


}
