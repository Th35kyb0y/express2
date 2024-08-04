import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BatteryBankEntity, BatteryRoom, Cabinet } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-battery-bank',
  templateUrl: './battery-bank.component.html',
  styleUrls: ['./battery-bank.component.scss']
})
export class BatteryBankComponent {
  private modalService = inject(NgbModal);
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @Input() off:boolean=false;

  @Input() cqrsID:number=0;
  @Input() prospectCode:string="";
  batteryBankTableData: BatteryBankEntity;
  battaryBankData: BatteryBankEntity;
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;
  modelText: string="";

  objRoom: BatteryRoom = new BatteryRoom();;
  objCabinet:Cabinet = new Cabinet();
  isChecked:string="";
  showCabinet:boolean=true;
  editOpen:boolean=false;
  isCS:boolean=false;
 
  constructor(private ApiService: ApiService,private _router: Router) {
    // Create an instance of SystemFormData with initial values
    
    this.battaryBankData = new BatteryBankEntity();
    this.batteryBankTableData = new BatteryBankEntity();
  }

  ngOnInit(): void {
    this.getBatteryBankData();
    this.isCS=this.ApiService.getCS();
  }

  onSubmit()
  {
    this.battaryBankData.cqrsId=this.cqrsID;
    this.battaryBankData.prospectcode=this.prospectCode;
    //this.battaryBankData.roomNames=JSON.stringify(this.selectedItems);
    this.battaryBankData.flag="INSERT";
    console.log(this.battaryBankData)
    this.ApiService.httpost(this.battaryBankData,'/Proposal/saveBatteryBank')
    .subscribe((res:any)=>{
      
      this.battaryBankData = new BatteryBankEntity();
      this.getBatteryBankData();
    },(error=>{

    }))
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  selectItem(item: string): void {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
      this.newItem = ''; // Clear the input after selecting an item
    }
    this.showOptions = false;
  }

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
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getBatteryBankData").subscribe(
      (response: any) => {
        console.log(JSON.stringify(response.data));
        if(response.data.cqrsId!=0)
        {
          this.batteryBankTableData={ ...response.data };
          this.battaryBankData={ ...response.data };
          this.battaryBankData.batteryRooms=[];
          this.sendArray();
        }
        else
        {
          this.battaryBankData = new BatteryBankEntity();
          this.batteryBankTableData = new BatteryBankEntity();
        }
        //this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {

const roomNamesArray = this.batteryBankTableData.batteryRooms.map(room => room.roomName);

    this.arrayEmitter.emit(roomNamesArray);
  }

  getStringArray(jsonString: string): string[] {
    return JSON.parse(jsonString);
  }

  editRow(index: number,data:any) {
    // this.battaryBankData = new BatteryBankEntity();
    // this.battaryBankData=data;
    // this.selectedItems= JSON.parse(data.roomNames);
    this.editOpen = true;
    this.objRoom=data;
    this.objCabinet=data.cabinets[index];
    console.log(data)
  }

  update()
  {
    //this.battaryBankData.roomNames=JSON.stringify(this.selectedItems);
    this.battaryBankData.flag="Update";
    console.log(this.battaryBankData)
    this.ApiService.httpost(this.battaryBankData,'/Proposal/saveBatteryBank')
    .subscribe((res:any)=>{
      this.getBatteryBankData();
      this.battaryBankData = new BatteryBankEntity();
      this.selectedItems=[];
    },(error=>{

    }))
  }

  
  deleteRow(index: number,data:any)
  {
    this.objRoom=data;
    data.cabinets[index].isActive=false;
    this.objRoom.cabinets=[data.cabinets[index]];
    //this.objCabinet.isActive=false;
    this.battaryBankData.batteryRooms.push(this.objRoom);
      this.battaryBankData.cqrsId=this.cqrsID;
      this.battaryBankData.prospectcode=this.prospectCode;
      console.log(this.battaryBankData)
      this.ApiService.httpost(this.battaryBankData,'/Proposal/saveBatteryBank')
      .subscribe((res:any)=>{
        
        this.battaryBankData = new BatteryBankEntity();
        this.getBatteryBankData();
      },(error=>{
  
      }))
    // this.battaryBankData=data;
    // this.battaryBankData.flag="Delete";
    // console.log(this.battaryBankData)
    // this.ApiService.httpost(this.battaryBankData,'/Proposal/saveBatteryBank')
    // .subscribe((res:any)=>{
    //   this.getBatteryBankData();
    //   this.battaryBankData = new BatteryBankEntity();
    // },(error=>{

    // }))
  }

  handleLithium(scenario:any){
    if(scenario=='close'){
      this.modalService.dismissAll();
      this.battaryBankData.batteryType='';
    }
    else if(scenario=='gss'){
      this.modalService.dismissAll();
      this._router.navigate(['/eproposal', { id: 4}]);
    }
    else if(scenario=='cf rep')
    {
      this._router.navigate(['/ContactUs']);
    }
  }
  onChange(e:string,content: TemplateRef<any>)
  {
    if(this.isCS)
      {
        if(e=="Lithium")
          {
            this.modelText="Sorry no solution is available with present agent in CQRS. Look for alternative solution.";
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

  }

  tempData(e:string)
  {
    this.replaceNullWithZero(this.objCabinet);
    console.log(this.objCabinet)

    if(!this.editOpen)
    {
      this.objRoom.cabinets.push(this.objCabinet);
      

      if(e=="No")
      {
        this.battaryBankData.batteryRooms.push(this.objRoom);
        this.objRoom=new BatteryRoom();
        this.objCabinet=new Cabinet();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(JSON.stringify(this.battaryBankData) )
        this.onSubmit()
        if(this.battaryBankData.batteryRooms.length>=this.battaryBankData.noOfBatteryRooms)
        {
          this.showCabinet=false;
  
        }
      }
      else if(e=="Yes")
      {
        this.objCabinet=new Cabinet();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    else
    {
      this.battaryBankData.flag="Update";
      this.battaryBankData.batteryRooms.push(this.objRoom);
      this.battaryBankData.cqrsId=this.cqrsID;
      this.battaryBankData.prospectcode=this.prospectCode;
      this.ApiService.httpost(this.battaryBankData,'/Proposal/saveBatteryBank')
      .subscribe((res:any)=>{
        this.editOpen=false;
        this.battaryBankData = new BatteryBankEntity();
        this.getBatteryBankData();
      },(error=>{
  
      }))
      console.log(this.battaryBankData)
    }


  }

  addCabinet(content: TemplateRef<any>)
  {

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
}
