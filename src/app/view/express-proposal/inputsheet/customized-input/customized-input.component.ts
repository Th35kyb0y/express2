import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomizeInputsheetEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-customized-input',
  templateUrl: './customized-input.component.html',
  styleUrls: ['./customized-input.component.scss']
})
export class CustomizedInputComponent {
  private modalService = inject(NgbModal);
  @Input() ProspectCode:string ="";
  @Input() IID:number |undefined;
  customizeInputsheetData: CustomizeInputsheetEntity;
  customizeInputsheetDataTable:any[]=[];
  editOpen: boolean=false;
  selectedOption: number = 1;
  @Input() off: boolean=false;
  DocfileToUpload:any;
  objDocumentList:any;
  DocumentType: string='';
  CurrentUser: any;
  DocumentName: string='';
  isCS: boolean=false;
  constructor(private ApiService: ApiService,private _router: Router,private location: Location) {

    this.customizeInputsheetData = new CustomizeInputsheetEntity();
    const storedData = localStorage.getItem('CurrentUser');

    if (storedData !== null) {
      this.CurrentUser = JSON.parse(storedData);
    } else {

    }
  }

  ngOnInit(): void {
    this.getCustomizeInputsheetData();
    this.getAttachmentData();
    this.isCS=this.ApiService.getCS();
  }

  onSubmit()
  {
    this.customizeInputsheetData.ciId=this.IID;
    this.customizeInputsheetData.prospectcode=this.ProspectCode;
    if(this.editOpen==false)
      {
        this.customizeInputsheetData.flag="INSERT";
      }
    else
    {
      this.customizeInputsheetData.flag="Update";
    }
    this.ApiService.httpost(this.customizeInputsheetData,'/Proposal/saveCustomizeInputsheet')
    .subscribe((res:any)=>{
      this.editOpen=false;
      this.customizeInputsheetData = new CustomizeInputsheetEntity();
      this.getCustomizeInputsheetData();
    },(error=>{

    }))
  }

  editRow(data:any)
  {

    this.editOpen=true;
    this.customizeInputsheetData=data;
  }

  deleteRow(data:any)
  {
    this.customizeInputsheetData=data;
    this.customizeInputsheetData.flag="Delete";
    this.ApiService.httpost(this.customizeInputsheetData,'/Proposal/saveCustomizeInputsheet')
    .subscribe((res:any)=>{
      this.customizeInputsheetData = new CustomizeInputsheetEntity();
      this.getCustomizeInputsheetData();
    },(error=>{

    }))
  }

  updateSelection(option: number) {
    this.selectedOption = option;
  }
  togglee() {
    this.off = !this.off;
    // alert(this.off)
  }
  downloadFile(): void {


    const fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_GSS.pptx';


    const link = document.createElement('a');


    link.href = fileUrl;

    link.download = 'test';
    link.target = '_blank';
    document.body.appendChild(link);


    link.click();

    document.body.removeChild(link);
}

SaveDocument() {
  if (this.DocfileToUpload == undefined || this.DocfileToUpload == null || this.DocfileToUpload.size == 0) {

    return;
  }

  const formData = new FormData();
  formData.append("Flag", 'Insert');
  formData.append("FilesId", String(0)); 
  formData.append("FilesName", 'customizeFile');
  formData.append("FilesPath", 'path');
  formData.append("ProspectCode", String(this.ProspectCode || '')); 
  formData.append("ProductId", String(4)); 
  formData.append("IID", String(this.IID || ''));  
  formData.append("CreatedBy", String(this.ApiService.getUserId() || ''));  
  formData.append("OriginalFilesName",   this.DocumentName);
  formData.append("FileType", this.DocumentType|| '');
  formData.append("File",this.DocfileToUpload );
this.ApiService.httpostForm1('/Proposal/save', formData).subscribe({
next: (res: any) => {
  if (res?.statusCode == 200) {
    this.getAttachmentData();
    this.DocumentType='';
    this.DocfileToUpload=null;
  } else {
    alert("Failed !")
  }
},
error: (e: any) => {
  console.log("ERRRRR", e)
  
}
})


}

handleFileInput(ev:any) {
  let files: FileList  =  ev.target.files;
  this.DocfileToUpload = files.item(0);
}

getAttachmentData() {
  this.ApiService.httpgetMaster("&ProspectCode="+this.ProspectCode+"&cqrsId="+this.IID+"&ProductId=4", "/Proposal/getAttachmentData").subscribe(
    (response: any) => {
      console.log(response.data);
      this.objDocumentList=response.data;
    },
    (err) => {
    }
  );
}

FileDownload(e:any,name:string)
{
  const fileUrl = e;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

DeleteSavedFile(e:any)
{
  const formData = new FormData();

  formData.append("Flag", 'Delete');
  formData.append("FilesId", e.filesId); 
  this.ApiService.httpostForm1('/Proposal/save', formData).subscribe({
    next: (res: any) => {
      this.getAttachmentData();
      if (res?.statusCode == 200) {

      } else {
        alert("Failed !")
      }
    },
    error: (e: any) => {
      console.log("ERRRRR", e)
      
    }
  })
}

previoustab()
{
  if(this.selectedOption>0)
  {
    if(this.selectedOption==1)
      {
        this.location.back();
      }
      else
      {
        this.scroll()
        this.selectedOption--
      }
   // this.selectedOption--
  }
}

nextTab()
{
  this.scroll();
  // if(this.selectedOption===2)
  // {
  //   //this.SubmittedToDesign();
  // }
  if(this.selectedOption<3)
  {
    this.selectedOption++
  }



}

scroll()
{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

SubmitChangeStatus()
{
  
  this.ApiService.httpgetMaster("&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.ApiService.getUserId()+"&PID=13&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
    (response: any) => {
      console.log(response.data);
      const modalRef = this.modalService.open(ConfirmPopupComponent);
      modalRef.componentInstance.name = response.data[0].messageBox;
      modalRef.componentInstance.proposalCode=this.ProspectCode;
      modalRef.componentInstance.proposalType='System';
    },
    (err) => {
    }
  );

}

getCustomizeInputsheetData() {
  this.ApiService.httpgetMaster("&ProspectCode="+this.ProspectCode+"&ciId="+this.IID+"", "/Proposal/getCustomizeInputsheetData").subscribe(
    (response: any) => {
      console.log(JSON.stringify(response.data));
      if(response.data.ciId!=0)
      {
        this.customizeInputsheetDataTable=response.data;
        this.sendArray();
      }
      else
      {
        this.customizeInputsheetData = new CustomizeInputsheetEntity();
      }

    },
    (err) => {
    }
  );
}

sendArray() {

  const roomNamesArray = this.customizeInputsheetDataTable.map(p => p.nameOfEquipment);
  
      //this.arrayEmitter.emit(roomNamesArray);
    }
}
