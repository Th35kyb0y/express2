import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { update } from 'lodash';
import { OtherInputsheetEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-other-inputsheet',
  templateUrl: './other-inputsheet.component.html',
  styleUrls: ['./other-inputsheet.component.scss']
})
export class OtherInputsheetComponent {
  @Input() cqrsID:number=0;
  @Input() prospectCode:string="";
  @Output() arrayEmitter = new EventEmitter<string[]>();
  otherInputsheetData: OtherInputsheetEntity;
  isCS:boolean=false;
  otherInputsheetDataTable:any[]=[];
  editOpen: boolean=false;
  constructor(private ApiService: ApiService,private _router: Router) {

    this.otherInputsheetData = new OtherInputsheetEntity();
    //this.otherInputsheetDataTable = new OtherInputsheetEntity();
  }

  ngOnInit(): void {
    this.getOtherInputsheetData();
    this.isCS=this.ApiService.getCS();

  }

  onSubmit()
  {
    this.otherInputsheetData.cqrsId=this.cqrsID;
    this.otherInputsheetData.prospectcode=this.prospectCode;
    if(this.editOpen==false)
      {
        this.otherInputsheetData.flag="INSERT";
      }
    else
    {
      this.otherInputsheetData.flag="Update";
    }
    this.ApiService.httpost(this.otherInputsheetData,'/Proposal/saveOtherInputsheet')
    .subscribe((res:any)=>{
      this.editOpen=false;
      this.otherInputsheetData = new OtherInputsheetEntity();
      this.getOtherInputsheetData();
    },(error=>{

    }))
  }

  getOtherInputsheetData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getOtherInputsheetData").subscribe(
      (response: any) => {
        console.log(JSON.stringify(response.data));
        if(response.data.cqrsId!=0)
        {
          this.otherInputsheetDataTable=response.data;
          this.sendArray();
        }
        else
        {
          this.otherInputsheetData = new OtherInputsheetEntity();
          //this.otherInputsheetDataTable = new OtherInputsheetEntity();
        }
        //this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {

    const roomNamesArray = this.otherInputsheetDataTable.map(p => p.nameOfEquipment);
    
        this.arrayEmitter.emit(roomNamesArray);
      }

  editRow(data:any)
  {

    this.editOpen=true;
    this.otherInputsheetData=data;
  }

  deleteRow(data:any)
  {
    this.otherInputsheetData=data;
    this.otherInputsheetData.flag="Delete";
    this.ApiService.httpost(this.otherInputsheetData,'/Proposal/saveOtherInputsheet')
    .subscribe((res:any)=>{
      this.otherInputsheetData = new OtherInputsheetEntity();
      this.getOtherInputsheetData();
    },(error=>{

    }))
  }
}
