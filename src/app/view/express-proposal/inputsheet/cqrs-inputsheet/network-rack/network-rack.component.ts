import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NetworkRackEntity, NetworkRoom, Rack } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-network-rack',
  templateUrl: './network-rack.component.html',
  styleUrls: ['./network-rack.component.scss']
})
export class NetworkRackComponent {
  private modalService = inject(NgbModal);
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  isUpdate:boolean=false
  toHideAfterUpdate:boolean=false

  @Input() cqrsID:number=0;
  @Input() prospectCode:string="";
  networkRackData: NetworkRackEntity;
  networkRackTableData: NetworkRackEntity;
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;
  isCS:boolean=false;
  editOpen:boolean=false;
  objRoom: NetworkRoom = new NetworkRoom();;
  objRack:Rack = new Rack();
  @Input() off:boolean=false;
  modelText: string="";
  showCabinet:boolean=true;
  constructor(private ApiService: ApiService) {
    // Create an instance of SystemFormData with initial values
    
    this.networkRackData = new NetworkRackEntity();
    this.networkRackTableData = new NetworkRackEntity();
  }
  ngOnInit(): void {
    this.getNetworkRackData();
    this.isCS=this.ApiService.getCS();

  }

  
  addCabinet(content: TemplateRef<any>)
  {

      this.modelText="Add More Rack to this Room";
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );


  }
  
  onSubmit()
  {
    this.networkRackData.cqrsId=this.cqrsID;
    this.networkRackData.prospectcode=this.prospectCode;
    this.networkRackData.flag="INSERT";
    console.log(this.networkRackData)
    this.ApiService.httpost(this.networkRackData,'/Proposal/saveNetworkRack')
    .subscribe((res:any)=>{
      
      this.networkRackData = new NetworkRackEntity();
      this.getNetworkRackData();
    },(error=>{

    }))
    // this.networkRackData.cqrsId=this.cqrsID;
    // this.networkRackData.prospectcode=this.prospectCode;
    // this.networkRackData.roomNames=JSON.stringify(this.selectedItems);
    // this.networkRackData.flag="INSERT";
    // console.log(this.networkRackData)
    // this.ApiService.httpost(this.networkRackData,'/Proposal/saveNetworkRack')
    // .subscribe((res:any)=>{
    //   this.getNetworkRackData();

    // },(error=>{

    // }))
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


  getNetworkRackData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getNetworkRackData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.networkRackTableData=response.data;
        this.sendArray();
      },
      (err) => {
      }
    );

    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getNetworkRackData").subscribe(
      (response: any) => {
        console.log(JSON.stringify(response.data));
        if(response.data.cqrsId!=0)
        {
          this.networkRackTableData={ ...response.data };
          this.networkRackData={ ...response.data };
          this.networkRackData.networkRooms=[];
          this.sendArray();
        }
        else
        {
          this.networkRackData = new NetworkRackEntity();
          this.networkRackTableData = new NetworkRackEntity();
        }
        //this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {
    const roomNamesArray = this.networkRackTableData.networkRooms.map(room => room.roomName);

    this.arrayEmitter.emit(roomNamesArray);
  }

  editRow(index: number,data:any) {
  this.isUpdate=true
  this.toHideAfterUpdate=false

    this.editOpen = true;
    this.objRoom=data;
    this.objRack=data.rack[index];
    console.log(data)
  }

  update()
  {
    // this.networkRackData.roomNames=JSON.stringify(this.selectedItems);
    // this.networkRackData.flag="Update";
    // console.log(this.networkRackData)
    // this.ApiService.httpost(this.networkRackData,'/Proposal/saveNetworkRack')
    // .subscribe((res:any)=>{
    //   this.getNetworkRackData();
    //   this.networkRackData = new NetworkRackEntity();
    //   this.selectedItems=[];
    // },(error=>{

    // }))
  }

  
  deleteRow(index: number,data:any)
  {
    this.objRoom=data;
    data.rack[index].isActive=false;
    this.objRoom.rack=[data.rack[index]];
    //this.objCabinet.isActive=false;
    this.networkRackData.networkRooms.push(this.objRoom);
      this.networkRackData.cqrsId=this.cqrsID;
      this.networkRackData.prospectcode=this.prospectCode;
      console.log(this.networkRackData)
      this.ApiService.httpost(this.networkRackData,'/Proposal/saveNetworkRack')
      .subscribe((res:any)=>{
        
        this.networkRackData = new NetworkRackEntity();
        this.getNetworkRackData();
      },(error=>{
  
      }))
  }

  getStringArray(jsonString: string): string[] {
    return JSON.parse(jsonString);
  }

  tempData(e:string)
  {
    this.replaceNullWithZero(this.objRack);
    console.log(this.objRack)

    if(!this.editOpen)
    {
      this.objRoom.rack.push(this.objRack);
      

      if(e=="No")
      {
        this.networkRackData.networkRooms.push(this.objRoom);
        this.objRoom=new NetworkRoom();
        this.objRack=new Rack();
        window.scrollTo({ top: 500, behavior: 'smooth' });
        console.log(JSON.stringify(this.networkRackData) )
        this.onSubmit()
        if(this.networkRackData.networkRooms.length>=this.networkRackData.noOfNetworkRooms)
        {
          this.showCabinet=false;
  
        }
      }
      else if(e=="Yes")
      {
        this.objRack=new Rack();
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    }
    else
    {
      this.networkRackData.flag="Update";
      this.networkRackData.networkRooms.push(this.objRoom);
      this.networkRackData.cqrsId=this.cqrsID;
      this.networkRackData.prospectcode=this.prospectCode;
      setTimeout(() => {
        // this.editOpen=false;
        // this.EPData = new EPEntity();
      // this.getBatteryBankData();
      alert("Inputsheet Updated Successfully")
      this.toHideAfterUpdate=true
  
    }, 1100);
      this.ApiService.httpost(this.networkRackData,'/Proposal/saveNetworkRack')
      .subscribe((res:any)=>{
        this.editOpen=false;
        this.networkRackData = new NetworkRackEntity();
        this.objRoom=new NetworkRoom();
        this.objRack=new Rack();
        this.getNetworkRackData();
      },(error=>{
  
      }))
      console.log(this.networkRackData)
    }


  }

  replaceNullWithZero(obj: any): void {
    for (const key in obj) {
      if (obj[key] === null) {
        obj[key] = 0;
      }
    }
  }
}

