import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ServerRackEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-server-rack',
  templateUrl: './server-rack.component.html',
  styleUrls: ['./server-rack.component.scss']
})
export class ServerRackComponent {
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @ViewChild('dropdown') dropdown: ElementRef | undefined;

  @Input() cqrsID:number=0;
  @Input() prospectCode:string="";
  serverRackData: ServerRackEntity;
  serverRackTableData: ServerRackEntity[] = [];
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;

  constructor(private ApiService: ApiService) {
    // Create an instance of SystemFormData with initial values
    
    this.serverRackData = new ServerRackEntity();
    
  }
  ngOnInit(): void {
    this.getServerRackData();
  }

  onSubmit()
  {
    this.serverRackData.cqrsId=this.cqrsID;
    this.serverRackData.prospectcode=this.prospectCode;
    this.serverRackData.roomNames=JSON.stringify(this.selectedItems);
    this.serverRackData.flag="INSERT";
    console.log(this.serverRackData)
    this.ApiService.httpost(this.serverRackData,'/Proposal/saveServerRack')
    .subscribe((res:any)=>{
      this.getServerRackData();

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


  getServerRackData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getServerRackData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.serverRackTableData=response.data;
        this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {
    // Extracting roomNames from each object into a new array
const roomNamesArray = [].concat(...this.serverRackTableData.map(item => JSON.parse(item.roomNames))); 
//this.serverRackTableData.map(item => JSON.parse(item.roomNames));
console.log(roomNamesArray);

    this.arrayEmitter.emit(roomNamesArray);
  }

  editRow(index: number,data:any) {
    this.serverRackData = new ServerRackEntity();
    this.serverRackData=data;
    this.selectedItems= JSON.parse(data.roomNames);
    console.log(this.serverRackData)
  }

  update()
  {
    this.serverRackData.roomNames=JSON.stringify(this.selectedItems);
    this.serverRackData.flag="Update";
    console.log(this.serverRackData)
    this.ApiService.httpost(this.serverRackData,'/Proposal/saveServerRack')
    .subscribe((res:any)=>{
      this.getServerRackData();
      this.serverRackData = new ServerRackEntity();
      this.selectedItems=[];
    },(error=>{

    }))
  }

  deleteRow(index: number,data:any)
  {
    this.serverRackData=data;
    this.serverRackData.flag="Delete";
    console.log(this.serverRackData)
    this.ApiService.httpost(this.serverRackData,'/Proposal/saveServerRack')
    .subscribe((res:any)=>{
      this.getServerRackData();
      this.serverRackData = new ServerRackEntity();
    },(error=>{

    }))
  }
  getStringArray(jsonString: string): string[] {
    return JSON.parse(jsonString);
  }
}

