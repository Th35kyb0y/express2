import { Component, OnInit, Input, EventEmitter,TemplateRef, Output, inject } from '@angular/core';
import { FileUploadEntity, gssEntity, gssRoomEntity } from '../Inputsheet';
// import { restapiURL } from 'src/app/services/restapi-url';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-gas-suppression-system',
  templateUrl: './gas-suppression-system.component.html',
  styleUrls: ['./gas-suppression-system.component.scss']
})
export class GasSuppressionSystemComponent implements OnInit {
  private modalService = inject(NgbModal);
  @Input() ProspectCode: string='';
  @Input() IID: any;
  @Input() public ProductType: string='';
  @Input() sheetName: string='';
  @Input() off: boolean=false;
  modelText:string="";
  remarks:string=''
  isUpdate:boolean=false
  objGSSEntity: gssEntity ;
  objGSSRoomEntity: gssRoomEntity = new gssRoomEntity();
  showInert:boolean=false;
  showChemical: boolean=false;
  showCable: boolean=false;
  showDistance: boolean=false;
  CurrentUser: any;
  currentStep = 1;
roomCount:number=1
 
  CreatedByDetail: any;
  choosenRoom : string=''
  buttonValue: string='';
  editingIndex: any=null;
  CurrentPage:number=0;
  DocumentType: string='';
  DocfileToUpload:any;
  objDocumentList:any;
  weblink:string='';
  objFileUploadEntity = new FileUploadEntity;
  cities:any;
  isCS: boolean=false;
  equipmentDeatails: any[]=[];
  tankDetails: any[]=[];
  pumpDetails: any[]=[];

  constructor(private fb: FormBuilder,private api : ApiService,private http: HttpClient,private location: Location) { 
    this.objGSSEntity=new gssEntity();
    this.objGSSRoomEntity=new gssRoomEntity();
//this.objGSSEntity.productCategory='Inhouse'
    this.CurrentUser = ''
    this.CreatedByDetail = '' 
    
    const storedData = localStorage.getItem('CurrentUser');

    if (storedData !== null) {
      this.CurrentUser = JSON.parse(storedData);
    } else {
      // Handle the case where the stored data is null
    }
    //this.CustomerDetail = JSON.parse(localStorage.getItem('CustomerDetail'));
    for (const pump of this.pumps) {
      this.selectedPumps[pump] = false;
    }
  }
  ngOnInit(): void {
this.fetchCity();
    console.log(this.IID)

    this.getDataById();
    // this.BindAttachement();
    this.getAttachmentData();
    this.isCS=this.api.getCS();

    this.form = this.fb.group({
      fields: this.fb.array([])
    });
    //this.addField(); // Add one field by default

    this.formPump = this.fb.group({
      fieldsPump: this.fb.array([])
    });
    //this.addFieldPump();

    this.formTanks = this.fb.group({
      fieldsTanks: this.fb.array([])
    });
    //this.addFieldTanks();
  }

  getVolumeM3(i:any){
    return ((i.roomArea*i.roomVoid)+(i.roomArea*i.ceilingVoid)+(i.roomArea*i.floorVoid)).toFixed(2);
  }
  showInertFunction(e:any)
  {
    if(e=="Inert Gas")
    {
      this.showInert=true;
    }
    else
    {
      this.showInert=false;
    }

  }

  showChemicalFunction(e:any)
  {
    if(e=="B")
    {
      this.showChemical=true;
    }
    else
    {
      this.showChemical=false;
    }

  }

  showCableFunction(e:any)
  {
    if(e=="Yes")
    {
      this.showCable=true;
    }
    else
    {
      this.showCable=false;
    }
  }
  showDistanceFunction(e:any)
  {
    if(e=="Other location")
    {
      this.showDistance=true;
    }
    else
    {
      this.showDistance=false;
    }
  }

  addToGrid(content:any)
  {
    this.replaceNullWithZeroArr(this.form.value.fields)
    this.replaceNullWithZeroArr(this.formPump.value.fieldsPump)
    this.replaceNullWithZeroArr(this.formTanks.value.fieldsTanks)
    this.objGSSRoomEntity.equipment=this.form.value.fields;
    this.objGSSRoomEntity.pump=this.formPump.value.fieldsPump;
    this.objGSSRoomEntity.tanks=this.formTanks.value.fieldsTanks;
    this.objGSSRoomEntity.existingPump=JSON.stringify(this.selectedPumps) ;
    this.replaceNullWithZero(this.objGSSRoomEntity)
    console.log(JSON.stringify(this.objGSSRoomEntity));
    this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
    this.objGSSEntity.sheetName=this.sheetName;
    this.objGSSEntity.prospectCode=this.ProspectCode;
    this.objGSSRoomEntity.gssId=this.IID;

    this.objGSSRoomEntity.flag="Insert";
    //this.buttonValue=="Save"? "Insert":"Update";
    this.api.httpost(this.objGSSRoomEntity, "/Proposal/GSSRoomAction").subscribe(
      (data:any) => {
        if (data.statusCode === 200) {
          this.setCurrentPage(1)
          this.getDataById();
          this.objGSSRoomEntity=new gssRoomEntity();
          this.form = this.fb.group({
            fields: this.fb.array([])
          });
          this.addField(); // Add one field by default
      
          this.formPump = this.fb.group({
            fieldsPump: this.fb.array([])
          });
          this.addFieldPump();
      
          this.formTanks = this.fb.group({
            fieldsTanks: this.fb.array([])
          });
          this.addFieldTanks();
          this.scrollONnext();
        }
        else {
          alert(data.message);
        }
      });
    // console.log(this.form.value.fields);
    // console.log(this.formPump.value.fieldsPump);
    // console.log(this.formTanks.value.fieldsTanks);
    // console.log(this.selectedPumps);
    

    // this.modelText="Do you want to add details for another room?";
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    //   (result) => {
    //     //this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   },
    // );

  }
  calculateArea(){
    this.objGSSRoomEntity.roomArea=parseFloat((Number(this.objGSSRoomEntity.roomLength)*Number(this.objGSSRoomEntity.roomWidth)).toFixed(2));
  }
  update(){
    this.replaceNullWithZeroArr(this.form.value.fields)
    this.replaceNullWithZeroArr(this.formPump.value.fieldsPump)
    this.replaceNullWithZeroArr(this.formTanks.value.fieldsTanks)
    this.objGSSRoomEntity.equipment=this.form.value.fields;
    this.objGSSRoomEntity.pump=this.formPump.value.fieldsPump;
    this.objGSSRoomEntity.tanks=this.formTanks.value.fieldsTanks;
    this.objGSSRoomEntity.existingPump=JSON.stringify(this.selectedPumps) ;
    this.replaceNullWithZero(this.objGSSRoomEntity)
    console.log(JSON.stringify(this.objGSSRoomEntity));
    this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
    this.objGSSEntity.sheetName=this.sheetName;
    this.objGSSEntity.prospectCode=this.ProspectCode;
    this.objGSSRoomEntity.gssId=this.IID;

    this.objGSSRoomEntity.flag="Update";
    //this.buttonValue=="Save"? "Insert":"Update";
    this.api.httpost(this.objGSSRoomEntity, "/Proposal/GSSRoomAction").subscribe(
      (data:any) => {
        if (data.statusCode === 200) {
          this.setCurrentPage(1)
          this.getDataById();
          this.objGSSRoomEntity=new gssRoomEntity();
          this.form = this.fb.group({
            fields: this.fb.array([])
          });
          this.addField(); // Add one field by default
      
          this.formPump = this.fb.group({
            fieldsPump: this.fb.array([])
          });
          this.addFieldPump();
      
          this.formTanks = this.fb.group({
            fieldsTanks: this.fb.array([])
          });
          this.addFieldTanks();
          this.isUpdate=false
          this.scrollONnext();
        }
        else {
          alert(data.message);
        }
      });



    //    if (this.editingIndex==null)
    // {
    //   this.objGSSEntity.roomData.push(this.objGSSRoomEntity);

    // }
    // else
    // {
    //   this.objGSSEntity.roomData[this.editingIndex]=this.objGSSRoomEntity;
    //   this.editingIndex = null;
    // }

    // this.objGSSRoomEntity=new gssRoomEntity();

  }
  handleFloor(floor:string, content:any){
    // alert(this.roomCount)
if(floor=='same'){


// 

  
  if (this.roomCount % 2 === 0 && this.roomCount!=1) {
    console.log("rooNo is even");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
   
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
} 
else{
  console.log("room is odd")
  this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
  console.log(this.objGSSEntity)
  this.roomCount=this.objGSSEntity.roomData.length+1
this.objGSSRoomEntity=new gssRoomEntity();
}
  

}
else{
  this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
  console.log(this.objGSSEntity)
  this.roomCount=1
  this.objGSSRoomEntity=new gssRoomEntity();

  // this.objGSSEntity=new gssEntity()
}

  }
  handleCommonSubmit(){
    this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
    console.log(this.objGSSEntity)
    this.roomCount=this.objGSSEntity.roomData.length+1
  this.objGSSRoomEntity=new gssRoomEntity();
  }
  handleYesNo(decision:string, content:any){
    if(decision=='Yes'){
      this.modelText="";
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
          // this.handleCommonSubmit()
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
    if(decision=='No'){
      // alert("runs")
      if(this.objGSSRoomEntity.ambientTemperature == null)
        {
          this.objGSSRoomEntity.ambientTemperature=0;
        }
        if(this.objGSSRoomEntity.walkingDistance == null)
          {
            this.objGSSRoomEntity.walkingDistance=0;
          }
          if(this.objGSSRoomEntity.cableQuantity == null)
            {
              this.objGSSRoomEntity.cableQuantity=0;
              
            }
            if(this.objGSSRoomEntity.ceilingVoid == null)
              {
                this.objGSSRoomEntity.ceilingVoid=0;
                
              }
              if(this.objGSSRoomEntity.roomVoid == null)
                {
                  this.objGSSRoomEntity.roomVoid=0;
                  
                }
                if(this.objGSSRoomEntity.floorVoid == null)
                  {
                    this.objGSSRoomEntity.floorVoid=0;
                    
                  }
      this.objGSSEntity.roomData.push(this.objGSSRoomEntity);
      console.log(this.objGSSEntity)
      this.roomCount=0
  this.objGSSRoomEntity=new gssRoomEntity();
// this.SubmittedToDesign()
      // this.objGSSRoomEntity=new gssRoomEntity();
    }
  }
  SubmittedToDesign()
  {
    this.objGSSEntity.flag=this.buttonValue=="Save"? "Insert":"Update";
    //this.objGSSEntity.createdBy=this.CurrentUser.EmpCode;
    this.objGSSEntity.prospectCode=this.ProspectCode;
    this.objGSSEntity.iid=this.IID;
    this.objGSSEntity.sheetName=this.sheetName;
    this.api.httpost(this.objGSSEntity, "/Proposal/GSSAction").subscribe(
      (data:any) => {
        if (data.statusCode === 200) {
          this.setCurrentPage(1)

  
        }
        else {
          alert(data.message);
        }
      });
  }
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  getDataById()
  {
    var query1 = '&IID='+ this.IID+'&ProspectCode=' + this.ProspectCode +'&Flag=GSS' ;
    this.api.httpget(query1, '/Proposal/GSSGetDataByID').subscribe(
      (data:any) => {
        console.log(data, "gss data")
      if (data.statusCode === 200) {
        this.objGSSEntity=data.data[0];
        //this.objGSSEntity.productCategory='Inhouse'

          // this.buttonValue="Update";
          // this.objGSSEntity=JSON.parse(data.data)[0];
         // alert("runs")
          var query2 = '&IID='+ this.objGSSEntity.gssId+'&ProspectCode=' + this.ProspectCode +'&Flag=GSSRoom' ;
          this.api.httpget(query2, "/Proposal/GSSGetDataByID").subscribe(
            (data:any) => {
            //  alert("runs2")
            if (data.statusCode === 200) {
             // alert("runs3")
              this.objGSSEntity.roomData=data.data;
              console.log(this.objGSSEntity, "...rmm");
              if(this.objGSSEntity.roomData.length>0)
                {
                  for (var i = 0; i < this.objGSSEntity.roomData.length; i++) {
                    ((index) => {
                        var query3 = '&IID=' + this.objGSSEntity.roomData[index].roomId + '&ProspectCode=' + this.ProspectCode + '&Flag=Equipment';
                        this.api.httpget(query3, "/Proposal/GSSGetDataByID").subscribe(
                            (data: any) => {
                                if (data.statusCode === 200) {
                                    this.objGSSEntity.roomData[index].equipment = [];
                                    this.objGSSEntity.roomData[index].equipment = data.data;
                                }
                            }
                        );
                        var query4 = '&IID=' + this.objGSSEntity.roomData[index].roomId + '&ProspectCode=' + this.ProspectCode + '&Flag=Pump';
                        this.api.httpget(query4, "/Proposal/GSSGetDataByID").subscribe(
                            (data: any) => {
                                if (data.statusCode === 200) {
                                    this.objGSSEntity.roomData[index].pump = [];
                                    this.objGSSEntity.roomData[index].pump = data.data;
                                }
                            }
                        );
                        var query5 = '&IID=' + this.objGSSEntity.roomData[index].roomId + '&ProspectCode=' + this.ProspectCode + '&Flag=Tanks';
                        this.api.httpget(query5, "/Proposal/GSSGetDataByID").subscribe(
                            (data: any) => {
                                if (data.statusCode === 200) {
                                    this.objGSSEntity.roomData[index].tanks = [];
                                    this.objGSSEntity.roomData[index].tanks = data.data;
                                }
                            }
                        );
                    })(i);
                }
                }
            }
          });
        

      }
    });
  }
  togglee() {
    this.off = !this.off;
    // alert(this.off)
  }
  removeFromGrid(i:any,ind:any)
  {
    if(i.RoomId==undefined)
    {
      this.objGSSEntity.roomData.splice(ind,1);
    }
    else
    {
      this.objGSSEntity.flag="Delete";
      this.objGSSEntity.gssRoomId=i.RoomId;
      console.log(i.RoomId);
      
    this.api.httpost(this.objGSSEntity, "/Proposal/GSSAction").subscribe(
      (data:any) => {
        if (data.statusCode === 200) {
          var query2 = '&IID='+ this.objGSSEntity.gssId+'&ProspectCode=' + this.ProspectCode +'&Flag=GSSRoom' ;
          this.api.httpget(query2," /Proposal/GSSGetDataByID").subscribe(
            (data:any) => {
            if (data.statusCode === 200) {
              this.objGSSEntity.roomData=JSON.parse(data.data);
              console.log(this.objGSSEntity);
            }
          });
  
        }
        else {
          alert(data.Data.Message);
        }
      });
    }

  }
  getAttachmentData() {
    this.api.httpgetMaster("&ProspectCode="+this.ProspectCode+"&cqrsId="+this.IID+"&ProductId=4", "/Proposal/getAttachmentData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.objDocumentList=response.data;
      },
      (err) => {
      }
    );
  }
  editItem(e:any,index:any)
  {
    this.editingIndex=index;
    this.objGSSRoomEntity=e;
    this.selectedPumps=JSON.parse(e.existingPump);
    this.form = this.fb.group({
      fields: this.fb.array([])
    });
    e.equipment.forEach((equipment: any) => {
      const fieldGroup = this.fb.group({
        id: [equipment.id || 0, Validators.required],
        length: [equipment.length || 0, Validators.required],
        width: [equipment.width || 0, Validators.required],
        height: [equipment.height || 0, Validators.required]
      });
      this.fields.push(fieldGroup);
    });

    this.formPump = this.fb.group({
      fieldsPump: this.fb.array([])
    });
    e.pump.forEach((pump: any) => {
      const fieldGroupP = this.fb.group({
        id: [pump.id || 0, Validators.required],
        dischargeinLPM: [pump.dischargeInLPM || 0, Validators.required],
        headinMWC: [pump.headInMWC || 0, Validators.required]
      });
      this.fieldsPump.push(fieldGroupP);
    });

    this.formTanks = this.fb.group({
      fieldsTanks: this.fb.array([])
    });
    e.tanks.forEach((tank: any) => {
      const fieldGroupT = this.fb.group({
        id: [tank.id || 0, Validators.required],
        locationOfTanks: [tank.locationOfTanks || 0, Validators.required],
        CapacityOfTanks: [tank.capacityOfTanks || 0, Validators.required]
      });
      this.fieldsTanks.push(fieldGroupT);
    });


    this.scrollONnext();
    this.isUpdate=true
  }


  setCurrentPage(e:number)
  {
    this.CurrentPage=e;
  }

  SaveDocument() {
		if (this.DocfileToUpload == undefined || this.DocfileToUpload == null || this.DocfileToUpload.size == 0) {
			// this.utility.showError('Please select a file to upload!');
			return;
		}

    const formData = new FormData();
    formData.append("Flag", 'Insert');
    formData.append("FilesId", String(0));  // Convert number to string
    formData.append("FilesName", 'gssFile');
    formData.append("FilesPath", 'path');
    formData.append("ProspectCode", String(this.ProspectCode || ''));  // Convert number to string
    formData.append("ProductId", String(4));  // Convert number to string
    formData.append("IID", String(this.IID || ''));  // Convert number to string
    formData.append("CreatedBy", String(this.api.getUserId() || ''));  // Convert number to string
    formData.append("OriginalFilesName",   this.DocfileToUpload.name);
    formData.append("FileType", this.DocumentType|| '');
    formData.append("File",this.DocfileToUpload );
// Set properties of this.objFileUploadEntity in the FormData
// formData.append('Flag', 'Insert');
// formData.append('FilesId', '0');
// formData.append('FilesName', 'KSSFileName_456');
// formData.append('FilesPath', '');
// formData.append('FileType', 'GSS');
// formData.append('ProspectCode', this.ProspectCode);
// formData.append('ProductId', '2');
// formData.append('IID', this.IID);
// formData.append('CreatedBy', this.CurrentUser.EmpCode);
// formData.append('OriginalFilesName', this.DocfileToUpload.name);
// formData.append('FileType', this.DocumentType);
		
this.api.httpostForm1('/Proposal/save', formData).subscribe({
  next: (res: any) => {
    if (res?.statusCode == 200) {
      this.getAttachmentData();

    } else {
      alert("Failed !")
    }
  },
  error: (e: any) => {
    console.log("ERRRRR", e)
    
  }
})
    // this.api.httpostForm1(this.objFileUploadEntity, restAPIPath.SaveFile, this.DocfileToUpload,).then(
    //   (data:any) => {
    //     if (data.StatusCode === 200) {
    //       // JSON.parse(data.Data)
    //       //this.utility.showSuccess('Document Saved successfully');
    //        alert("File Uploaded Successfully");
    //         this.BindAttachement();


    //     }
    //     else {
    //       //alert(data.Data.Message);
    //     }
    //   });


	}

  handleFileInput(ev:any) {
		let files: FileList  =  ev.target.files;
		this.DocfileToUpload = files.item(0);
	}
  onTypeOfEqChange(e:string,content: TemplateRef<any>)
  {
   
      this.modelText="please confirm at your end chemical used can be extinguised by the agent selected  ( refer to your chemical's MSDS section 5 ) ";
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    
  }


  BindAttachement() {
    var query1 = '&FilesId=0&ProspectCode=' + this.ProspectCode + '&ProductId=2&IID=' + this.IID;
    this.api.httpget(query1, "restAPIPath.FileUploadedList").subscribe(
      (data:any) => {
      if (data.StatusCode === 200) {
        console.log(JSON.parse(data.data), "fd")
        this.objDocumentList = JSON.parse(data.data);
      }
    });
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
    formData.append("FilesId", e.filesId);  // Convert number to string
    // formData.append("FilesName", this.FileType || '');
    // formData.append("FilesPath", 'path');
    // formData.append("ProspectCode", String(this.ProspectCode || ''));  // Convert number to string
    // formData.append("ProductId", String(2));  // Convert number to string
    // formData.append("IID", String(this.cqrsID || ''));  // Convert number to string
    // formData.append("CreatedBy", String(this.ApiService.getUserId() || ''));  // Convert number to string
    // formData.append("OriginalFilesName", (this.DocfileToUpload && this.DocfileToUpload.name) || '');
    // formData.append("FileType", this.DocumentType || '');
    // formData.append("File", this.DocfileToUpload);
    // Rest of your code...
    this.api.httpostForm1('/Proposal/save', formData).subscribe({
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

SubmitChangeStatus()
{
  
  this.api.httpgetMaster("&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.api.getUserId()+"&PID=4&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
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
// }
}

selectedOption: number = 1;

updateSelection(option: number) {
  this.selectedOption = option;
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
          this.scrollONnext()
          this.selectedOption--
        }

    }

}

scrollONnext()
{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



nextTab()
{
  this.scroll();
  if(this.selectedOption===1)
    {
      this.SubmittedBasicData();
    }
  if(this.selectedOption===2)
  {
    this.SubmittedToDesign();
  }
  if(this.selectedOption<3)
  {
    this.selectedOption++
  }



}

scroll()
{
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

downloadFile(): void {

  let fileUrl='';
  if(this.isCS)
    {
      fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_GSS_WATER_WATERMIST_CUSTOMER_SUPPORT.pdf';
    }
    else
    {
      fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_GSS_WATER_WATERMIST_CUSTOMER_INPUT.pdf';
    }
    //const fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_GSS_CUSTOMER_END.pptx';

    // Create a link element
    const link = document.createElement('a');


    link.href = fileUrl;

    link.download = 'test';
    link.target = '_blank';
    document.body.appendChild(link);


    link.click();

    document.body.removeChild(link);
}

fetchCity()
{
  this.api.fetchCities().subscribe(
    (response) => {
      console.log(response);
      this.cities=response.data;
    },
    (error) => {
      console.error(error);
    }
  );
}




form!: FormGroup;





  get fields() {
    return this.form.get('fields') as FormArray;
  }

  addField() {
    const fieldGroup = this.fb.group({
      id: [0, Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required]
    });
    this.fields.push(fieldGroup);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value.fields); // Array of field values
    } else {
      console.error('Form is invalid');
    }
  }

  pumps: string[] = ['Jockey Pump', 'Main Electrical Pump', 'Diesel Pump'];
  selectedPumps: {[key: string]: boolean} = {};


  formPump!: FormGroup;
  get fieldsPump() {
    return this.formPump.get('fieldsPump') as FormArray;
  }

  addFieldPump() {
    const fieldGroupP = this.fb.group({
      id: [0, Validators.required],
      dischargeinLPM: [null, Validators.required],
      headinMWC: [null, Validators.required]
    });
    this.fieldsPump.push(fieldGroupP);
  }

  removeFieldPump(index: number) {
    this.fieldsPump.removeAt(index);
  } 


  formTanks!: FormGroup;
  get fieldsTanks() {
    return this.formTanks.get('fieldsTanks') as FormArray;
  }

  addFieldTanks() {
    const fieldGroupT = this.fb.group({
      id: [0, Validators.required],
      locationOfTanks: [null, Validators.required],
      CapacityOfTanks: [null, Validators.required]
    });
    this.fieldsTanks.push(fieldGroupT);
  }

  removeFieldTanks(index: number) {
    this.fieldsTanks.removeAt(index);
  } 

  replaceNullWithZero(obj: any): void {
    for (const key in obj) {
      if (obj[key] === null) {
        obj[key] = 0;
      }
    }
  }

   replaceNullWithZeroArr(arr: any[]): void {
    arr.forEach(obj => {
      for (const key in obj) {
        if (obj[key] === null) {
          obj[key] = 0;
        }
      }
    });
  }

  SubmittedBasicData()
  {
    this.objGSSEntity.flag=this.buttonValue=="Save"? "InsertGSS":"Update";
    this.objGSSEntity.prospectCode=this.ProspectCode;
    this.objGSSEntity.iid=this.IID;
    this.objGSSEntity.sheetName=this.sheetName;
    this.api.httpost(this.objGSSEntity, "/Proposal/GSSAction").subscribe(
      (data:any) => {
        if (data.statusCode === 200) {
          this.setCurrentPage(1)

  
        }
        else {
          alert(data.message);
        }
      });
  }

  openEq(content: TemplateRef<any>,data:any) {
    this.equipmentDeatails=data;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  openPump(content: TemplateRef<any>,data:any) {
    this.pumpDetails=data;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  openTank(content: TemplateRef<any>,data:any) {
    this.tankDetails=data;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  getTruePumps(data: string): string[] {
    if(data!="")
      {
        const parsedData = JSON.parse(data);
        return Object.keys(parsedData).filter(key => parsedData[key]);
      }
      else
      {
        return [];
      }

  }
}
