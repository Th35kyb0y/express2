
import { Component, OnInit , Input , Output ,  OnChanges, SimpleChanges,inject, TemplateRef,ViewEncapsulation} from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from 'src/app/models/proposal/attachment.model';
import { AttachmentService } from 'src/app/services/attachment.service';
import { ToastService } from 'src/app/services/toast.service';
import { restapiURL } from 'src/app/services/restapi-url';
import { FileUploadEntity } from 'src/app/models/proposal/proposal';
import { FormBuilder, FormGroup, FormArray,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { PlenumDetailsModalComponent } from './plenum-details-modal/plenum-details-modal.component';
import { DuctDetailsModalComponent } from './duct-details-modal/duct-details-modal.component';
import { HoodDetailsModalComponent } from './hood-details-modal/hood-details-modal.component';
import {  EventEmitter } from '@angular/core';
import {   FormControl,  NgForm } from '@angular/forms';
import { KSSEntity, KSSDimensionofHoodEntity, KSSHoodDuctEntity } from 'src/app/models/proposal/KSS-Entity';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-kitchen-suppression-system',
  templateUrl: './kitchen-suppression-system.component.html',
  styleUrls: ['./kitchen-suppression-system.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class KitchenSuppressionSystemComponent implements OnInit {
  @Input() ProspectCode : string='';
  @Input() isView:boolean=false;
  @Input() createdOn:string='';
  plenumData :any[]=[]
  noOfp:number=0;
  isCS: boolean=false;
  toShoweqQuestion:boolean=true
  toShoweq:boolean=false
  IsDisabledP:boolean=false

  shutoffsizeK:any
  dynamicEqName : string='salamander'
  eqToUpdate:any
  userDecisionOnEq:boolean=false
  isHoodC:boolean=false
  noOfHoodsN:number=0
  hid:any[]=[]
  isEditMode: boolean = false;
  editedEquipmentIndex: number = -1;
plenumsEditing: any[] = []; 
noOfHoods : any[]=[];
hoodIDs : string[]=[];
  ductData:any[]=[]
  docName:string=''
  pt:any
  remarks:string=''
  largest:string=""
  isUpdate:boolean=false
  toHidew:boolean=false
  toHidev:boolean=false

showNewKss : boolean =false
  // @Input() MachineTransformerSystemId;
  @Input() IID: any;
  // @Input() public ProductType: string;
  kitchenForm: FormGroup;
  currentUser: any;
  showPopup: boolean = false;
  showPopupB: boolean = false;

  gridData :any[]=[];
  objFileUploadEntity = new FileUploadEntity;
hoods :any[]=[]
hoods2 :any[]=[]
kitchenHoods :any[]=[]
hoodToUpdate:number=0
  plenumForm: FormGroup;
  // submittedEquipmentList = [];
  submittedEquipmentList: any[] = [];
  ductType: string = 'rectangular';
  kitchenData : KitchenDataItem = {
    kitchenName: '',
    responsePanel: false,
    kitchenLength: "",
    kitchenWidth: "",
    kitchenHeight: "",
    suppressionSystemType: '', 
    temperatureBelow5C: '', 
    systemOperationType: '', 
    annunciationDevice: '', 
    requirementAnnunciationType: '', 
    gasShutoffValve: '', 
    requirementGasShutoffValveType: '', 
    annunciationType: '', 
    gasShutoffValveRequirement: '', 
    shutoffsizeK:"",
    kssID: 0,
    hoodIDs: '',
  ID:0,
    selectedHoods:[]
  };
  availableHoods= [
    { hoodName: 'Select',hoodType:''},

    
  ]; 
  selectedKitchenAttachment: string = '';
  selectedFileTypeAttachment: string = '';
  selectedFileAttachment: File | null = null;

  attachments: Attachment[] = [];

  
  objKitchenEquipmentEntity = {
    Side: '', 
  
    SideA: {
      CylinderPosition: 'Left',
      ManualReleasePosition: 'Left',
      CylinderRunningLength: '',
      ManualReleaseRunningLength: ''
    }
    
  
  };
  equipmentForm = {
  selectedKitchen: '',
  selectedHood: '',
  selectedProtectionType: '',
  selectedSide: '',
  equipmentList: [
    {
      action: 'plus', 
      sNo: 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    }
  ]
};




objKitchenEquipmentEntityB = {
  Side: 'Side_B', 

  SideA: {
    CylinderPosition: 'Left',
    ManualReleasePosition: 'Left',
    CylinderRunningLength: '',
    ManualReleaseRunningLength: ''
  }
  

};
equipmentFormB = {
selectedKitchen: '',
selectedHood: '',
selectedProtectionType: '',
selectedSide: 'Side_B',
equipmentList: [
  {
    action: 'plus', 
    sNo: 1,
    type: '',
    width: '',
    depth: '',
    heightSalmander: '',
    distanceFromLeftEdge: '',
    heightToSalamanderBase: '',
    largest:''
  }
]
};
kitchens:any

  // gridData : any[]=[];
  // plenums: FormArray;
  plenums: any[] = [];
  isSelectListOpen = false;
  // hoods: any[] = [];
  suppressionSystemOptions = ['KSS ENVIRO', 'KSS ULTRA (EN)', 'KSS - ULtra-X(UL)'];
  yesNoOptions = ['Yes', 'No'];
  systemOperationTypeOptions = ['ELECTRICAL OPERATED', 'MECHANICAL OPERATED'];
  annunciationDeviceOptions = this.yesNoOptions;
annunciationRequirementOptions = ['For every individual hood', 'Common for kitchen'];
  annunciationTypeOptions = ['Response panel with hooter', 'Hooter'];
  gasShutoffValveOptions = this.yesNoOptions;
  gasShutoffValveRequirementOptions = ['For every individual hood', 'Common for kitchen'];
  gasShutoffValveTypeOptions = ['ELECTRICAL', 'MECHANICAL'];


  initialValue: number | null = null;
tempHoodTypeForPlenum : string=''



  page = 1;
  pageSize = 4;
  showPage: number = 1;
  SortFocus: number = 0;
  collectionSize = 0;
  operated:string=''
  IsReverseOrder: boolean = false;
  objKSSEntity = new KSSEntity;
  objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity;
  objKSSDOHEntityList: KSSDimensionofHoodEntity[]=[];

  objKSSHoodDuctEntity:KSSHoodDuctEntity[]=[];
  objKSSHoodDuctEntityList:KSSHoodDuctEntity[]=[];
  objKSSHoodDuctEntityListForInnerGrid:KSSHoodDuctEntity[]=[];

  objFileUploadEntityList: FileUploadEntity[]=[];
  CurrentUser: any;

  @Input() public ProductType: string='';
  ShowtabActive: number = 1;

  objGSSFile: File | null = null;
  @Output('callback') callback= new EventEmitter<string>();
  list:any=[];
  CreatedByDetail: any;
  CustomerDetail: any;
  IsDisabled: boolean=false;






  constructor(private fb: FormBuilder,private location: Location ,public ApiServive: ApiService,  private attachmentService: AttachmentService, private toast:ToastService) {
    // this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
 
    const storedData = localStorage.getItem('userid');

    if (storedData !== null) {
      this.currentUser = JSON.parse(storedData);
    } else {
     
    }
        // this.CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
        const storedCreatedByDetail = localStorage.getItem('CreatedByDetail');
        this.CreatedByDetail = storedCreatedByDetail !== null ? JSON.parse(storedCreatedByDetail) : null;
        
        // For this.CustomerDetail
        const storedCustomerDetail = localStorage.getItem('CustomerDetail');
        this.CustomerDetail = storedCustomerDetail !== null ? JSON.parse(storedCustomerDetail) : null;
  this.plenumForm = this.fb.group({
   
    });
    this.plenumForm = this.fb.group({
      noOfPlenum: [{ value: null, disabled: this.IsDisabledP }, Validators.required]
    });
    this.kitchenForm = this.fb.group({
      suppressionSystemType: ['', Validators.required],
      temperatureBelow5C: ['No'],
      systemOperationType: [''],
      annunciationDevice: [''],
      requirementAnnunciationType: [''],
      gasShutoffValve: [''],
      requirementGasShutoffValveType: [''],
      hoodName: [''],
      hoodLength: [''],
      selectedHoods:[],
      hoodWidth: [''],
      hoodHeight: [''],
      hoodType: [''],
      noOfPlenum: [''],
      largestApplianceOilCap: [''],
      annunciationType: [''],
      gasShutoffValveRequirement:[''],
      ductType: ['', Validators.required],
      shutoffsizeK:[],
    
      hoods: this.fb.array([
        // this.createHoodFormGroup()
      ])
    });
    const hoodsControl = this.kitchenForm.get('hoods');

    if (hoodsControl instanceof FormArray) {
      const hoodsControls = (hoodsControl as FormArray).controls;
    this.hoods=hoodsControls
    console.log(this.hoods, "....hodddss")
    } else {

    }

  }
 
  
  ngOnInit(): void {

    this.getHoods()
    this.isCS=this.ApiServive.getCS();

    this.getEquipments()
    this.getAttachmentData()
    this.getRemarks()
this.showNewKss=true
this.kitchens = this.gridData.map((item:any) => item.kitchenName);
// this.kitchenForm.get('temperatureBelow5C')?.value=false/
this.kitchenForm.get('temperatureBelow5C')?.setValue('No');

  }

  isDuplicateKitchen(selectedKitchen: string, currentIndex: number): boolean {
    // Find the index of the first occurrence of selectedKitchen
    const firstIndex = this.submittedEquipmentList2.findIndex(equipment => equipment.selectedKitchen === selectedKitchen);
    // If the current index is not the same as the first occurrence index, it's a duplicate
    return currentIndex !== firstIndex;
  }
  


  setDynamicEqName(e:any){
    this.dynamicEqName=String(e.target.value).toLowerCase()
  }
  getRemarks(){
    let q="&iid="+this.IID
    this.ApiServive.httpgetMaster(q, "/Proposal/getRemarks").subscribe((i:any)=>{
      console.log(i, "/////rtyu")
      this.remarks=JSON.parse(i.data)[0].remarks
    })
  }
  toggleDisable() {
    this.IsDisabledP = !this.IsDisabledP;
    if (this.IsDisabledP) {
      this.plenumForm.get('noOfPlenum')?.disable();
    } else {
      this.plenumForm.get('noOfPlenum')?.enable();
    }
  }
  resetGrid(){
    // this.kitchenForm?.reset(); 
    const suppressionSystemType =this.kitchenForm.get('suppressionSystemType')?.value;
    this.kitchenForm.reset(); // Reset the whole form
    this.kitchenForm.patchValue({ suppressionSystemType });
    this.kitchenForm.get('temperatureBelow5C')?.setValue('No');

  }


  onPlenumTypeChange(newPlenumType: Event): void {
    const hoodsArray = this.kitchenForm.get('hoods') as FormArray;
  }

  initializeHoodsArray(numHoods: any, isInp:boolean) {
    let nh
    if(isInp){
    nh = Number(numHoods.target.value)
      
    }
    else{
      nh=Number(numHoods)
    }
    const hoodsArray = this.kitchenForm.get('hoods') as FormArray;
    const plArray = hoodsArray.get('plenum') as FormArray;

    hoodsArray.clear(); // Clear existing hoods
    for (let i = 0; i < nh; i++) {
      this.noOfHoods.push(this.createHoodFormGroup())
      hoodsArray.push(this.createHoodFormGroup());

    }
  }
  onSubmitEquipmentDetails() {
    this.submittedEquipmentList = [];
// console.log()
    const submittedEquipment = {
      selectedKitchen: this.equipmentForm.selectedKitchen,
      selectedHood: this.equipmentForm.selectedHood,
      protectionType: this.equipmentForm.selectedProtectionType,
      Side: 'Side_A',
      equipmentList: this.equipmentForm.equipmentList.map(equipment => ({ ...equipment })),
  
      objKitchenEquipmentEntity: {
        Side: 'Side_A',
        SideA: {
          CylinderPosition: this.objKitchenEquipmentEntity.SideA.CylinderPosition,
          ManualReleasePosition: this.objKitchenEquipmentEntity.SideA.ManualReleasePosition,
          CylinderRunningLength: this.objKitchenEquipmentEntity.SideA.CylinderRunningLength,
          ManualReleaseRunningLength: this.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength,
        }
      }
    };
    console.log(submittedEquipment)

    this.submittedEquipmentList.push(submittedEquipment)
    const originalEQarray = this.deepCopyArray(this.submittedEquipmentList);
    console.log(originalEQarray, "original")
    let dataTosend=[]
    dataTosend.push(originalEQarray[0])
 
   dataTosend[0].equipmentList=originalEQarray[0].equipmentList[0]
   dataTosend[0].objKitchenEquipmentEntity=originalEQarray[0].objKitchenEquipmentEntity.SideA
dataTosend[0].KssID=this.IID
this.submittedEquipmentList[0].KssID=this.IID
console.log(this.submittedEquipmentList, "listytt")
// for (let index = 0; index < this.submittedEquipmentList[0].equipmentList.length; index++) {
//   alert(this.submittedEquipmentList[0].equipmentList.length +" inside fitrst loop")
//   let elementEQ = this.submittedEquipmentList[0].equipmentList[index];
//   console.log("runs1")
//   elementEQ=this.submittedEquipmentList[0].equipmentList[index]
//   console.log("runs2")

//   // console.log(element , "loppppppooiopp")
//   for (let indexx = 0; indexx < this.submittedEquipmentList.length; indexx++) {
//   alert(indexx +" inside second loop")
//   console.log("runs3")

//     const element = this.submittedEquipmentList[indexx];
//   console.log("runs5")

//     element.equipmentList=elementEQ
//   console.log("runs4")

//     console.log(element , "inside for loop")
//   }
  
// }

  // Creating copies
  const copies = this.createCopies(this.submittedEquipmentList[0]);
  
  console.log(copies , "copiessssssssss");

  for (let index = 0; index < copies.length; index++) {
    const element = copies[index];
    this.ApiServive.httpost(element, "/Proposal/InsertKssEquipment").subscribe((data)=>{
      this.getEquipments()
      //
      
      })
  }
 if(this.equipmentFormB.equipmentList.length>0||this.objKitchenEquipmentEntityB.SideA.CylinderRunningLength!='' ){
  if(this.equipmentFormB.equipmentList[0].type!=''){
    // this.onAddEquipmentB()
    alert("rr")
    this.onSubmitEquipmentDetailsB()
  }
 }
    this.equipmentForm.equipmentList = [{
      action: 'plus',
      sNo: 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    }];
    alert("Equipment added successfully")
    this.equipmentForm.selectedSide='0'
    this.equipmentForm.selectedKitchen='0'
    this.equipmentForm.selectedHood='0'
    this.equipmentForm.selectedProtectionType='0'

  }


  onSubmitEquipmentDetailsB() {
    this.submittedEquipmentList = [];
// console.log()
    const submittedEquipment = {
      selectedKitchen: this.equipmentForm.selectedKitchen,
      selectedHood: this.equipmentForm.selectedHood,
      protectionType: this.equipmentForm.selectedProtectionType,
      Side: 'Side_B',

      equipmentList: this.equipmentFormB.equipmentList.map(equipment => ({ ...equipment })),
  
      objKitchenEquipmentEntity: {
        Side: this.objKitchenEquipmentEntityB.Side,
        SideA: {
          CylinderPosition: this.objKitchenEquipmentEntityB.SideA.CylinderPosition,
          ManualReleasePosition: this.objKitchenEquipmentEntityB.SideA.ManualReleasePosition,
          CylinderRunningLength: this.objKitchenEquipmentEntityB.SideA.CylinderRunningLength,
          ManualReleaseRunningLength: this.objKitchenEquipmentEntityB.SideA.ManualReleaseRunningLength,
        }
      }
    };
    console.log(submittedEquipment)

    this.submittedEquipmentList.push(submittedEquipment)
    const originalEQarray = this.deepCopyArray(this.submittedEquipmentList);
    console.log(originalEQarray, "original")
    let dataTosend=[]
    dataTosend.push(originalEQarray[0])
 
   dataTosend[0].equipmentList=originalEQarray[0].equipmentList[0]
   dataTosend[0].objKitchenEquipmentEntity=originalEQarray[0].objKitchenEquipmentEntity.SideA
dataTosend[0].KssID=this.IID
this.submittedEquipmentList[0].KssID=this.IID
console.log(this.submittedEquipmentList, "listytt")
// for (let index = 0; index < this.submittedEquipmentList[0].equipmentList.length; index++) {
//   alert(this.submittedEquipmentList[0].equipmentList.length +" inside fitrst loop")
//   let elementEQ = this.submittedEquipmentList[0].equipmentList[index];
//   console.log("runs1")
//   elementEQ=this.submittedEquipmentList[0].equipmentList[index]
//   console.log("runs2")

//   // console.log(element , "loppppppooiopp")
//   for (let indexx = 0; indexx < this.submittedEquipmentList.length; indexx++) {
//   alert(indexx +" inside second loop")
//   console.log("runs3")

//     const element = this.submittedEquipmentList[indexx];
//   console.log("runs5")

//     element.equipmentList=elementEQ
//   console.log("runs4")

//     console.log(element , "inside for loop")
//   }
  
// }

  // Creating copies
  const copies = this.createCopies(this.submittedEquipmentList[0]);
  
  console.log(copies , "copiessssssssss");

  for (let index = 0; index < copies.length; index++) {
    const element = copies[index];
    this.ApiServive.httpost(element, "/Proposal/InsertKssEquipment").subscribe((data)=>{
      this.getEquipments()
      // alert("Equipment added successfully")
      })
  }
 
    this.equipmentFormB.equipmentList = [{
      action: 'plus',
      sNo: 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    }];

    this.equipmentFormB.selectedSide='0'


  }

  createCopies(originalObj:any) {
    let copies:any[] = [];
    originalObj.equipmentList.forEach((item:any) => {
      const copy = { ...originalObj, 
        equipmentList: { ...item } ,
        objKitchenEquipmentEntity:originalObj.objKitchenEquipmentEntity.SideA


      };
      copies.push(copy);
    });
    return copies;
  }
  


  onUpdateEquipmentDetails() {
    this.submittedEquipmentList = [];
// console.log(this.equipmentForm.equipmentList)
    const submittedEquipment = {
      selectedKitchen: this.equipmentForm.selectedKitchen,
      selectedHood: this.equipmentForm.selectedHood,
      protectionType: this.equipmentForm.selectedProtectionType,
      equipmentList: this.equipmentForm.equipmentList.map(equipment => ({ ...equipment })),
  
      objKitchenEquipmentEntity: {
        Side: this.objKitchenEquipmentEntity.Side,
        SideA: {
          CylinderPosition: this.objKitchenEquipmentEntity.SideA.CylinderPosition,
          ManualReleasePosition: this.objKitchenEquipmentEntity.SideA.ManualReleasePosition,
          CylinderRunningLength: this.objKitchenEquipmentEntity.SideA.CylinderRunningLength,
          ManualReleaseRunningLength: this.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength,
        }
      }
    };

    this.submittedEquipmentList.push(submittedEquipment)
    const originalEQarray = this.deepCopyArray(this.submittedEquipmentList);
    let dataTosend=[]
    dataTosend.push(originalEQarray[0])
 
   dataTosend[0].equipmentList=originalEQarray[0].equipmentList[0]
   dataTosend[0].objKitchenEquipmentEntity=originalEQarray[0].objKitchenEquipmentEntity.SideA
dataTosend[0].KssID=this.IID
dataTosend[0].id=this.eqToUpdate.id
console.log(dataTosend[0])


this.ApiServive.httpost(dataTosend[0], "/Proposal/UpdateKssEquipment").subscribe((data)=>{
this.getEquipments()
}) 
    this.equipmentForm.equipmentList = [{
      action: 'plus',
      sNo: 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    }];

  }

  submitForm() {
    if (this.kitchenForm.valid) {
      // Perform actions with the form data, e.g., send to the server
      // console.log('Form submitted:', this.kitchenForm.value);
    } else {
      // Handle form validation errors
      // console.log('Form has validation errors.');
    }
  }
  onFileChangeAttachment(event: any): void {
    this.selectedFileAttachment = event.target.files[0] as File;
  }

  
  setFocus(ctrlNo: number) {
    this.SortFocus = ctrlNo;
    if (this.IsReverseOrder == true) {
      this.IsReverseOrder = false;
    }
    else {
      this.IsReverseOrder = true;
    }
  }

  BindKSSList() {
    var query1 = '&ProductId=1&ProspectCode=' + this.ProspectCode+'&IID='+this.IID;
    this.ApiServive.httpget(query1, "Proposal/KSSGetList").subscribe((data :any) => {
      if (data.Status === true) {
        if (data.Data != null)
          this.objKSSEntity = data.Data;
          let tempArr=this.objKSSEntity.ProtectAllEquipment.split(',');
          this.list.forEach((element :any) => {
            if(tempArr.find(a=>a==element.id))
            element.checked=true;
            else
            element.checked=false;
          });
          if(!this.objKSSEntity.IsActive){
            this.IsDisabled=true;
            return;
          }

          if(this.objKSSEntity.Status==='Pending with Design Cell' || this.objKSSEntity.Status==='Pending with Sales Admin' || this.objKSSEntity.Status==='Pending with Design Head'){
          this.IsDisabled=true;
          }else{
            this.IsDisabled=false;
          }
      }
    });
  }

  KSSSaveAction() {
    if (this.objKSSEntity.KitchenType == '0') {
      return;
    }
    let dataList=this.list.filter((item:any)=>item.checked===true);
    let b=Array.prototype.map.call(dataList, function(item) { return item.id; }).join(",");
    this.objKSSEntity.ProtectAllEquipment=Object.keys(dataList).map(function(k){return dataList[k].id}).join(",");
    this.objKSSEntity.Flag = 'Insert';
    this.objKSSEntity.ProspectCode = this.ProspectCode;
    this.objKSSEntity.ProductId = 1;
    this.objKSSEntity.CustomerTypeId = "1";    
    this.objKSSEntity.CustomerCode = this.CustomerDetail.CustomerCode;
    this.objKSSEntity.CreatedBy = this.CreatedByDetail.CreatedBy;
    this.objKSSEntity.ProductType = 'Normal';
    this.objKSSEntity.LPGShuttoff = 'Test';
    this.objKSSEntity.DescriptionOfRisk = 'na';
    this.objKSSEntity.DetailsOfDesigner = 'na';
    this.objKSSEntity.KSSId = this.IID;
    this.ApiServive.httpost(this.objKSSEntity, "Proposal/KSSGetList").subscribe(
      (data:any) => {
        if (data.Status === true) {
          this.objKSSEntity.KSSId = data.Data.PageId;
          //this.toast.showError(data.Data.MessageBox); 
        }
        else {
          //this.toast.showError(data.Data.Message);
        }
      });
    this.ShowtabActive = 3;
  }

 
  AddHoods() {
    if (this.objKSSDOHEntityList.length < this.objKSSEntity.NoOfHoods) {
      if (this.objKSSDimensionofHoodEntity.NameofHood == undefined) {
        // this.toast.showError('Name of hood is require.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHLength == undefined) {
        // this.toast.showError('Length is require.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHWidth == undefined) {
        // this.toast.showError('Width is require.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHHeight == undefined) {
        // this.toast.showError('Height is require.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.NoOfDucts == undefined) {
        // this.toast.showError('No. of ducts is require.','Error')
        return;
      }
      // if (this.objKSSDimensionofHoodEntity.Typeofducts == undefined) {
      //   this.toast.showError('Type of ducts is require.','Error')
      //   return;
      // }
 
      if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
        this.objKSSDimensionofHoodEntity.Flag = 'Insert';
        this.objKSSDimensionofHoodEntity.ProductId = 1;
        // this.objKSSDimensionofHoodEntity.KSSId = this.IID;
        this.objKSSDimensionofHoodEntity.IID = this.IID;
        this.objKSSDimensionofHoodEntity.ProspectCode = this.ProspectCode;
        this.ApiServive.httpost(this.objKSSDimensionofHoodEntity, "Proposal/KSSDimensionofHoodAction").subscribe(
          (data :any) => {
            if (data.Status === true) {
              //this.toast.showError(data.Data.MessageBox);
              this.BindKSSDimensionofHoodList();
            }
            else {
              //this.toast.showError(data.Data.Message);
            }
          });
        //this.objKSSDOHEntityList.push(this.objKSSDimensionofHoodEntity);
        this.objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity();
      }
    }
    else {
      // this.toast.showError('No of Hood is more than your input','Error');
    }
  }

  DeleteHoods(item:any) {
    if (confirm('Are you sure to delete this item?')) {
      console.log(item)
      let id = item.hoodID
this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deleteHood").subscribe(
  (response: any) => {
   this.getHoods()
  },
  (err) => {
  }
);
    }

  }
  deletePlenum(item:any) {
    if (confirm('Are you sure to delete this item?')) {
      console.log(item)
      let id = item.plenumID      
this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deletePlenum").subscribe(
  (response: any) => {
   this.getHoods()
  },
  (err) => {
  }
);
    }

  }

  deleteDuctt(item:any) {
    if (confirm('Are you sure to delete this item?')) {
      console.log(item)
      let id = item.ductID      
this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deleteDuct").subscribe(
  (response: any) => {
   this.getHoods()
  },
  (err) => {
  }
);
    }

  }

  

  deleteDuct(item:any) {
    if (confirm('Are you sure to delete this item?')) {
      console.log(item)
      let id = item.hoodID
// this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deleteHood").subscribe(
//   (response: any) => {
//    this.getHoods()
//   },
//   (err) => {
//   }
// );
    }

  }

  BindKSSDimensionofHoodList() {
    
    var query1 = '&ProductId=1&ProspectCode=' + this.ProspectCode+'&IID='+this.IID;
    this.ApiServive.httpget(query1, "restapiURL.KSSDimensionofHoodList").subscribe((data:any) => {
      if (data.Status === true) {
        this.objKSSDOHEntityList = data.Data;
        if (this.objKSSDOHEntityList != undefined && this.objKSSDOHEntityList != null && this.objKSSDOHEntityList.length > 0) {
          for (var i = 0; i < this.objKSSDOHEntityList.length; i++) {
            var KSSDuctList = this.objKSSHoodDuctEntityListForInnerGrid.filter(e => e.NameOfHood == this.objKSSDOHEntityList[i].NameofHood);
            this.objKSSDOHEntityList[i].objKSSHoodDuctEntityList = KSSDuctList;
          }
        }
         this.BindDuctsList();
      }
    });
  }



  AddDucts() {
    // if (this.objKSSHoodDuctEntityList.length < this.objKSSDimensionofHoodEntity.NoOfDucts) {
    //   // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
    //   //   alert('Name of hood is require.');
    //   //   return;
    //   // }
    //   if (this.objKSSHoodDuctEntity?.TypeOfDuct == undefined) {
    //     alert('Type of ducts is require.')
    //     return;
    //   }
    //   else if(this.objKSSHoodDuctEntity.TypeOfDuct=='Circular'){
    //   if (this.objKSSHoodDuctEntity.DuctsDiameter == undefined) {
    //     alert('Duct Diameter is require.');
    //     return;
    //   }
    // }
    //   else if(this.objKSSHoodDuctEntity.TypeOfDuct=='Rectangular'){
    //     if (this.objKSSHoodDuctEntity.DuctsLength == undefined) {
    //       alert('Duct Length is require.');
    //       return;
    //     }
    //     if (this.objKSSHoodDuctEntity.DuctsWidth == undefined) {
    //       alert('Duct Width is require.');
    //       return;
    //     }
      
      // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
    
  }


  DeleteDucts(item:any) {
    if (confirm('Are you sure to delete this item.')) {
      // this.objKSSHoodDuctEntity.Flag = 'Delete';
      // this.objKSSHoodDuctEntity.DuctId = item.DuctId;
      // this.objKSSHoodDuctEntity.NameOfHood = 'Test'
      // this.objKSSHoodDuctEntity.NoOfDuct = Number(1);
      // this.objKSSHoodDuctEntity.ProspectCode = this.ProspectCode;
      // this.ApiServive.httpost(this.objKSSHoodDuctEntity, restapiURL.KSSDuctAction).subscribe(
      //   data => {
      //     if (data.Status === true) {
      //       this.BindDuctsList();
      //     }         
      //   });
      // this.objKSSHoodDuctEntity = new KSSHoodDuctEntity();
      // this.BindKSSDimensionofHoodList();
    }
  }


  BindDuctsList() {
    var query1 = '&HoodName=1&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, "restapiURLKSSDuctList").subscribe((data:any) => {
      if (data.Status === true) {
        this.objKSSHoodDuctEntityList = data.Data.filter((a:any)=>a.NameOfHood==this.objKSSDimensionofHoodEntity.NameofHood);
       this.objKSSHoodDuctEntityListForInnerGrid = data.Data;
      }
    });
  }






  handleFileInput(files: FileList) {
    this.objGSSFile = files.item(0);
  }


  // SaveAttachement() {
  //   // this.spinner.show();
  //   const formData = new FormData();

  //   formData.append("Flag", 'Insert');
  //   formData.append("FilesId", String(0));  // Convert number to string
  //   formData.append("FilesName", 'KSSFileName_' + this.objFileUploadEntityList.length || '');
  //   formData.append("FilesPath", 'path');
  //   formData.append("ProspectCode", String(this.ProspectCode || ''));  // Convert number to string
  //   formData.append("ProductId", String(3));  // Convert number to string
  //   formData.append("IID", String(this.IID || ''));  // Convert number to string
  //   formData.append("CreatedBy", String(this.CurrentUser.EmpCode || ''));  // Convert number to string
  //   formData.append("OriginalFilesName", (this.objGSSFile?.name) || '');
  //   formData.append("FileType",  || '');
  //   formData.append("File", this.DocfileToUpload);



  //   formData.append('Flag', 'Insert');
  //   formData.append('FilesId', '0');
  //   formData.append('FilesName', 'KSSFileName_' + this.objFileUploadEntityList.length);
  //   formData.append('FilesPath', '');
  //   formData.append('FileType', 'KSS');
  //   formData.append('ProspectCode', this.ProspectCode);
  //   formData.append('ProductId', '1');
  //   formData.append('IID', this.objKSSEntity.KSSId.toString());
  //   formData.append('CreatedBy', this.CreatedByDetail.CreatedBy);
  //   formData.append('OriginalFilesName', this.objGSSFile?.name || '');

  //  // this.objFileUploadEntityList.push(this.objFileUploadEntity);

  //   this.ApiServive.httpostForm1( "Proposal/save",formData).subscribe(
  //     (data:any) => {
  //       if (data.Status === true) {
  //         // this.spinner.hide();
  //         //this.toast.showError(data.Data.MessageBox);
  //         this.objGSSFile = null;
  //         this.BindAttachement();
  //       }
  //       else {
  //         //this.toast.showError(data.Data.Message);
  //       }
  //     });
  // }

  // BindAttachement() {
  //   var query1 = '&FilesId=0&ProspectCode=' + this.ProspectCode + '&ProductId=1&IID='+this.IID;
  //   this.ApiServive.httpget(query1, restapiURL.FileUploadedList).subscribe(data => {
  //     if (data.Status === true) {
  //       this.objFileUploadEntityList = data.Data;
  //     }
  //   });
  // }


  // DeleteSavedFile(item) {

  //   if (confirm('Are you sure to delete this item.')) {
  //     this.spinner.show();
  //     this.objFileUploadEntity.Flag = 'Delete';
  //     this.objFileUploadEntity.FilesId = item.FilesId;
  //     this.objFileUploadEntity.FilesName = item.FilesName;
  //     this.objFileUploadEntity.FilesPath = '';
  //     this.objFileUploadEntity.FileType = '';
  //     this.objFileUploadEntity.ProspectCode = this.ProspectCode;
  //     this.objFileUploadEntity.ProductId = 1;
  //     this.objFileUploadEntity.IID = item.IID;
  //     this.objFileUploadEntity.CreatedBy = this.CreatedByDetail.CreatedBy;
  //     this.ApiServive.httpost(this.objFileUploadEntity, restapiURL.FileUpload).subscribe(
  //       data => {
  //         if (data.Status === true) {
  //           this.spinner.hide();
  //           this.toast.showSuccess(data.Data.MessageBox,'Success');
  //           this.BindAttachement();
  //         }
  //         else {
  //           //this.toast.showError(data.Data.Message);
  //         }
  //       });
  //   }

  // }

  NextStep1() {
    
    if (this.objKSSEntity.TypeOfKitchenRequired == '0') {
      // this.toast.showError('Select the type of kitchen.','Error')
      return;
    }
    if (this.objKSSEntity.Temperature == '0') {
      // this.toast.showError('Select the type of Temperature.','Error')
      return;
    }
    // if (this.objKSSEntity.TypeofHoods == '0') {
    //   this.toast.showError('Select the type of hoods..')
    //   return;
    // }
    if (this.objKSSEntity.DimensionOfKitchenLength == undefined) {
      // this.toast.showError('Enter the dimension of kitchen length.','Error')
      return;
    }
    if (this.objKSSEntity.DimensionOfKitchenWidth == undefined) {
      // this.toast.showError('Enter the dimension of kitchen width.','Error')
      return;
    }
    if (this.objKSSEntity.DimensionOfKitchenHeight == undefined) {
      // this.toast.showError('Enter the dimension of kitchen height.','Error')
      return;
    }

    if (this.objKSSDOHEntityList.length == this.objKSSEntity.NoOfHoods) {
      if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
        // this.toast.show//Error('You have not save the Hoods details.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHLength != undefined) {
        // this.toast.s/howError('You have not save the Hoods details.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHWidth != undefined) {
        // this.toast.showError('You have not save the Hoods details.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.DOHHeight != undefined) {
        // this.toast.showError('You have not save the Hoods details.','Error')
        return;
      }
      if (this.objKSSDimensionofHoodEntity.NoOfDucts != undefined) {
        // this.toast.showError('You have not save the Hoods details.','Error')
        return;
      }

      this.objKSSEntity.Flag = 'Insert';
      this.objKSSEntity.ProspectCode = this.ProspectCode;
      this.objKSSEntity.ProductId = 1;
      this.objKSSEntity.CustomerTypeId = "1";
      this.objKSSEntity.CustomerCode = 'Test';
      this.objKSSEntity.CreatedBy = this.CreatedByDetail.CreatedBy;
      this.objKSSEntity.ProductType = 'Normal';
      this.objKSSEntity.LPGShuttoff = 'Test';
      this.objKSSEntity.DescriptionOfRisk = 'na';
      this.objKSSEntity.DetailsOfDesigner = 'na';
      this.objKSSEntity.KSSId = this.IID;
      this.ApiServive.httpost(this.objKSSEntity, "").subscribe(
        (data :any)=> {
          if (data.Status === true) {
            this.objKSSEntity.KSSId = data.Data.PageId;
            //this.toast.showError(data.Data.MessageBox); 
          }
        })
      this.ShowtabActive = 2;
    }
    else {
      // this.toast.showError('No of Hood is more than your input','Error');
    }
  }

  // SubmittedToDesign() {
  //  this.callback.emit('Proposal Submitted to Design Team')
  // }

  SubmittedToDesign() {
    if(this.objKSSDOHEntityList.length==0 || this.objKSSEntity.KSSId==0){
      // this.toast.showError('Please fill the all Details first.','Error');
      return;
    }
    // this.spinner.show();
    var query1 = '&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=' + this.ProspectCode+'&CreatedBy='+this.CreatedByDetail.CreatedBy+'&PID=3&IID='+this.IID;;
    this.ApiServive.httpget(query1, "restapiURL.OnSubmitInputSheetStatusChange").subscribe((data:any) => {
      if (data.Status === true) {
        // this.spinner.hide();
        this.callback.emit('Input saved successfully.');
      }
    });
  // }
}
genHoods(e:any){
  this.noOfHoods=[]
  for (let index = 0; index < Number(e.target.value); index++) {
    // const element = array[index];
  this.noOfHoods.push(index)
    
  }
}
  BindList() {
    this.list = [
      {
        id: 1,
        title: 'High hazard area',
        checked: false,
        ParentId:1
      },
      {
        id: 2,
        title: 'Insurance purpose',
        checked: false,
        ParentId:1
      },
      {
        id: 3,
        title: `Owner's comfort and safety`,
        checked: false,
        ParentId:1
      },
      {
        id: 4,
        title: 'Fire incident in the past',
        checked: false,
        ParentId:1
      },
      {
        id: 5,
        title: 'Existing system improvement',
        checked: false,
        ParentId:2
      },
      {
        id: 6,
        title: `Client's requirement`,
        checked: false,
        ParentId:3
      }      
    ]
  } 

  // FileDownload(fileName: string) {
  //   fileName = fileName;
  //   var query1 = 'FileName=' + fileName;
  //   this.ApiServive.httpget(query1, "restapiURL.InputsheetDownLoadFile").subscribe(
  //     // (fileData:any) => {
  //     //   let b: any = new Blob([fileData], { type: 'application/octet-stream' });
  //     //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //     //     window.navigator.msSaveOrOpenBlob(b, fileName);
  //     //   }
  //     //   else {
  //     //     var url = window.URL.createObjectURL(b);
  //     //     //window.open(url);
  //     //     var a = document.createElement('a');
  //     //     document.body.appendChild(a);
  //     //     a.setAttribute('style', 'display: none');
  //     //     a.href = url;
  //     //     a.download = fileName;
  //     //     a.click();
  //     //     window.URL.revokeObjectURL(url);
  //     //     a.remove(); // remove the element
  //     //   }
  //     // }
  //   );
  // }






  getAttachmentData() {
    this.ApiServive.httpgetMaster("&ProspectCode="+this.ProspectCode+"&cqrsId="+this.IID+"&ProductId=3", "/Proposal/getAttachmentData").subscribe(
      (response: any) => {
        // console.log(response.data);
        this.attachments=response.data;
        console.log(this.attachments , "attachments.......")
      },
      (err) => {
      }
    );
  }




  FileDownload(e:any,name:string)
  {
    const fileUrl = e;

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute with the file URL
    link.href = fileUrl;
console.log(fileUrl)
    // Set the download attribute with the desired file name
    link.download = name;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click event on the link
    link.click();

    // Remove the link from the document
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
    this.ApiServive.httpostForm1('/Proposal/save', formData).subscribe({
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
//  new kss
downloadFile(): void {

  let fileUrl='';
  if(this.isCS)
    {
      fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_KSS_CUSTOMER_SUPPORT.pdf';
    }
    else
    {
      fileUrl = 'https://cfx.ceasefire.biz/assets/PPTForInputsheet/USER_GUIDE_INPUT_SHEET_KSS_CUSTOMER_INPUT.pdf';
    }
  
  // Create a link element
  const link = document.createElement('a');


  link.href = fileUrl;

  link.download = 'test';
  link.target = '_blank';
  document.body.appendChild(link);


  link.click();

  document.body.removeChild(link);
}
  onSubmitAttachment(): void {
    if (this.selectedKitchenAttachment && this.selectedFileAttachment) {
     
      this.objFileUploadEntity.Flag = 'Insert';
      this.objFileUploadEntity.FilesId = 0;
      this.objFileUploadEntity.FilesName = 'kssULFile' + this.attachments.length + 1;
      this.objFileUploadEntity.FilesPath = '';
      this.objFileUploadEntity.FileType = this.selectedKitchenAttachment;
      this.objFileUploadEntity.ProspectCode = this.ProspectCode;
      this.objFileUploadEntity.ProductId = 1;
      this.objFileUploadEntity.IID = this.IID;
      this.objFileUploadEntity.CreatedBy = '11';
      this.objFileUploadEntity.OriginalFilesName = this.docName;

      const formData = new FormData();

      formData.append("Flag", 'Insert');
      formData.append("FilesId", String(0));  // Convert number to string
      formData.append("FilesName", 'kssULFile' + this.attachments.length + 1 || '');
      formData.append("FilesPath", 'path');
      formData.append("ProspectCode", String(this.ProspectCode || ''));  // Convert number to string
      formData.append("ProductId", String(3));  // Convert number to string
      formData.append("IID", String(this.IID || ''));  // Convert number to string
      formData.append("CreatedBy", String(this.ApiServive.getUserId() || ''));  // Convert number to string
      formData.append("OriginalFilesName",   this.docName);
      formData.append("FileType", this.selectedKitchenAttachment || '');
      formData.append("File",this.selectedFileAttachment );
      // Rest of your code...
      this.ApiServive.httpostForm1('/Proposal/save', formData).subscribe({
        next: (res: any) => {
          this.getAttachmentData();
          if (res?.statusCode == 200) {
  
          } else {
            alert("Failed !")
          }
        },
        error: (e: any) => {
          // console.log("ERRRRR", e)
          
        }
      })
//       this.ApiServive.httpostForm1(this.objFileUploadEntity, "Proposal/SaveFile", newAttachment.file).subscribe((data)=>{
// this.BindAttachement()
//       })
      // this.attachmentService.addAttachment(newAttachment);
      // this.refreshAttachments()
      // Optionally clear form fields after submission
      this.selectedKitchenAttachment = '';
      this.selectedFileTypeAttachment = '';
      this.selectedFileAttachment = null;
    }
  }
  nextTab()
  {
    if(this.selectedOption===1)
    {
      this.scrollONnext()
      // this.onSubmit();
    }
    if(this.selectedOption<3)
    {
      this.scrollONnext()

      this.selectedOption++
    }



  }
  updateSelection(option: number) {
    this.selectedOption = option;
  }

  selectedOption: number = 1;
  // previoustab()
  // {
  //   if(this.selectedOption>0)
  //   {
  //     this.scrollONnext()

  //     this.selectedOption--
  //   }
  // }
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
  BindAttachement() {
    var query1 = '&FilesId=0&ProspectCode=' + this.ProspectCode + '&ProductId=1&IID='+this.IID;
    this.ApiServive.httpget(query1,"").subscribe((data:any) => {
      if (data.Status === true) {
        this.attachments = data.Data;
      }
    });
  }
  createHoodFormGroup(): FormGroup {
    return this.fb.group({
      hoodID:0,
      hoodName: [''], // Add other hood properties as needed
      hoodLength: [''],
      hoodWidth: [''],
      hoodHeight: [''],
      hoodType: [''],
      noOfPlenum: [''],
      shutoffsize:[''],
      largestApplianceOilCap: [''],
      plenums: this.fb.array([
        // this.createPlenumFormGroup()
      ]),
      ductTables: this.fb.array([
        this.createDuctTableFormGroup() // Initial/default duct table
      ]),
    });
  }
   deepCopyArray(arr:any) {
    return arr.map((item:any) => Array.isArray(item) ? this.deepCopyArray(item) : (item instanceof Object) ? this.deepCopyObject(item) : item);
  }
  
   deepCopyObject(obj:any) {
    const newObj = {} as any;
    for (const key in obj) {
      newObj[key] = (obj[key] instanceof Object) ? this.deepCopyObject(obj[key]) : obj[key];
    }
    return newObj;
  }
  calculateRectangularDuctArea(ductTable: FormGroup) {
    let length: number;

    if (ductTable && ductTable.get('rectangularDuct.lengthRectangular')) {
      length = ductTable.get('rectangularDuct.lengthRectangular')?.value;
    } else {
      length = 0;
    }
    
    // console.log(length)
    const width = ductTable.get('rectangularDuct.widthRectangular')?.value;
  
    // Check for null or undefined values
    if (length != null && width != null && ductTable!=null) {
      // Calculate area based on length and width
      const area = (length * width) / 1000000; // Convert from square millimeters to square meters
  
      // Update the area in the form control
      ductTable.get('rectangularDuct.areaRectangular')?.setValue(area);
    }
    else{
      ductTable.get('rectangularDuct.areaRectangular')?.setValue(0);

    }
  }
  calculateCircularDuctArea(ductTable: FormGroup) {
    const diameter = ductTable.get('circularDuct.diameterCircular')?.value;
  
    // Check for null or undefined values and ensure diameter is greater than 0
    if (diameter != null && diameter > 0) {
      // Calculate the radius
      const radius = diameter / 2;
  
      // Calculate area based on diameter
      const area = Math.PI * Math.pow(radius / 1000, 2); // Convert from square millimeters to square meters
  
      // Update the area in the form control
      ductTable.get('circularDuct.areaCircular')?.setValue(area.toFixed(2));
    } else {
      ductTable.get('circularDuct.areaCircular')?.setValue(null);
    }
  }
  
  get filteredHoods() {
    return this.hoods.map(group =>
      group.filter((option:any) => !this.isSelected(option))
    );
  }
  // FileDownload(fileName: string) {
  //   fileName = fileName;
  //   var query1 = 'FileName=' + fileName;
  //   this.ApiServive.httpgetForDownloadFile(query1, restapiURL.InputsheetDownLoadFile).subscribe(
  //     fileData => {
  //       let b: any = new Blob([fileData], { type: 'application/octet-stream' });
  //       if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //         window.navigator.msSaveOrOpenBlob(b, fileName);
  //       }
  //       else {
  //         var url = window.URL.createObjectURL(b);
  //         //window.open(url);
  //         var a = document.createElement('a');
  //         document.body.appendChild(a);
  //         a.setAttribute('style', 'display: none');
  //         a.href = url;
  //         a.download = fileName;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove(); // remove the element
  //       }
  //     }
  //   );
  // }
  // DeleteSavedFile(item:any) {
  //   if (confirm('Are you sure to delete this item.')) {
  //     this.objFileUploadEntity.Flag = 'Delete';
  //     this.objFileUploadEntity.FilesId = item.FilesId;
  //     this.objFileUploadEntity.FilesName = item.FilesName;
  //     this.objFileUploadEntity.FilesPath = '';
  //     this.objFileUploadEntity.FileType = '';
  //     this.objFileUploadEntity.ProspectCode = this.ProspectCode;
  //     this.objFileUploadEntity.ProductId = 1;
  //     this.objFileUploadEntity.IID = item.IID;
  //     this.objFileUploadEntity.CreatedBy = this.currentUser.EmpCode;
  //     this.ApiServive.httpost(this.objFileUploadEntity, "restapiURL.FileUpload").subscribe(
  //       (data:any) => {
  //         if (data.Status === true) {
  //           // this.toast.showSuccess(data.Data.MessageBox,'Success');
  //           this.BindAttachement();
  //         }
  //         else {
  //           //this.toast.showError(data.Data.Message);
  //         }
  //       });
  //   }

  // }
  onDuctTypeChange(ductType: string, index: number): void {
    const ductTable = (this.kitchenForm.get('hoods') as FormArray).at(index).get('ductTables') as FormArray;
  
    ductTable.get('ductType')?.setValue(ductType);
  
    const ductFields: Record<string, string[]> = {
      'rectangular': ['noOfDuctRectangular', 'lengthRectangular', 'widthRectangular', 'areaRectangular'],
      'circular': ['noOfDuctCircular', 'diameterCircular', 'areaCircular'],
      'both': ['noOfDuctRectangular', 'lengthRectangular', 'widthRectangular', 'areaRectangular', 'noOfDuctCircular', 'diameterCircular', 'areaCircular']
    };
  
    const allFields = ['noOfDuctRectangular', 'lengthRectangular', 'widthRectangular', 'areaRectangular', 'noOfDuctCircular', 'diameterCircular', 'areaCircular'];
  
    // Disable all fields
    allFields.forEach(field => ductTable.get(`rectangularDuct.${field}`)?.disable());
    allFields.forEach(field => ductTable.get(`circularDuct.${field}`)?.disable());
  
    // Enable fields based on ductType
    (ductFields[ductType] || []).forEach((field: any) => ductTable.get(`rectangularDuct.${field}`)?.enable());
    (ductFields[ductType] || []).forEach((field: any) => ductTable.get(`circularDuct.${field}`)?.enable());
  
  }
  
  
  

  openHoodDetailsModal(hood: any): void {
// console.log(hood)
    // const dialogRef = this.dialog.open(HoodDetailsModalComponent, {
    //   width: '80%',
    //   data: hood

    // });
  }
 
  addDuctTable(i:number) {


// alert(i)
    let noOf =1;
    const plenumsArray = (this.kitchenForm.get('hoods') as FormArray).at(i).get('ductTables') as FormArray;
    // Clear existing plenums
    // plenumsArray.clear();
  
    // Add new plenums based on noOfPlenum
    for (let i = 0; i < noOf; i++) {
      plenumsArray.push(this.createDuctTableFormGroup());
    }
    // const ductTables = this.kitchenForm.get('ductTables') as FormArray;
  
    // Add a new duct table FormGroup to the FormArray
    // ductTables.push(this.createDuctTableFormGroup());
  }
  deleteDuctTable(index: number) {
    const ductTables =  (this.kitchenForm.get('hoods') as FormArray).at(index).get('ductTables') as FormArray;
 
    
    // Clear existing plenums
 
    ductTables.removeAt(index);
  }
  isUpdateEq:boolean=false
  editEQ(eq: any){
    this.isUpdateEq=true
console.log(eq)
this.eqToUpdate=eq
this.equipmentForm.selectedKitchen=eq.selectedKitchen
this.equipmentForm.selectedHood=eq.selectedHood
this.equipmentForm.equipmentList=eq.equipmentList
this.equipmentForm.selectedSide=String(eq.objKitchenEquipmentEntity.Side).toLowerCase()
this.equipmentForm.selectedProtectionType=eq.protectionType
this.objKitchenEquipmentEntity.SideA.CylinderPosition=eq.objKitchenEquipmentEntity.SideA.CylinderPosition
this.objKitchenEquipmentEntity.SideA.ManualReleasePosition=eq.objKitchenEquipmentEntity.SideA.ManualReleasePosition
this.objKitchenEquipmentEntity.SideA.CylinderRunningLength=eq.objKitchenEquipmentEntity.SideA.CylinderRunningLength
this.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength=eq.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength


  
console.log(this.equipmentForm)

  }

  createDuctTableFormGroup(): FormGroup {
    return this.fb.group({
      ductType: ['rectangular'],
      
ductID:0,

      rectangularDuct: this.fb.group({
        noOfDuctRectangular: [null],
        lengthRectangular: [null],
        widthRectangular: [null],
        areaRectangular: [null],
      }),
      circularDuct: this.fb.group({
        noOfDuctCircular: [null],
        diameterCircular: [null],
        areaCircular: [null],
      }),
    });
  }

setNp(e:any){
  // alert(e.target.value)
  this.noOfp=Number(e.target.value)
  // alert(this.noOfp)
}
  onAddEquipment() {
    this.equipmentForm.equipmentList.push({
      action: 'plus',
      sNo: this.equipmentForm.equipmentList.length + 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    });
  }

  onDeleteEquipmentB(index: number) {
    this.equipmentFormB.equipmentList.splice(index, 1);
  }


  onAddEquipmentB() {
    this.equipmentFormB.equipmentList.push({
      action: 'plus',
      sNo: this.equipmentFormB.equipmentList.length + 1,
      type: '',
      width: '',
      depth: '',
      heightSalmander: '',
      distanceFromLeftEdge: '',
      heightToSalamanderBase: '',
      largest:''
    });
  }

  onDeleteEquipment(index: number) {
    this.equipmentForm.equipmentList.splice(index, 1);
  }

 
  
  // addPlenums( noOfPlenum: number): void {
  //   // const plenumsArray = this.kitchenForm.get('ductTables').at(index).get('plenums') as FormArray;
  //   const plenumsArray = this.kitchenForm.get('plenums') as FormArray;
  
  //   // Clear existing plenums
  //   plenumsArray.clear();
  
  //   // Add new plenums based on noOfPlenum
  //   for (let i = 0; i < noOfPlenum; i++) {
  //     plenumsArray.push(this.createPlenumFormGroup());
  //   }
  //   console.log(plenumsArray, "plmare")
  // }
  off:boolean=false
  togglee() {
    this.off = !this.off;
    // alert(this.off)
  }
 
  addPlenums(hoodIndex:number, e:any): void {
    // console.log(11)
    // alert("rruns")
console.log(this.hoods, "...form hoods")
    let noOf = e.target.value;
    const plenumsArray = (this.kitchenForm.get('hoods') as FormArray).at(hoodIndex).get('plenums') as FormArray;
    // Clear existing plenums
    plenumsArray.clear();
  
    // Add new plenums based on noOfPlenum
    for (let i = 0; i < noOf; i++) {
      plenumsArray.push(this.createPlenumFormGroup(hoodIndex));
    }
    if(this.isUpdate){
      // this.plenumsEditing=[]
      let no =Number(this.noOfp)- Number(noOf)
      if(no<0){
        no= Number(noOf)-Number(this.noOfp)
      }
      

      for (let i = 0; i < no; i++) {
        
          this.plenumsEditing.push(this.createPlenumFormGroup(hoodIndex));

        
      }
    }
    // plenumsArray.push(this.createPlenumFormGroup());
  }
  
  createPlenumFormGroup(hoodIndex:any): FormGroup {
    return this.fb.group({
      hoodIndex:hoodIndex,
      type: [''],
      length: [null],
      depth: [null],
      height: [null],
      distanceFromLeft: [null],
      // Add other properties as needed
    });
  }
  
getHoods(){
  let q = "&IID="+this.IID+"&ProspectCode="+this.ProspectCode
  this.ApiServive.httpget(q,"/Proposal/getHoods").subscribe((data:any)=>{
    console.log(data, "..hoods actual")
    this.hoods2=[]
    let d = [JSON.parse(data.data)]
    this.hoods2=d 
    this.getKitchenRoom()

    // console.log(this.hoods2, "hood BE")
    for (let index = 0; index < this.hoods2[0].length; index++) {
      const element = this.hoods2[0][index];
      // console.log(element , "element//.")
    this.getHoodsPlenums(element.hoodID)
    this.getHoodsDuct(element.hoodID)
    }
  })
}
submittedEquipmentList2:any[]=[]
getEquipments(){
  let q = "&IID="+this.IID
  this.ApiServive.httpget(q,"/Proposal/getEquipment").subscribe((data:any)=>{
    // console.log(data, "..equp BE")
    // Assuming data.Data is the provided array of objects
    if(JSON.parse(data.data).length>0){
      this.toShoweqQuestion=false
      this.toShoweq=true
    }
    

const convertedData = JSON.parse(data.data).map((item :any)=> ({
  id:item.eqID,
  selectedKitchen: item.selectedKitchen,
  selectedHood: item.selectedHood,
  protectionType: item.selectedProtectionType,
  equipmentList: [{

    type: item.type,
    width: item.width,
    depth: item.depth,
    heightSalmander: item.heightSalmander,
    distanceFromLeftEdge: item.distanceFromLeftEdge,
    heightToSalamanderBase: item.heightToSalamanderBase,
    cylinderPosition: item.CylinderPosition,
    manualReleasePosition: item.ManualReleasePosition,
    cylinderRunningLength: item.CylinderRunningLength,
    manualReleaseRunningLength: item.ManualReleaseRunningLength,
    largest:item.largestOil
    // Add other properties if needed
  }],
  objKitchenEquipmentEntity: {
    Side: item.selectedSide,
    SideA: {
      CylinderPosition: item.CylinderPosition,
      ManualReleasePosition: item.ManualReleasePosition,
      CylinderRunningLength: item.CylinderRunningLength,
      ManualReleaseRunningLength: item.ManualReleaseRunningLength
      // Add other SideA properties if needed
    }
  }
}));
console.log(convertedData , "cd")
this.submittedEquipmentList=convertedData

console.log(convertedData ,"lllllllllllllll");







const jsonData = JSON.parse(data.data);

// Extract unique values from the original data
const uniqueValues = Array.from(new Set(jsonData.map((item:any) => item.type)));

// Create a new array with the unique values
const convertedData2 = uniqueValues.map(type => {
  // Find the first item with this type
  const item = jsonData.find((item:any) => item.type === type);

  // Create the desired structure
  return {
    id: item.eqID,
    selectedKitchen: item.selectedKitchen,
    selectedHood: item.selectedHood,
    protectionType: item.selectedProtectionType,
    objKitchenEquipmentEntity: {
      Side: item.selectedSide,
      SideA: {
        CylinderPosition: item.CylinderPosition,
        ManualReleasePosition: item.ManualReleasePosition,
        CylinderRunningLength: item.CylinderRunningLength,
        ManualReleaseRunningLength: item.ManualReleaseRunningLength
        // Add other SideA properties if needed
      }
    }
  };
});

console.log(convertedData2 ,"222")
this.submittedEquipmentList2=convertedData2

    // this.hoods=[]
    // let d = [data.Data]
    // this.hoods=d 
    // console.log(data.Data)
    // for (let index = 0; index < this.hoods[0].length; index++) {
    //   const element = this.hoods[0][index];
    // this.getHoodsPlenums(element.hoodID)
      
    // }
  })

}
getUniqueKitchens() {
  const uniqueKitchens:any[] = [];
  this.submittedEquipmentList.forEach(equipment => {
    if (!uniqueKitchens.includes(equipment.selectedKitchen)) {
      uniqueKitchens.push(equipment.selectedKitchen);
    }
  });
  return uniqueKitchens;
}

// Define a variable to track the displayed row index
displayedRowIndex: number = 0;
serialNumber: number = 0; // Serial number counter
hoodLength(i:any){
  let a= this.submittedEquipmentList.filter((i)=>i.selectedKitchen==i)
  // alert(a.length)
  return a.length
}
getSerialNumber(e:any): number {
    console.log(e, "eq")
    this.serialNumber++;
    return this.serialNumber;
}


veq:any[]=[]
ve(k:any,eq:any, side:any){
  let eqp = this.submittedEquipmentList.filter((i)=>i.selectedHood==eq && i.objKitchenEquipmentEntity.Side==side&& i.selectedKitchen==k)
console.log(eqp)
this.veq=eqp
}
isDuplicateRow(equipment: any, index: number): boolean {
  if (index > 0) {

      const prevEquipment = this.submittedEquipmentList2[index - 1];
      return (
          equipment.selectedKitchen === prevEquipment.selectedKitchen &&
          equipment.selectedHood === prevEquipment.selectedHood &&
          equipment.objKitchenEquipmentEntity.Side === prevEquipment.objKitchenEquipmentEntity.Side &&
          equipment.objKitchenEquipmentEntity.SideA.CylinderPosition === prevEquipment.objKitchenEquipmentEntity.SideA.CylinderPosition &&
          equipment.objKitchenEquipmentEntity.SideA.ManualReleasePosition === prevEquipment.objKitchenEquipmentEntity.SideA.ManualReleasePosition &&
          equipment.objKitchenEquipmentEntity.SideA.CylinderRunningLength === prevEquipment.objKitchenEquipmentEntity.SideA.CylinderRunningLength &&
          equipment.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength === prevEquipment.objKitchenEquipmentEntity.SideA.ManualReleaseRunningLength
      );
  }
  // alert(index)

  return false;
}
isDuplicateK(equipment: any, index: number): boolean {
  if (index > 0) {

      const prevEquipment = this.submittedEquipmentList[index - 1];
      return (
          equipment.selectedKitchen === prevEquipment.selectedKitchen 
      );
  }
  // alert(index)

  return false;
}
isNewK(equipment: any, index: number): boolean {
  if (index > 0) {

      const prevEquipment = this.submittedEquipmentList[index - 1];
      return (
          equipment.selectedKitchen === prevEquipment.selectedKitchen 
      );
  }
  // alert(index)

  return true;
}


getKitchenRoom() {
  let q = "&IID=" + this.IID;
  this.ApiServive.httpget(q, "/Proposal/getKitchen").subscribe((data: any) => {
    // console.log(data, "..kitchenBE");
    this.gridData = JSON.parse(data.data);

console.log(this.gridData, "grid data......")
    this.gridData.forEach((kitchen: any) => {
      // Parse JSON string to get hoodID
      const hoodIDs = JSON.parse(kitchen.HoodIDs);
// console.log(this.hoods2[0], "hoods")
// console.log(hoodIDs, "hid")
      // Find corresponding hoods and update selectedHoods
      kitchen.selectedHoods = this.hoods2[0].filter((hood: any) => hoodIDs.includes(hood.hoodID));
    });
    console.log(this.gridData, "initial")
    this.kitchenForm.value.suppressionSystemType   =  this.gridData[0].SuppressionSystemType 
    this.kitchenForm.value.ID=  this.gridData[0].ID 

    // this.kitche/nForm.get('suppressionSystemType').setValue(this.gridData[0].SuppressionSystemType );
// this.kitchenForm.get('suppressionSystemType').value
    // console.log(this.gridData, "afilter");
    const firstGridDataItem = this.gridData[0]!;
    
    // Set the value only if SuppressionSystemType is not null
    if (firstGridDataItem && firstGridDataItem.SuppressionSystemType) {
      this.kitchenForm.get('suppressionSystemType')!.setValue(firstGridDataItem.SuppressionSystemType!);
      this.kitchenForm.get('temperatureBelow5C')!.setValue(firstGridDataItem.TemperatureBelow5C!);
      this.kitchenForm.get('systemOperationType')!.setValue(firstGridDataItem.SystemOperationType!);
      this.kitchenForm.get('annunciationDevice')!.setValue(firstGridDataItem.AnnunciationDevice!);
      this.kitchenForm.get('requirementAnnunciationType')!.setValue(firstGridDataItem.RequirementAnnunciationType!);
      this.kitchenForm.get('annunciationType')!.setValue(firstGridDataItem.AnnunciationType!);
      this.kitchenForm.get('gasShutoffValve')!.setValue(firstGridDataItem.GasShutoffValve!);
      this.kitchenForm.get('gasShutoffValveRequirement')!.setValue(firstGridDataItem.GasShutoffValveRequirement!);
      this.kitchenForm.get('gasShutoffValveType')!.setValue(firstGridDataItem.RequirementGasShutoffValveType!);
      this.kitchenForm.get('ID')!.setValue(firstGridDataItem.ID!);





  
    }
  });
}

getHoodsPlenums(hoodID: number) {
  let q = "&hoodID=" + hoodID;
  this.ApiServive.httpget(q, "/Proposal/getHoodsPlenums").subscribe((data: any) => {
    // console.log(data, "..pl be");
    console.log(data, "hoods, be");

    // Assuming your API returns an array of plenums in 'data.plenums'
    const plenums = JSON.parse(data.data)|| [];
// console.log(data , " raw plenums")
// console.log(plenums , " parse plenums")
    // Find the hood in 'this.hoods' array based on 'hoodID'
    const hoodToUpdateIndex = this.hoods2[0].findIndex((hood: any) => hood.hoodID === hoodID);

    // If the hood is found, update its 'plenums' property
    if (hoodToUpdateIndex !== -1) {
    
      // console.log(hoodToUpdateIndex, " index")
      this.hoods2[0][hoodToUpdateIndex].plenums = plenums;
      console.log(this.hoods2[0][hoodToUpdateIndex], " update hood")
      console.log(plenums , "raw")
      console.log(hoodID, " id")
      // console.log(this.hoods2[0], "found it ")
    }
  });    
}

getHoodsDuct(hoodID: number) {
  let q = "&hoodID=" + hoodID;
  this.ApiServive.httpget(q, "/Proposal/getHoodsDuct").subscribe((data: any) => {
    // console.log(data, "..duct be");
    // console.log(this.hoods, "hoods, be");

    // Assuming your API returns an array of plenums in 'data.plenums'
    const duct = JSON.parse(data.data)|| [];
console.log(duct , " api duct")
    // Find the hood in 'this.hoods' array based on 'hoodID'
    const hoodToUpdateIndex = this.hoods2[0].findIndex((hood: any) => hood.hoodID === hoodID);

    // If the hood is found, update its 'plenums' property
    if (hoodToUpdateIndex !== -1) {
      
      this.hoods2[0][hoodToUpdateIndex].ductTable = duct;
    }
  });
}

  // createPlenumGroup() {
  //   return this.fb.group({
  //     type: [''],
  //     length: [''],
  //     depth: [''],
  //     height: [''],
  //     distanceFromLeft: [''],
  //   });
  // }
  getHoodType(): string {
    return this.kitchenForm.get('hoodType')?.value;
  }
  
  // Method to dynamically get Plenum Type options based on Hood Type
  onHoodTypeChange(index:any): void {
    const hoodType = this.kitchenForm.get('hoods')?.value;
// alert(hoodType[index].hoodType)
this.tempHoodTypeForPlenum=hoodType[index].hoodType
    // Update plenumType options based on hoodType
    this.updatePlenumTypeOptions(index);
  }
  private updatePlenumTypeOptions(index:any): void {
    // alert(1)
    const hoodType = this.kitchenForm.get('hoods')?.value;
    
//     console.log(hoodType, "hoodtupeee///")
//     const plenumTypeControl = hoodType.get('plenum');
// console.log(plenumTypeControl, "//pl")
    if (hoodType[index].hoodType === 'wall') {
      // this.pt='WALL PLENUM'
      this.toHidev=true
      this.toHidew=false
      
      // let plenumForm = this.kitchenForm.get('hoods')[index] as FormGroup;
// console.log(plenumForm.controls[index].get('plenum') as FormGroup, " pf")
//       if (plenumForm && plenumForm.get("plenums")) {
      
//       } else {
//         // console.log("Either pl/enumForm or plenumForm.get('plenums') is null");
//       }
      
// console.log(this.plenums)
hoodType[0].plenums.map((item:any)=>{
  item.type='WALL PLENUM'
})
this.plenums.map((item)=>{
  item.type='WALL PLENUM'
})
      // plenumTypeControl.setValue();
    } else if (hoodType[index].hoodType === 'island') {
      // this.pt='V-PLENUM'
      this.toHidew=true
      this.toHidev=false
      this.plenums.map((item)=>{
        item.type='V-PLENUM'
      })
      // plenumTypeControl.setValue('V-PLENUM');
    } else {
      // Clear plenumType if hoodType is not wall or island
      // plenumTypeControl.setValue('');
    }
  }

// Inside your component class
selectOption(decision:boolean){
if(decision){
  // this.toShoweqQuestion=false
  this.toShoweq=true

}
else{
  this.toShoweqQuestion=true
  this.selectedOption=3
this.toShoweq=false
}
}
  
  // Function to add hood to the array
  addToGrid() {
    // alert(this.IID)
    // alert(this.ProspectCode)
    let lastel=0

    // Assuming kitchenForm.value contains the form values
    const newHood = this.kitchenForm.get('hoods')?.value;
    console.log(newHood)
    // this.hoods.push(newHood);
    // console.log(this.hoods, "hoods");
    newHood.map((i:any)=>{
i.kssID=this.IID
    })
    // newHood.forEach((i:any)=>{
    //   this.hoodIDs.push(i.)
    // })
    
    newHood.map((i:any)=>{
      i.prospectCode=this.ProspectCode
          })
    // newHood[0].=this.
    // console.log(JSON.stringify(newHood[0]), "nh0")
    // console.log(newHood, "nh")

    for (let indexx = 0; indexx < newHood.length; indexx++) {
      const elementHood = newHood[indexx];
      this.ApiServive.httpost(elementHood , "/Proposal/kssHoodAddGrid").subscribe((data:any)=>{
debugger
        // console.log("response hood ,", data.data[0])
        lastel=lastel+1;
        let hoodID = data.data[0].insertedRowId
        // this.hoodIDs.push(hoodID) 
        this.hid.push(hoodID)
        console.log(newHood, "new hood")
        // console.log(hoodID, "original hood id inside for loop without  condition")
        if(lastel==newHood.length){
          console.log(this.hid, "hood ids inside for loop ", indexx , "length==" , newHood.length)
          this.onSubmit()
        }
        // console.log(newHood[0].plenums, " plenummmmsssss")
        for (let index = 0; index < newHood[indexx].plenums.length; index++) {
          const element = newHood[indexx].plenums[index];
          // const element = newHood[indexx].plenums[index];

          element.hoodID=hoodID
          element.type=this.tempHoodTypeForPlenum=='wall'?'Wall Plenum':'V-Plenum'

          console.log(element, "plenum inserting")
          this.ApiServive.httpost(element , "/Proposal/kssHooPlenumsdAddGrid").subscribe((data:any)=>{
        
          })
    
          
          
        }
        // console.log(newHood, "nh")
        // console.log(newHood[0], "nh0")
        for (let index = 0; index < newHood[indexx].ductTables.length; index++) {
          const element = newHood[indexx].ductTables[index];
          element.hoodID=hoodID
          this.ApiServive.httpost(element , "/Proposal/kssHoodDuctAddGrid").subscribe((data:any)=>{
          this.getHoods()
          this.getHoodsDuct(hoodID)
            this.getHoodsPlenums(hoodID)
            // this.kitchenForm.reset()
            this.kitchenData  = {
              kitchenName: '',
              responsePanel: false,
              kitchenLength: "",
              kitchenWidth: "",
              kitchenHeight: "",
              suppressionSystemType: '', 
              temperatureBelow5C: '', 
              systemOperationType: '', 
              annunciationDevice: '', 
              requirementAnnunciationType: '', 
              gasShutoffValve: '', 
              requirementGasShutoffValveType: '', 
              annunciationType: '', 
              gasShutoffValveRequirement: '', 
              shutoffsizeK:'',
              kssID: 0,
              hoodIDs: '',
            ID:0,
              selectedHoods:[]
            };
            this.initializeHoodsArray(0,false)
            this.noOfHoodsN=0
            alert("Successfully Added")
            // setTimeout(() => {
            //  window.location.reload()
              
            // }, 1500);
          })
    
          
          
        }
      })
      // console.log(index, " index")
      // console.log(newHood.length , " ..newhood length")
      // console.log(index==newHood.length)
  
    }

   



    this.kitchenForm.get('hoods')?.reset(); 
  }
  showA:number=0
  checkLength(e: any) {
    // this.sho/wA=0
    let length = String(e.target.value);
    let name = e.target.name;
  
    if (length.length < 4 && length!="") {
      alert(name + " should be minimum 4 digits.");
      e.target.value=''
      // this.showA = 1; // Set showA to 1 to prevent further alerts
    }
  }
  
  checkLengthHood(e:any) {
    let length = String(e.target.value)
    let name = e.target.name
    if(length.length<3 && length!="" ){

     alert(name+"  should be minimum 3 digits.")
     e.target.value=''

    }
   }
 



  updateHood() {
    // alert(this.IID)
    // alert(this.ProspectCode)

    // Assuming kitchenForm.value contains the form values
    const newHood = this.kitchenForm.get('hoods')?.value;
    // this.hoods.push(newHood);
    // console.log(this.hoods, "hoods");
    newHood.map((i:any)=>{
i.kssID=this.IID
    })
    // newHood.forEach((i:any)=>{
    //   this.hoodIDs.push(i.)
    // })
    
    newHood.map((i:any)=>{
      i.prospectCode=this.ProspectCode
          })
    // newHood[0].=this.
    console.log(JSON.stringify(newHood[0]), "nh0")
    console.log(newHood, "nh")

    for (let index = 0; index < newHood.length; index++) {
      const elementHood = newHood[index];
      this.ApiServive.httpost(elementHood , "/Proposal/kssHoodUpdate").subscribe((data:any)=>{

    
      //  // console.log("response hood ,", data.data[0])
        let hoodID =elementHood.hoodID
        this.hoodIDs.push(hoodID)
        // console.log(this.hoodIDs, "hoods ids")
        // console.log(hoodID, "original hood id inside for loop without  condition")
        // if(index==newHood.length-1){
        //   console.log(this.hoodIDs, "hood ids inside for loop ")
        //   this.onSubmit()
        // }
        // alert(hoodID)
        // console.log(newHood[0].plenums, " plenummmmsssss")
        for (let indexz = 0; indexz < elementHood.plenums.length; indexz++) {
          const element = elementHood.plenums[indexz];
          element.hoodID=hoodID
          element.type=this.tempHoodTypeForPlenum=='wall'?'Wall Plenum':'V-Plenum'

          console.log(element, "plenum update")
          this.ApiServive.httpost(element , "/Proposal/kssHooPlenumsUpdate").subscribe((data:any)=>{
        
          })
    
          
          
        }
        for (let index = 0; index < newHood[0].ductTables.length; index++) {
          const element = newHood[0].ductTables[index];
          element.hoodID=hoodID
          console.log(element , " duct")
          this.ApiServive.httpost(element , "/Proposal/kssHoodDuctUpdate").subscribe((data:any)=>{
    alert("Updated Successfully")
// this.resetForm()

  this.kitchenData.kitchenName=''
  this.kitchenData.kitchenHeight=''
  this.kitchenData.kitchenLength=''
  this.kitchenData.kitchenWidth=''
  this.kitchenData.shutoffsizeK=''
this.noOfHoodsN=0
this.initializeHoodsArray(this.noOfHoodsN,false)
this.isUpdate=false
this.IsDisabled=false
          this.getHoods()
          this.getHoodsDuct(hoodID)
            this.getHoodsPlenums(hoodID)
          })
    
          
          
        }
    })
      //   // // console.log(newHood, "nh")
      //   // // console.log(newHood[0], "nh0")
 
      // })
      // console.log(index, " index")
      // console.log(newHood.length , " ..newhood length")
      // console.log(index==newHood.length)
  
    }

   



    // this.kitchenForm.get('hoods')?.reset(); 
  }



 
 // Inside your component class
viewPlenum(hood: any): void {
  // console.log(index)
console.log( hood ,"plllll")
this.plenumData=hood.plenums
  // const dialogRef = this.dialog.open(PlenumDetailsModalComponent, {
  //   width: '80%',
  //   data: plenums
  // });
  // console.log(this.hoods[0][index].plenums)

}



  
  editHood(index: number): void {

  }

  deleteHood(index: number): void {
  
    (this.kitchenForm.get('hoods') as FormArray).removeAt(index);
  }
  


  viewDuct(hood: any) {
    let data =hood.ductTable
    this.ductData=data
    // c/onsole.log(data)
    // const dialogRef = this.dialog.open(DuctDetailsModalComponent, {
    //   width: '80%',
    //   data: data
    // });
    // console.log(this.hoods)
    // console.log(this.hoods[0][index].ductTable , "dc")

  }
  updateAvailableHoods() {
    const selectedKitchenData = this.gridData.find((kitchen:any) => kitchen.KitchenName === this.equipmentForm.selectedKitchen);
  // console.log(selectedKitchenData , "sk")
    this.availableHoods = selectedKitchenData ? selectedKitchenData.selectedHoods : [];
    this.availableHoods = this.availableHoods.filter(hood => !this.submittedEquipmentList2.find(eq => eq.selectedHood === hood.hoodName));

    // console.log(this.availableHoods, " ah")
  }
  hoodTypeSelected:any
  updateHoodEq(val:any){
    console.log(this.availableHoods)
    console.log(val, 'sh')

    let f =this.availableHoods.filter(i=>i.hoodName==val.target.value)
    this.hoodTypeSelected=f[0].hoodType
  }
  onSubmit() {
    debugger
    console.log(this.kitchenForm.get('shutoffsizeK')?.value
      , "hood id inside kitchen.............")
    const kitchenDataItem: KitchenDataItem = {
      kitchenName: this.kitchenData.kitchenName,
      responsePanel: this.kitchenData.responsePanel,
      kitchenLength: this.kitchenData.kitchenLength,
      kitchenWidth: this.kitchenData.kitchenWidth,
      kitchenHeight: this.kitchenData.kitchenHeight,
      suppressionSystemType: this.kitchenForm.value.suppressionSystemType||'',
      temperatureBelow5C: this.kitchenForm.value.temperatureBelow5C||'',
      systemOperationType: this.kitchenForm.get('systemOperationType')?.value||'',
      annunciationDevice: this.kitchenForm.get('annunciationDevice')?.value||'',
      requirementAnnunciationType: this.kitchenForm.get('requirementAnnunciationType')?.value||'',
      gasShutoffValve: this.kitchenForm.get('gasShutoffValve')?.value||'',
      requirementGasShutoffValveType: this.kitchenForm.get('gasShutoffValveType')?.value||'',
      annunciationType: this.kitchenForm.get('annunciationType')?.value,
      gasShutoffValveRequirement: this.kitchenForm.get('gasShutoffValveRequirement')?.value||'',
      shutoffsizeK: this.shutoffsizeK||'',

      kssID: this.IID,
      ID:0,
      hoodIDs: JSON.stringify(this.hid),
      selectedHoods: this.kitchenData.selectedHoods.slice(),
    };
    
    this.gridData.push(kitchenDataItem);
    // console.log(k/itchenDataItem, "gruid data")
this.ApiServive.httpost(kitchenDataItem, "/Proposal/insertUL").subscribe((data)=>{
  this.hid=[]
this.getKitchenRoom()
})    
    // console.log(this.gridData , "kitcgen")

    // Clear form fields after submission
    this.resetForm();
  }


  updateKitchen() {
    console.log(this.hoodIDs
      , "hood id inside kitchen.............")
    const kitchenDataItem: KitchenDataItem = {
      kitchenName: this.kitchenData.kitchenName,
      responsePanel: this.kitchenData.responsePanel,
      kitchenLength: this.kitchenData.kitchenLength,
      kitchenWidth: this.kitchenData.kitchenWidth,
      kitchenHeight: this.kitchenData.kitchenHeight,
      suppressionSystemType: this.kitchenForm.value.suppressionSystemType,
      temperatureBelow5C: this.kitchenForm.value.temperatureBelow5C,
      systemOperationType: this.kitchenForm.get('systemOperationType')?.value,
      annunciationDevice: this.kitchenForm.get('annunciationDevice')?.value,
      requirementAnnunciationType: this.kitchenForm.get('requirementAnnunciationType')?.value,
      gasShutoffValve: this.kitchenForm.get('gasShutoffValve')?.value,
      requirementGasShutoffValveType: this.kitchenForm.get('gasShutoffValveType')?.value,
      annunciationType: this.kitchenForm.get('annunciationType')?.value,
      gasShutoffValveRequirement: this.kitchenForm.get('gasShutoffValveRequirement')?.value,
      shutoffsizeK:this.shutoffsizeK,
      kssID: this.IID,
      hoodIDs: this.kitchenData.hoodIDs,
      ID:this.kitchenData.ID,
      selectedHoods: this.kitchenData.selectedHoods.slice(),
    };
    
    this.gridData.push(kitchenDataItem);
    
    // console.log(kitchenDataItem, "gruid data")
this.ApiServive.httpost(kitchenDataItem, "/Proposal/updateKSS").subscribe((data)=>{
this.getKitchenRoom()
})    
    // console.log(this.gridData , "kitcgen")

    // Clear form fields after submission
    this.resetForm();
  }

  resetForm() {
    // this.kitchenData = {
    //   kitchenName: '',
    //   responsePanel: false,
    //   kitchenLength: null,
    //   kitchenWidth: null,
    //   kitchenHeight: null,
    //   selectedHoods: [],
    // };
  }

  viewHoods(hoods:any) {
    
    // Implement the logic to display the details of the selected hoods
    this.kitchenHoods=hoods
    console.log('View Hoods:', hoods);
  }
  deleteItem(index: number) {
  this.hoods2[0].splice(index,1)
  }

  editItem(arr: any) { 
    // alert("00")
for (let index = 0; index < arr.length; index++) {

  const element = arr[index];
  this.isUpdate=true
  const hoodsArray = this.kitchenForm.get('hoods') as FormArray;
  const selectedHood = this.hoods2[0][element];
  console.log(selectedHood, "hiooiood")
  this.hoodToUpdate=selectedHood.hoodID
  const hoodFormGroup = hoodsArray.at(index) as FormGroup;

  hoodFormGroup.patchValue({
    hoodID:selectedHood.hoodID,
    hoodName: selectedHood.hoodName,
    hoodLength: selectedHood.hoodLength,
    hoodWidth: selectedHood.hoodWidth,
    hoodHeight: selectedHood.hoodHeight,
    hoodType: selectedHood.hoodType,
    noOfPlenum: selectedHood.noOfPlenum,
    largestApplianceOilCap: selectedHood.largestApplianceOilCap,
    shutoffsize:selectedHood.shutoffsize
  });
  const plenumsArray = hoodFormGroup.get('plenums') as FormArray;


  selectedHood.plenums.forEach((plenumItem: any) => {
    const plenumGroup = this.fb.group({
      hoodIndex:index,
      plenumID:plenumItem.plenumID,
      

      type: plenumItem.type,
      length: plenumItem.length,
      depth: plenumItem.depth,
      height: plenumItem.height,
      distanceFromLeft: plenumItem.distanceFromLeft,
     
    });
    console.log(selectedHood, "hiooiood11222")

    console.log(plenumItem.type)
// console.log(hoodsArray.get("plenums"), "..../l")
    plenumsArray.push(plenumGroup);
  });

  console.log(plenumsArray, "//..plenum array")
this.plenumsEditing = selectedHood.plenums;
  // Update ductTables FormArray
  const ductTableArray = hoodFormGroup.get('ductTables') as FormArray;
  while (ductTableArray.length !== 0) {
    ductTableArray.removeAt(0);
  }

  selectedHood.ductTable.forEach((ductTableItem: any) => {
    const ductTableGroup = this.fb.group({
      hoodIndex:index,
      ductType: ductTableItem.ductType,
      
ductID:ductTableItem.ductID,


      rectangularDuct: this.fb.group({
        noOfDuctRectangular: ductTableItem.noOfDuctRectangular,
        lengthRectangular: ductTableItem.lengthRectangular,
        widthRectangular: ductTableItem.widthRectangular,
        areaRectangular: ductTableItem.areaRectangular,
      }),
      circularDuct: this.fb.group({
        noOfDuctCircular: ductTableItem.noOfDuctCircular,
        diameterCircular: ductTableItem.diameterCircular,
        areaCircular: ductTableItem.areaCircular,
      }),
    });

    ductTableArray.push(ductTableGroup);
  });

}


  
    // this.isUpdate = true;
    // Add additional logic if you have nested form arrays
  }
  deleteKitchen(k: any): void {
console.log(k)
let id = k.ID
this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deleteKitchen").subscribe(
  (response: any) => {
   this.getHoods()
  },
  (err) => {
  }
);
    // Implement your logic to handle deletion of the kitchen at the given index
    // You may want to confirm the deletion and then remove the kitchen from the gridData array
    // Example: this.gridData.splice(index, 1);
  }



  deleteEq(k: any): void {
    console.log(k)
    let id = k.id
    this.ApiServive.httpgetMaster("&id="+id, "/Proposal/deleteKitchenEQ").subscribe(
      (response: any) => {
       this.getEquipments()
      },
      (err) => {
      }
    );
        // Implement your logic to handle deletion of the kitchen at the given index
        // You may want to confirm the deletion and then remove the kitchen from the gridData array
        // Example: this.gridData.splice(index, 1);
      }




  editKitchen(index: number) {
    this.IsDisabled=true
    this.toggleDisable()
    this.noOfHoods=[]
    this.noOfHoods= JSON.parse(this.gridData[index].HoodIDs)
    this.noOfHoodsN=this.noOfHoods.length
    this.initializeHoodsArray(this.noOfHoodsN,false)
    const editedKitchen = { ...this.gridData[index] };
    // editedKitchen.selectedHoods = [...this.kitchenData.selectedHoods];
    
    const kitchenId = editedKitchen.ID;
  const selectedKitchen = this.gridData[index];
  this.kitchenData.kitchenName = selectedKitchen.KitchenName;
  this.kitchenData.responsePanel = selectedKitchen.responsePanel;
  this.kitchenData.kitchenLength = String(selectedKitchen.DimensionOfKitchenLength);
  this.kitchenData.kitchenWidth = String(selectedKitchen.DimensionOfKitchenWidth);
  this.kitchenData.kitchenHeight = String(selectedKitchen.DimensionOfKitchenHeight);
  this.kitchenData.suppressionSystemType = selectedKitchen.suppressionSystemType;
  this.kitchenData.temperatureBelow5C = selectedKitchen.temperatureBelow5C;
  this.kitchenData.systemOperationType = selectedKitchen.systemOperationType;
  this.kitchenData.annunciationDevice = selectedKitchen.annunciationDevice;
  this.kitchenData.requirementAnnunciationType = selectedKitchen.requirementAnnunciationType;
  this.kitchenData.gasShutoffValve = selectedKitchen.gasShutoffValve;
  this.kitchenData.requirementGasShutoffValveType = selectedKitchen.requirementGasShutoffValveType;
  this.kitchenData.annunciationType = selectedKitchen.annunciationType;
  this.kitchenData.gasShutoffValveRequirement = selectedKitchen.gasShutoffValveRequirement;
  this.kitchenData.kssID = selectedKitchen.kssID;
  this.kitchenData.hoodIDs = selectedKitchen.HoodIDs;
  this.kitchenData.ID = selectedKitchen.ID;
// console.log(this.kitchenData)
  // console.log(this.hoods2[0], "..//hh")
  
  const matchingHood = this.hoods2[0].find((item: any) => (JSON.parse(selectedKitchen.HoodIDs).includes(item.hoodID)));
// console.l/og(matchingHood, "...mtching");
this.kitchenData.selectedHoods=[matchingHood]
    const kitchenIndex = this.gridData.findIndex((kitchen) => kitchen.ID === kitchenId);
  // console.log(editedKitchen, "edit")
  // console.log(this.gridData[index].selectedHoods)
// console.log(this.hoods2[0])
// const selectedHoods = this.gridData[index].selectedHoods.findIndex((id:any) => this.hoods2[0].some((hood:any) => hood.hoodID === id.hoodID));
const selectedHoodss = this.gridData[index].selectedHoods.map((id:any) => {
  return this.hoods2[0].findIndex((hood:any) => hood.hoodID === id.hoodID);
});

// selectedHoods will now contain the hoods from hoods2[0] whose IDs match the IDs in selectedHoodIDs
console.log(selectedHoodss , "sh");
this.editItem(selectedHoodss)
    if (kitchenIndex !== -1) {
      this.gridData[kitchenIndex] = editedKitchen;
// console.log(editedKitchen , "editingh./.")
    } else {
      // console.error('Kitchen not found for editing.');
    }
  }
  
  updateHoods(){
    let updatedHodd = this.kitchenForm.get('hoods')?.value
    let updatedKitchen = this.kitchenForm?.value
    console.log(this.plenumsEditing, "pm edit")
    // updatedHodd[0].plenums= this.plenumsEditing
// ,,
    console.log(this.kitchenData)
    // first update kitchen details = 
    this.updateKitchen()
    // second update hoods and other child element of hoods 
    console.log(updatedHodd)
    this.updateHood()
  }
  toggleSelection(value: string): void {
    if (this.isSelected(value)) {
      this.kitchenData.selectedHoods = this.kitchenData.selectedHoods.filter(item => item !== value);
    } else {
      this.kitchenData.selectedHoods.push(value);
    }
  }
  

  isSelected(value: string): boolean {
return this.kitchenData.selectedHoods.includes(value)
  }
  

  removeSelectedHood(value: any): void {
    this.kitchenData.selectedHoods = this.kitchenData.selectedHoods.filter(item => item !== value);
  }

  toggleSelectList(): void {
    this.isSelectListOpen = !this.isSelectListOpen;
  }
  
  downloadAttachment(id: number): void {
    const attachment = this.attachments.find(att => att.id === id);
    if (attachment) {
      this.attachmentService.downloadAttachment(attachment.id);
    }
  }

  deleteAttachment(id: number): void {
    this.attachmentService.deleteAttachment(id);
    this.refreshAttachments();
  }

  private refreshAttachments(): void {
    this.attachmentService.getAttachments().subscribe((attachments) => {
      this.attachments = attachments;
      // console.log('Updated Attachments:', this.attachments);
    });
  }
  
  submitPlenumForm() {
    // Handle plenum form submission
    // console.log('Plenum Form Submitted:', this.plenumForm.value);
    // Navigate to the next step or perform further actions
  }


  private modalService = inject(NgbModal);
	closeResult = '';

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

	openWindowCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { windowClass: 'dark-modal' });
	}

	openSm(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl' });
	}

	openLg(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl' });
	}

	openXl(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'xl' });
	}

	openFullscreen(content: TemplateRef<any>) {
		this.modalService.open(content, { fullscreen: true });
	}

	openVerticallyCentered(content: TemplateRef<any>) {
    // console.log(content , "view hoods ssss")
		this.modalService.open(content, { centered: true ,size: 'xl'});
    // this.viewHoods(content)
	}

	

	openModalDialogCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { modalDialogClass: 'dark-modal' });
	}
  submitInputsheet()
  {
    // remarks store 
let q = "&remarks="+this.remarks+"&id="+this.IID
this.ApiServive.httpgetMaster(q, "/Proposal/updateRemarks").subscribe((i:any)=>{

})
    this.ApiServive.httpgetMaster("&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.currentUser+"&PID=3&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        console.log(response.data);
        // alert(response.data[0].messageBox)
        const modalRef = this.modalService.open(ConfirmPopupComponent);
        modalRef.componentInstance.name = response.data[0].messageBox;
        modalRef.componentInstance.proposalCode=this.ProspectCode;
        modalRef.componentInstance.proposalType='System';
      },
      (err) => {
      }
    );
  }
  scrollONnext()
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

interface KitchenDataItem {
  kitchenName: string;
  responsePanel: boolean;
  kitchenLength: string | null;
  kitchenWidth: string | null;
  kitchenHeight: string | null;
  suppressionSystemType: string; // adjust the type accordingly
  temperatureBelow5C: string; // adjust the type accordingly
  systemOperationType: string; // adjust the type accordingly
  annunciationDevice: string; // adjust the type accordingly
  requirementAnnunciationType: string; // adjust the type accordingly
  gasShutoffValve: string; // adjust the type accordingly
  requirementGasShutoffValveType: string; // adjust the type accordingly
  annunciationType: string; // adjust the type accordingly
  gasShutoffValveRequirement: string; // adjust the type accordingly
  kssID: number;
  shutoffsizeK : string;
  hoodIDs: string;
  ID:number;
  selectedHoods: any[]; // adjust the type accordingly
}



