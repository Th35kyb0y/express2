import { Component, Input, TemplateRef, inject,Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemFormData } from 'src/app/models/proposal/cqrs';
import { FileUploadEntity } from 'src/app/models/proposal/proposal';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { Location } from '@angular/common';

interface Subcategory {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}


interface Item {
  id: number;
  label: string;
  form:string;
  description:string;
}
@Component({
  selector: 'app-cqrs-inputsheet',
  templateUrl: './cqrs-inputsheet.component.html',
  styleUrls: ['./cqrs-inputsheet.component.scss'],
})
export class CqrsInputsheetComponent {
  private modalService = inject(NgbModal);
  @Output() triggerNext = new EventEmitter<string>();
  @Input() ProspectCode:string ="";
  @Input() cqrsID:number =0;
  @Input() IID:number |undefined;
  @Input() cD:number =0;

  @Input() status:string | undefined;
  @Input() createdBy:string | undefined; 
  DocumentName: string=''
  @Input() sheetName:string | undefined;
 off:boolean=false
  receivedArray: string[] = [];
  categories: Category[] = [
    {
      name: 'Category 1',
      subcategories: [
        { id: 1, name: 'Subcategory 1.1' },
        { id: 2, name: 'Subcategory 1.2' }
      ]
    },
    {
      name: 'Category 2',
      subcategories: [
        { id: 3, name: 'Subcategory 2.1', subcategories: [{ id: 4, name: 'Subsubcategory 2.1.1' }] }
      ]
    }
    // Add more categories and subcategories as needed
  ];

  selectedCategory: Category | null = null;
  ShowtabActive:number=1;
  DocfileToUpload:any=null;
  objFileUploadEntity = new FileUploadEntity;
  systemFormData: SystemFormData;
  DocumentType:any="";
  FileType: string="";
  objDocumentList:any;
  modelText:string="";

  private currentTabIndex = 0;
  items: Item[] = [
    { id: 1, label: 'HFC-236fa' ,form: 'Gas',description:'Residue free, efficient and eco-friendly, HFC236fa is designed for fires Class A, B and C in sensitive and closed environments. It has zero ODP and good streaming property.'},
    { id: 2, label: 'HFC-227ea', form: 'Gas' ,description:'Residue free, versatile and eco-conscious, this agent excels in fire Class A, B and C fires, in sensitive and closed environments. It has zero ODP.'},
    { id: 3, label: 'HCFC-123', form: 'Gas' ,description:'Residue free, reliable and balanced, HCFC123 is suitable for Class A, B,C and electrically started fires, in sensitive and closed environments. It has very low ODP.'},
    { id: 4, label: 'FK-5-1-12' ,form: 'Foam',description:'Residue free eco-efficient and optimized, FK is the go-to agent for Class A, B,C and electrically started fires. in sensitive and closed environments It has zero ODP and GWP of less than 1.'},
    { id: 5, label: 'CO2', form: 'Gas' ,description:'Residue free, CO2 is perfect for fires Class B and C, making it ideal for high-risk enclosed spaces like  Generators, electrical panels, enclosed engine compartments etc. It has zero ODP.'},
    { id: 6, label: 'Powder', form: 'Powder' ,description:'Powerful and versatile, this agent tackles Class A, B, and C fires, electrically safe making it suitable for diverse scenarios to fight fires in all types of applications except sensitive equipment.'},
    { id: 7, label: 'Map90', form: 'Powder' ,description:''},
    { id: 8, label: 'FFF', form: 'Foam' ,description:'Designed for fires Class A and B  critical situations in fire such as Generators, engine, CNC machines etc. Environment friendly as it is free of Fluorine.'},
  ]
  selectedItem: Item | undefined = this.items.find(item => item.id === 1);
  isCS: boolean=false;

  constructor(private ApiService: ApiService,private _router: Router,private location: Location) {
    // Create an instance of SystemFormData with initial values
    this.systemFormData = new SystemFormData();

  }

  ngOnInit(): void {
    // alert(this.cD)
    // alert(this.cqrsID)
    this.getCQRSData();
    this.getAttachmentData();
    this.isCS=this.ApiService.getCS();
  }
  onChildEvent(data: any) {
    // alert("234567890")
    this.updateSelection(3)
    console.log("Event from child:", data);
    // Call any function of the parent component here
  }
  treeData = [
    {
      label: 'First',
      expanded: false,
      children: [
        {
          label: 'Second',
          expanded: false,
          children: [
            {
              label: 'Third',
              expanded: false,
              children: []
            }
          ]
        }
      ]
    }
  ];

  toggle(node: any) {
    node.expanded = !node.expanded;
  }
  downloadHelp(type:any){
    // const fileUrl = 'https://cfx.ceasefire.biz/assets/Inputsheet/Insert_ 20240424211403.html';
  
    //   // Create a link element
    //   const link = document.createElement('a');
  
    //   // Set the href attribute with the file URL
    //   link.href = fileUrl;
  
    //   // Set the download attribute with the desired file name
    //   link.download = fileUrl;
  
    //   // Append the link to the document
    //   document.body.appendChild(link);
  
      // Trigger a click event on the link
      // link.click();
  
      // // Remove the link from the document
      // document.body.removeChild(link);
      const fileUrl = 'https://medicine.umich.edu/sites/default/files/content/downloads/Behavioral-Activation-for-Depression.pdf';
  
      const link = document.createElement('a');
  
   
      link.href = fileUrl;
  
      link.download = 'Behavioral-Activation-for-Depression.pdf';
      link.target = '_blank';
  
      document.body.appendChild(link);
  
   
      link.click();
  
      document.body.removeChild(link);
  }
  onSubmit()
  {
    this.systemFormData.cqrsId=this.cqrsID;
    this.systemFormData.prospectcode=this.ProspectCode;
    this.systemFormData.flag='INSERT';
    this.systemFormData.extinguishingAgent=this.systemFormData.extinguishingAgent.label==undefined?this.systemFormData.extinguishingAgent:this.systemFormData.extinguishingAgent.label;
    console.log(this.systemFormData);
    this.ApiService.httpost(this.systemFormData,'/Proposal/saveCQRS')
    .subscribe((res:any)=>{
      this.ShowtabActive = 2
    },(error=>{

    }))
  }

  receiveArray(array: any,data:string) {
    this.receivedArray = array;
    this.FileType=data;
    console.log(this.receivedArray)
  }

  handleFileInput(ev:any) {
		let files: FileList  =  ev.target.files;
		this.DocfileToUpload = files.item(0);
	}
  onCategoryChange(categoryName: any) {
    this.selectedCategory = this.categories.find(category => category.name === categoryName.target.value) || null;
  }

  onSubcategoryChange(subcategoryName: any) {
    // Handle subcategory change if needed
  }
  togglee() {
    this.off = !this.off;
    // alert(this.off)
  }
  SaveDocument()
  {
    // alert("runs")
    if (this.DocfileToUpload == undefined || this.DocfileToUpload == null || this.DocfileToUpload.size == 0) {
			alert('Please select a file to upload!');
			return;
		}

    const formData = new FormData();

    formData.append("Flag", 'Insert');
    formData.append("FilesId", String(0));  // Convert number to string
    formData.append("FilesName", this.FileType || '');
    formData.append("FilesPath", 'path');
    formData.append("ProspectCode", String(this.ProspectCode || ''));  // Convert number to string
    formData.append("ProductId", String(2));  // Convert number to string
    formData.append("IID", String(this.cqrsID || ''));  // Convert number to string
    formData.append("CreatedBy", String(this.ApiService.getUserId() || ''));  // Convert number to string
    formData.append("OriginalFilesName", this.DocumentName || '');
    formData.append("FileType", this.DocumentType || '');
    formData.append("File", this.DocfileToUpload);
    // Rest of your code...
    this.ApiService.httpostForm1('/Proposal/save', formData).subscribe({
      
      next: (res: any) => {
        // alert("runs good")

        if (res?.statusCode == 200) {
          this.DocumentType="";
          this.DocfileToUpload=null;
          this.getAttachmentData();
        } else {
          alert("Failed !")
        }
      },
      error: (e: any) => {
    // alert("runsErr")

        console.log("ERRRRR", e)

      }
    })

  }


  getAttachmentData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.ProspectCode+"&cqrsId="+this.cqrsID+"&ProductId=2", "/Proposal/getAttachmentData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.objDocumentList=response.data;
      },
      (err) => {
      }
    );
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

  FileDownload(e:any,name:string)
  {
    const fileUrl = e;

    // Create a link element
    const link = document.createElement('a');


    link.href = fileUrl;

    link.download = name;
    link.target = '_blank';
    document.body.appendChild(link);


    link.click();

    document.body.removeChild(link);
  }

  getCQRSData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.ProspectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getCQRSData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.systemFormData=response.data[0];
      },
      (err) => {
      }
    );
  }

  submitInputsheet()
  {


    this.ApiService.httpgetMaster("&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.ApiService.getUserId()+"&PID=2&IID="+this.cqrsID+"", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        console.log(response.data);
        const modalRef = this.modalService.open(ConfirmPopupComponent);
        modalRef.componentInstance.name = response.data[0].messageBox;
        modalRef.componentInstance.proposalCode=this.ProspectCode;
        modalRef.componentInstance.proposalType='System';
        //alert(response.data[0].messageBox)
      },
      (err) => {
      }
    );
  }




  nextTab()
  {
    if(this.selectedOption===1)
    {
      this.onSubmit();
      this.scrollONnext()
    }
    if(this.selectedOption<3)
    {
      this.scrollONnext()
      this.selectedOption++
    }



  }

  selectedOption: number = 1;

  updateSelection(option: number) {
    this.selectedOption = option;
  }

  previoustab()
  {
    this.scrollONnext()
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

  onTypeOfEqChange(e:string,content: TemplateRef<any>)
  {

    if(this.systemFormData.typeOfEq=="CNC_Machine"){
      this.systemFormData.equipmentType='Closed';
    }
    if(this.isCS)
      {
        if((this.systemFormData.typeOfEq=="Battery_Bank" || this.systemFormData.typeOfEq=="Transformer"  || this.systemFormData.typeOfEq=="UPS") && e=="Open")
          {
            this.modelText="Sorry no solution is available in CQRS for open cabinets. Please enclose the cabinet before installation else see other options like Total flooding system. Do you want to get solution for total flooding system";
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
              (result) => {
                //this.closeResult = `Closed with: ${result}`;
              },
              (reason) => {
                //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              },
            );
          }
      }


  }
  handleOpen(scenario:any){
    if(scenario=='gss'){
      this.modalService.dismissAll();
      this._router.navigate(['/eproposal', { id: 4}]);
    }
    if(scenario=='cf rep'){
      this._router.navigate(['/ContactUs']);
    }
    if(scenario=='exit'){
      this.modalService.dismissAll();
      this.systemFormData.equipmentType='';
    }
  }
  onEqSelect(e:string,content: TemplateRef<any>)
  {
    if(this.isCS)
      {
        if(this.systemFormData.typeOfEq=="Fume_Hood")
          {
            // this.modelText="Note : Please Check Section 5 Of Your MSDS For Applicability Of Your Agent On Fire Classes And Attached With Your Input";
            // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            //   (result) => {
            //     //this.closeResult = `Closed with: ${result}`;
            //   },
            //   (reason) => {
            //     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //   },
            // );
          }
      else if(this.systemFormData.typeOfEq=="Network_Rack")
            {
              this.modelText="Sorry no solution is available in CQRS for open network/server rack. Please enclose them before installation else see other options like Total flooding system. Do you want to get solution for total flooding system        "
              this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                (result) => {
                  //this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                  //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                },
              );
            }
      }

  }
  downloadFile(): void {

    let fileUrl='';
    if(this.isCS)
      {
        fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_CQRS_CUSTOMER_SUPPORT.pdf';
      }
      else
      {
        fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_CQRS_CUSTOMER_INPUT.pdf';
      }
    //const fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_CQRS_CUSTOMER_END.pptx';

    // Create a link element
    const link = document.createElement('a');


    link.href = fileUrl;

    link.download = 'test';
    link.target = '_blank';
    document.body.appendChild(link);


    link.click();

    document.body.removeChild(link);
}

  emptyForm(){
    this.systemFormData.typeOfEq="selected";
    this.systemFormData.equipmentType='selected';
   this.systemFormData.extinguishingAgent="selected"
  }

  scroll()
  {
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }
  scrollONnext()
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
