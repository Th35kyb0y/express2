import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CncMachineEntity } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cnc-machine',
  templateUrl: './cnc-machine.component.html',
  styleUrls: ['./cnc-machine.component.scss']
})
export class CncMachineComponent {
  private modalService = inject(NgbModal);
  @ViewChild('contentCabinet') contentCabinet!: TemplateRef<any>;
  @Output() arrayEmitter = new EventEmitter<string[]>();
  @ViewChild('dropdown') dropdown: ElementRef | undefined;
  @Input() off:boolean=false
  @Input() cqrsID:number=0;
  isCS:boolean=false;

  @Input() prospectCode:string="";
  cncMachineTableData: CncMachineEntity[] = [];
  cncMachineData: CncMachineEntity;
  options: string[] = [];
  selectedItems: any[] = [];
  newItem: string = '';
  showOptions: boolean = false;
  modelText: string="";
  showCNCFields: boolean=false;


  constructor(private ApiService: ApiService) {
    // Create an instance of SystemFormData with initial values
    
    this.cncMachineData = new CncMachineEntity();
    
  }

  ngOnInit(): void {
    this.getCncMachineData();
    this.isCS=this.ApiService.getCS();

  }


  onSubmit()
  {
    this.cncMachineData.cqrsId=this.cqrsID;
    this.cncMachineData.prospectcode=this.prospectCode;
    //this.cncMachineData.roomNames=JSON.stringify(this.selectedItems);
    this.cncMachineData.flag="INSERT";
    console.log(this.cncMachineData)
    this.ApiService.httpost(this.cncMachineData,'/Proposal/saveCncMachine')
    .subscribe((res:any)=>{
      this.getCncMachineData();
      this.cncMachineData = new CncMachineEntity();
      this.modelText="Do you want to add more CNC Machine?";
      this.modalService.open(this.contentCabinet, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
          this.scrollToTop()
          
        }, 
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
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

  getCncMachineData() {
    this.ApiService.httpgetMaster("&ProspectCode="+this.prospectCode+"&cqrsId="+this.cqrsID+"", "/Proposal/getCncMachineData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.cncMachineTableData=response.data;
        this.sendArray();
      },
      (err) => {
      }
    );
  }

  sendArray() {
    const roomNamesArray = this.cncMachineTableData.map(item => item.machineName);; 
    console.log(roomNamesArray);
    this.arrayEmitter.emit(roomNamesArray);
  }

  getStringArray(jsonString: string): string[] {
    return JSON.parse(jsonString);
  }
  scrollONnext()
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  editRow(index: number,data:any) {
    this.showCNC(true)
    this.cncMachineData = new CncMachineEntity();
    
    this.cncMachineData=data;
    this.scrollONnext()
    this.cncMachineData.alarmOption='Panel'
    this.cncMachineData.alarmRequired='Yes'
this.scrollToTop()
    // this.selectedItems= JSON.parse(data.roomNames);
    console.log(this.cncMachineData)
  }

  update()
  {
    //this.cncMachineData.roomNames=JSON.stringify(this.selectedItems);
    this.cncMachineData.flag="Update";
    console.log(this.cncMachineData)
    this.ApiService.httpost(this.cncMachineData,'/Proposal/saveCncMachine')
    .subscribe((res:any)=>{
      alert("Inputsheet Updated Successfully")
    this.showCNC(false)
this.scrollToTop()
      this.getCncMachineData();
      this.cncMachineData = new CncMachineEntity();
      this.selectedItems=[];
    },(error=>{

    }))
  }

  deleteRow(index: number,data:any)
  {
    this.cncMachineData=data;
    this.cncMachineData.flag="Delete";
    console.log(this.cncMachineData)
    this.ApiService.httpost(this.cncMachineData,'/Proposal/saveCncMachine')
    .subscribe((res:any)=>{
      this.getCncMachineData();
      this.cncMachineData = new CncMachineEntity();
    },(error=>{

    }))
  }

  showCNC(e:boolean)
  {
    this.showCNCFields=e;
  }
  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
  }
}
