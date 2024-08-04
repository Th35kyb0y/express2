// import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
// import { UpsEntity } from 'src/app/models/proposal/cqrs';
// import { ApiService } from 'src/app/services/api.service';

// @Component({
//   selector: 'app-ups',
//   templateUrl: './ups.component.html',
//   styleUrls: ['./ups.component.scss']
// })
// export class UpsComponent {
//   @Output() arrayEmitter = new EventEmitter<string[]>();
//   @ViewChild('dropdown') dropdown: ElementRef | undefined;

//   @Input() cqrsID:number=0;
//   @Input() prospectCode:string="";
//   upsData: UpsEntity;
//   upsTableData: UpsEntity[] = [];
//   options: string[] = [];
//   selectedItems: any[] = [];
//   newItem: string = '';
//   showOptions: boolean = false;

//   constructor(private ApiService: ApiService) {
//     // Create an instance of SystemFormData with initial values
    
//     this.upsData = new UpsEntity();
    
//   }
//   ngOnInit(): void {
//     this.getUpsData();
//   }

//   onSubmit()
//   {
//     this.upsData.cqrsId=this.cqrsID;
//     this.upsData.prospectcode=this.prospectCode;
//     this.upsData.roomNames=JSON.stringify(this.selectedItems);
//     this.upsData.flag="INSERT";
//     console.log(this.upsData)
//     this.ApiService.httpost(this.upsData,'/Proposal/saveUps')
//     .subscribe((res:any)=>{
//       this.getUpsData();

//     },(error=>{

//     }))
//   }

//   toggleOptions(): void {
//     this.showOptions = !this.showOptions;
//   }

//   selectItem(item: string): void {
//     if (!this.selectedItems.includes(item)) {
//       this.selectedItems.push(item);
//       this.newItem = ''; // Clear the input after selecting an item
//     }
//     this.showOptions = false;
//   }

//   removeItem(item: string): void {
//     this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
//   }

//   addItem(): void {
//     const newItem = this.newItem.trim();
//     if (newItem !== '' && !this.selectedItems.includes(newItem)) {
//       this.selectedItems.push(newItem);
//       // Add the new item to options if it doesn't exist
//       if (!this.options.includes(newItem)) {
//         this.options.push(newItem);
//       }
//       this.newItem = ''; // Clear the input after adding an item
//     }
//     this.showOptions = false;
//   }

//   @HostListener('document:click', ['$event'])
//   handleDocumentClick(event: Event): void {
//     if (this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
//       // Click occurred outside the dropdown, hide options
//       this.showOptions = false;
//     }
//   }

//   handleDropdownClick(event: Event): void {
//     // Prevent clicks inside the dropdown from closing it
//     event.stopPropagation();
//   }


//   getUpsData() {
//     this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getUpsData").subscribe(
//       (response: any) => {
//         console.log(response.data);
//         this.upsTableData=response.data;
//         this.sendArray();
//       },
//       (err) => {
//       }
//     );
//   }

//   sendArray() {
//     // Extracting roomNames from each object into a new array
// const roomNamesArray = [].concat(...this.upsTableData.map(item => JSON.parse(item.roomNames))); 
// //this.upsTableData.map(item => JSON.parse(item.roomNames));
// console.log(roomNamesArray);

//     this.arrayEmitter.emit(roomNamesArray);
//   }

//   editRow(index: number,data:any) {
//     this.upsData = new UpsEntity();
//     this.upsData=data;
//     this.selectedItems= JSON.parse(data.roomNames);
//     console.log(this.upsData)
//   }

//   update()
//   {
//     this.upsData.roomNames=JSON.stringify(this.selectedItems);
//     this.upsData.flag="Update";
//     console.log(this.upsData)
//     this.ApiService.httpost(this.upsData,'/Proposal/saveUps')
//     .subscribe((res:any)=>{
//       this.getUpsData();
//       this.upsData = new UpsEntity();
//       this.selectedItems=[];
//     },(error=>{

//     }))
//   }

//   deleteRow(index: number,data:any)
//   {
//     this.upsData=data;
//     this.upsData.flag="Delete";
//     console.log(this.upsData)
//     this.ApiService.httpost(this.upsData,'/Proposal/saveUps')
//     .subscribe((res:any)=>{
//       this.getUpsData();
//       this.upsData = new UpsEntity();
//     },(error=>{

//     }))
//   }

//   getStringArray(jsonString: string): string[] {
//     return JSON.parse(jsonString);
//   }
// }



import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild,TemplateRef,inject } from '@angular/core';
import { EPRoom, ElectricalPanelEntity,CabinetEntityEP } from 'src/app/models/proposal/cqrs';
import { EPEntity } from 'src/app/models/proposal/cqrs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BatteryBankEntity, BatteryRoom, Cabinet } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
import { ExistingProvider } from '@angular/core';

@Component({
  selector: 'app-ups',
  templateUrl: './ups.component.html',
  styleUrls: ['./ups.component.scss']
})
export class UpsComponent {
  private modalService = inject(NgbModal);
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @Output() triggerNext = new EventEmitter<string[]>();

  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @Input() cD:number=0;
  toHideAfterUpdate:boolean=false

  @Input() cqrsID:number=0;
  @Input() EquipmentType:string='';
  @Input() off:boolean=false;
  airflow:string=''
isUpdate:boolean=false

  openA : string=''
  @Input() prospectCode:string="";
  EPTableData: EPEntity=new EPEntity();
  EPData: EPEntity =new EPEntity();
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;
  modelText: string="";
  toShow:boolean=true
  objRoom: EPRoom = new EPRoom();;
  isCS:boolean=false;
  objCabinet:CabinetEntityEP = new CabinetEntityEP();
  isChecked:string="";
  showCabinet:boolean=true;
  editOpen:boolean=false;
  // @Output() arrayEmitter = new EventEmitter<string[]>();
  // @ViewChild('dropdown') dropdown: ElementRef | undefined;

  // @Input() cqrsID:number=0;
  // @Input() prospectCode:string="";
  electricalPanelTableData: ElectricalPanelEntity[] = [];
  electricalPanelData: ElectricalPanelEntity;
  // options: string[] = [];
  // selectedItems: any[] = [];
  // newItem: string = '';
  // showOptions: boolean = false;
  constructor(private ApiService: ApiService) {
    // Create an instance of SystemFormData with initial values
    
    this.electricalPanelData = new ElectricalPanelEntity();
    
  }

  ngOnInit(): void {
    this.getElectricalPanelData();
    this.isCS=this.ApiService.getCS();

  }

  // onSubmit()
  // {
  //   this.electricalPanelData.cqrsId=this.cqrsID;
  //   this.electricalPanelData.prospectcode=this.prospectCode;
  //   this.electricalPanelData.flag="INSERT";
  //   this.electricalPanelData.roomNames=JSON.stringify(this.selectedItems);
  //   console.log(this.electricalPanelData)
  //   this.ApiService.httpost(this.electricalPanelData,'/Proposal/saveElectricalPanel')
  //   .subscribe((res:any)=>{
  //     this.getElectricalPanelData();

  //   },(error=>{

  //   }))
  // }

  
  onSubmit()
  {
    this.EPData.cqrsId=this.cD;
    this.EPData.prospectcode=this.prospectCode;
    this.EPData.roomNames=JSON.stringify(this.selectedItems);
    this.EPData.flag="INSERT";
    console.log(this.EPData)
    this.ApiService.httpost(this.EPData,'/Proposal/SaveEP')
    .subscribe((res:any)=>{
this.scrollToTop()
      
      this.EPData = new EPEntity();
      this.getElectricalPanelData();
    },(error=>{

    }))
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  // selectItem(item: string): void {
  //   if (!this.selectedItems.includes(item)) {
  //     this.selectedItems.push(item);
  //     this.newItem = ''; // Clear the input after selecting an item
  //   }
  //   this.showOptions = false;
  // }
  selectItem(item: string): void {
    // 
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
      this.newItem = ''; // Clear the input after selecting an item
    }
    this.showOptions = false;
  }

//   removeItem(item: string): void {
//     this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
//   }

//   addItem(): void {
//     const newItem = this.newItem.trim();
//     if (newItem !== '' && !this.selectedItems.includes(newItem)) {
//       this.selectedItems.push(newItem);
//       // Add the new item to options if it doesn't exist
//       if (!this.options.includes(newItem)) {
//         this.options.push(newItem);
//       }
//       this.newItem = ''; // Clear the input after adding an item
//     }
//     this.showOptions = false;
//   }

//   @HostListener('document:click', ['$event'])
//   handleDocumentClick(event: Event): void {
//     if (this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
//       // Click occurred outside the dropdown, hide options
//       this.showOptions = false;
//     }
//   }

//   handleDropdownClick(event: Event): void {
//     // Prevent clicks inside the dropdown from closing it
//     event.stopPropagation();
//   }

  // getElectricalPanelData() {
  //   this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getElectricalPanelData").subscribe(
  //     (response: any) => {
  //       console.log(response.data);
  //       this.electricalPanelTableData=response.data;
  //       this.sendArray();
  //     },
  //     (err) => {
  //     }
  //   );
  // }

  getElectricalPanelData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cD, "/Proposal/getEPData").subscribe(
      (response: any) => {
        console.log(JSON.stringify(response.data));
        if(response.data.cqrsId!=0)
        {
          console.log(response.data)
          this.toShow=false
          // alert("y")
          this.EPTableData={ ...response.data };
          this.EPData={ ...response.data };
          this.EPData.EPRooms=[];
          this.sendArray();
        }
        else
        {
          // alert("n")
          this.toShow=true
          this.EPData = new EPEntity();
          this.EPTableData = new EPEntity();
        }
        //this.sendArray();
      },
      (err) => {
      }
    )
  }

//   sendArray() {
//     // Extracting roomNames from each object into a new array
// const roomNamesArray = [].concat(...this.electricalPanelTableData.map(item => JSON.parse(item.roomNames))); 
// //this.electricalPanelTableData.map(item => JSON.parse(item.roomNames));
// console.log(roomNamesArray);

//     this.arrayEmitter.emit(roomNamesArray);
//   }
//   getStringArray(jsonString: string): string[] {
//     return JSON.parse(jsonString);
//   }

//   editRow(index: number,data:any) {
//     this.electricalPanelData = new ElectricalPanelEntity();
//     this.electricalPanelData=data;
//     this.selectedItems= JSON.parse(data.roomNames);
//     console.log(this.electricalPanelData)
//   }

//   update()
//   {
//     this.electricalPanelData.roomNames=JSON.stringify(this.selectedItems);
//     this.electricalPanelData.flag="Update";
//     console.log(this.electricalPanelData)
//     this.ApiService.httpost(this.electricalPanelData,'/Proposal/saveElectricalPanel')
//     .subscribe((res:any)=>{
//       this.getElectricalPanelData();
//       this.electricalPanelData = new ElectricalPanelEntity();
//       this.selectedItems=[];
//     },(error=>{

//     }))
//   }

//   deleteRow(index: number,data:any)
//   {
//     this.electricalPanelData=data;
//     this.electricalPanelData.flag="Delete";
//     console.log(this.electricalPanelData)
//     this.ApiService.httpost(this.electricalPanelData,'/Proposal/saveElectricalPanel')
//     .subscribe((res:any)=>{
//       this.getElectricalPanelData();
//       this.electricalPanelData = new ElectricalPanelEntity();
//     },(error=>{

//     }))
//   }


removeItem(item: string): void {
  this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
}

addItem(): void {
  const newItem = this.newItem.trim();
  if (newItem !== '' && !this.selectedItems.includes(newItem)) {
    this.selectedItems.push(newItem);
    // Add the new item to options if it doesn't exist
    if (!this.options.includes(newItem)) {
      this.options.push(newItem);
    }
    this.newItem = ''; // Clear the input after adding an item
  }
  this.showOptions = false;
}

@HostListener('document:click', ['$event'])
handleDocumentClick(event: Event): void {
  if (this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
    // Click occurred outside the dropdown, hide options
    this.showOptions = false;
  }
}

handleDropdownClick(event: Event): void {
  // Prevent clicks inside the dropdown from closing it
  event.stopPropagation();
}



getBatteryBankData() {
  this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cD, "/Proposal/getBatteryBankData").subscribe(
    (response: any) => {
      console.log(JSON.stringify(response.data));
      if(response.data.cqrsId!=0)
      {
        this.EPTableData={ ...response.data };
        this.EPData={ ...response.data };
        this.EPData.EPRooms=[];
        this.sendArray();
      }
      else
      {
        this.EPData = new EPEntity();
        this.EPTableData = new EPEntity();
      }
      //this.sendArray();
    },
    (err) => {
    }
  );
}

sendArray() {

const roomNamesArray = this.EPData.epRooms.map(room => room.roomName);

  this.arrayEmitter.emit(roomNamesArray);
}

getStringArray(jsonString: string): string[] {
  return JSON.parse(jsonString);
}

editRow(index: number,data:any) {
  this.toShow=true
  this.toHideAfterUpdate=false
  this.isUpdate=true

  console.log(this.EPTableData.epRooms, " ep")
  // alert("runs")
  // this.EPData = new BatteryBankEntity();
  // this.EPData=data;
  // this.selectedItems= JSON.parse(data.roomNames);
  this.editOpen = true;
  this.objRoom=data;
  
  this.objCabinet=data.cabinets[index];
  this.objCabinet.VentilationType = this.objCabinet.ventilationType;
  // delete (this.objCabinet as any).ventilationType;

  // delete this..;
  console.log(data, "dsata for edit")
}

update()
{
  //this.EPData.roomNames=JSON.stringify(this.selectedItems);
  this.EPData.flag="Update";
  console.log(this.EPData)
  this.ApiService.httpost(this.EPData,'/Proposal/saveBatteryBank')
  .subscribe((res:any)=>{
    this.getBatteryBankData();
    this.EPData = new EPEntity();
    this.selectedItems=[];
  },(error=>{

  }))
}


deleteRow(index: number,data:any)
{
  this.EPData.epRooms.forEach((i:any)=>{
    if(i.roomName==data.roomName){
      if(i.cabinets.length==1){
        alert("now room will be deleted")
        i.isActive=false

      }
      // alert("found")

      // console.log(i, "rrrrrrrrrrrrrrr")
    }
  })
  this.objRoom=data;
  data.cabinets[index].isActive=false;
  this.objRoom.cabinets=[data.cabinets[index]];
  //this.objCabinet.isActive=false;
  this.EPData.EPRooms.push(this.objRoom);
    this.EPData.cqrsId=this.cD;
    this.EPData.prospectcode=this.prospectCode;
    console.log(this.EPData)
    this.ApiService.httpost(this.EPData,'/Proposal/saveEP')
    .subscribe((res:any)=>{
      
      this.EPData = new EPEntity();
      this.getElectricalPanelData();
    },(error=>{

    }))
  // this.EPData=data;
  // this.EPData.flag="Delete";
  // console.log(this.EPData)
  // this.ApiService.httpost(this.EPData,'/Proposal/saveBatteryBank')
  // .subscribe((res:any)=>{
  //   this.getBatteryBankData();
  //   this.EPData = new BatteryBankEntity();
  // },(error=>{

  // }))
}
cc(){
  console.log(this.EPData.epRooms.length, "al")
  console.log(this.EPData.NoOfEPRooms, "aleprooom")

  console.log(this.EPData.EPRooms.length<this.EPData.NoOfEPRooms)
}
resetType(){
  this.objCabinet.cqrsType='selected'
  this.objCabinet.volumeInMeterCube=0

}
onChange(e:string,content: TemplateRef<any>)
{
  if(e=="Lithium")
  {
    this.modelText="Sorry no solution is available in CQRS at present. Please contact ceasefire for alternatives available.";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  else if(e=="volume")
  {
    if(Number(this.objCabinet.volumeInMeterCube)>2 && this.objCabinet.cqrsType=="Direct")
    {
      this.modelText="Please select CQRS type as indirect";
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
    // else if(Number(this.objCabinet.volumeInMeterCube)<2 && this.objCabinet.cqrsType=="Indirect")
    // {
    //   this.modelText="Please select Direct system";
    //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    //     (result) => {
    //       //this.closeResult = `Closed with: ${result}`;
    //     },
    //     (reason) => {
    //       //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     },
    //   );
    // }

  }

}

tempData(e:string)
{
  this.replaceNullWithZero(this.objCabinet);
  console.log(this.objCabinet)

  if(!this.editOpen)
  {
    // alert("runs")
    console.log(this.objRoom , "rooms in 1")

    this.objRoom.cabinets.push(this.objCabinet);

    if(e=="No")
    {
    this.toShow=false
      console.log(this.objRoom , "rooms in 2")
      // alert("runs22")
      this.EPData.EPRooms.push(this.objRoom);
      this.objRoom=new EPRoom();
      this.objCabinet=new CabinetEntityEP();
      window.scrollTo({ top: 600, behavior: 'smooth' });
      //  this.EPData.epRooms=undefined
      delete (this.EPData as any).epRooms;

      console.log(this.EPData, "insering")
      this.onSubmit()
      if(this.EPData.EPRooms.length>=this.EPData.NoOfEPRooms)
      {
        this.showCabinet=false;

      }
    }
    else if(e=="Yes")
    {
      this.objCabinet=new CabinetEntityEP();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }
  else
  {

    this.EPData.flag="Update";
    console.log(this.objRoom, "/...room")
    this.objRoom.cabinets[0].VentilationType='forced'
    this.EPData.EPRooms.push(this.objRoom);
    this.scrollToTop()

    this.EPData.cqrsId=this.cD;
    this.EPData.prospectcode=this.prospectCode;
    setTimeout(() => {
      // this.editOpen=false;
      // this.EPData = new EPEntity();
    // this.getBatteryBankData();
    alert("Inputsheet Updated Successfully")
    this.toHideAfterUpdate=true

  }, 1100);
    console.log(this.objRoom, "sejnfiung..update")
    this.ApiService.httpost(this.EPData,'/Proposal/saveEP')
    .subscribe((res:any)=>{
      this.editOpen=false;
      this.EPData = new EPEntity();
      this.getBatteryBankData();
    },(error=>{

    }))
    console.log(this.EPData)
  }


}

addCabinet(content: TemplateRef<any>)
{
console.log(this.objRoom , " ....in add to grid")
    this.modelText="Add More Cabinets to this Room";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );


}

replaceNullWithZero(obj: any): void {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = 0;
    }
  }
}
scrollToTop(){
  window.scrollTo({ top: 0, behavior: 'smooth' });

}
}
