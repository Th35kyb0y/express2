import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { PrintingMachineEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-printing-machine',
  templateUrl: './printing-machine.component.html',
  styleUrls: ['./printing-machine.component.scss']
})
export class PrintingMachineComponent {
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @ViewChild('dropdown') dropdown: ElementRef | undefined;

  @Input() cqrsID:number=0;
  @Input() prospectCode:string="";
  printingMachineData: PrintingMachineEntity;
  printingMachineTableData: PrintingMachineEntity[] = [];
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;

  constructor(private ApiService: ApiService) {
    // Create an instance of SystemFormData with initial values
    
    this.printingMachineData = new PrintingMachineEntity();
    
  }
  ngOnInit(): void {
    this.getPrintingMachineData();
  }

  onSubmit()
  {
    this.printingMachineData.cqrsId=this.cqrsID;
    this.printingMachineData.prospectcode=this.prospectCode;
    this.printingMachineData.roomNames=JSON.stringify(this.selectedItems);
    this.printingMachineData.flag="INSERT";
    console.log(this.printingMachineData)
    this.ApiService.httpost(this.printingMachineData,'/Proposal/savePrintingMachine')
    .subscribe((res:any)=>{
      this.getPrintingMachineData();

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

  getPrintingMachineData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getPrintingMachineData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.printingMachineTableData=response.data;
        this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {
    // Extracting roomNames from each object into a new array
const roomNamesArray = [].concat(...this.printingMachineTableData.map(item => JSON.parse(item.roomNames))); 
//this.printingMachineTableData.map(item => JSON.parse(item.roomNames));
console.log(roomNamesArray);

    this.arrayEmitter.emit(roomNamesArray);
  }

  editRow(index: number,data:any) {
    this.printingMachineData = new PrintingMachineEntity();
    this.printingMachineData=data;
    this.selectedItems= JSON.parse(data.roomNames);
    console.log(this.printingMachineData)
  }

  update()
  {
    this.printingMachineData.roomNames=JSON.stringify(this.selectedItems);
    this.printingMachineData.flag="Update";
    console.log(this.printingMachineData)
    this.ApiService.httpost(this.printingMachineData,'/Proposal/savePrintingMachine')
    .subscribe((res:any)=>{
      this.getPrintingMachineData();
      this.printingMachineData = new PrintingMachineEntity();
      this.selectedItems=[];
    },(error=>{

    }))
  }

  deleteRow(index: number,data:any)
  {
    this.printingMachineData=data;
    this.printingMachineData.flag="Delete";
    console.log(this.printingMachineData)
    this.ApiService.httpost(this.printingMachineData,'/Proposal/savePrintingMachine')
    .subscribe((res:any)=>{
      this.getPrintingMachineData();
      this.printingMachineData = new PrintingMachineEntity();
    },(error=>{

    }))
  }

  getStringArray(jsonString: string): string[] {
    return JSON.parse(jsonString);
  }
}

