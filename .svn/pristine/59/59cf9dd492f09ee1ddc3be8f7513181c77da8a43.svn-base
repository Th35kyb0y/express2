// import { Component } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import { ApiService } from 'src/app/service/api.service';
import { ApiService } from 'src/app/services/api.service';
// import { restAPIPath } from 'src/app/service/restAPI-Path';
import { restapiURL as  restAPIPath } from 'src/app/services/restapi-url';
import { KSSEntity_New, KSSDimensionofHoodEntity, KSSFryersEntity, KSSHoodDuctEntity, KitchenRoomEntity, PlenumEntity, KitchenEquipmentEntity, KitchenEquipmentDetailEntity, fileSaveEntity } from 'src/app/models/proposal/KSS-Entity';
// import { FileUploadEntity } from 'src/app/pages/cep/_model/FileUpload';
import { FileUploadEntity } from '../Inputsheet';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CustomFilterPipe } from 'src/app/pipes/customPipe';
declare var $: any;





@Component({
  selector: 'app-kitchen-wise',
  templateUrl: './kitchen-wise.component.html',
  styleUrls: ['./kitchen-wise.component.scss']
})
export class KitchenWiseComponent implements OnInit {
  @Output('callback') callback = new EventEmitter<string>();

isSubmit: string='false'
  page = 1;
  showTabHoodw:number=1
  pageSize = 4;
  showPage: number = 1;
  SortFocus: number = 0;
  operated: string='0'
  annuc: string='0'
  wise: string ='Common for kitchen'
  typeAnnuc:string='0'
  gshut : string='0'
  wiseGas : string='0'
  gsVtype : string='0'
  collectionSize = 0;
  IsReverseOrder: boolean = false;
  objKSSEntity: KSSEntity_New;
  objKSSEntityForGrid: KSSEntity_New;
  objKSSEntityList: KSSEntity_New= new KSSEntity_New();
  IsNoOfHoods: any = [];
  objKitchenRoomEntity: KitchenRoomEntity;
  objKitchenRoomEntityList: KitchenRoomEntity[]=[new KitchenRoomEntity()];
  objKitchenRoomEntityListFilter: KitchenRoomEntity[] = [new KitchenRoomEntity()];
hoods:any[]=[]
  KssIDOriginal : any
  objKitchenRoomEntityListForInnerGrid: KitchenRoomEntity[] = [new KitchenRoomEntity()];
  objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity();
  objKSSDOHEntityList: KSSDimensionofHoodEntity[] = [new KSSDimensionofHoodEntity()];
  objKSSDOHEntityListForddlHood: KSSDimensionofHoodEntity[] = [new KSSDimensionofHoodEntity()];
  objKSSFryersEntity = new KSSFryersEntity();
  objKSSFryersEntityList: KSSFryersEntity[] = [new KSSFryersEntity()];
  objKSSFryersEntityListForInnerGrid: KSSFryersEntity[] = [new KSSFryersEntity()];
  objKSSHoodDuctEntity: KSSHoodDuctEntity = new KSSHoodDuctEntity();
  objKSSHoodDuctEntityList: KSSHoodDuctEntity[] = [new KSSHoodDuctEntity()];
  objKSSHoodDuctEntityListForInnerGrid: KSSHoodDuctEntity[] = [new KSSHoodDuctEntity()];
  objKitchenEquipmentEntity: KitchenEquipmentEntity = new KitchenEquipmentEntity();
  objKitchenEquipmentEntityList: KitchenEquipmentEntity[] = [new KitchenEquipmentEntity()];
  isAddMore: boolean = false;
  objFileUploadEntity = new FileUploadEntity();
  objFileUploadEntityList: FileUploadEntity[] = [new FileUploadEntity()];
  
  ObjfileSaveEntity: fileSaveEntity;
  CurrentUser: any;
  @Input() ProspectCode: any;
  @Input() KssID: any;
  @Input() IID: any;
  @Input() dataToSend: any;
  @Input() isUpdate: string = 'false';
  @Input() ddlProspect: any;
  @Input() readonly: string = 'false';
  @Input() sheetName: string='';
  @Input() toShowUL: any;
  

objKitchenEquipmentDetailEntityList2 : any[]=[]
  ShowtabActive: number = 1;
  objGSSFile: File | null = null;

  list: any[]=[];
  IsShow: boolean = false;
  objKitchenEquipmentDetailEntityList: any = [];
  objKitchenEquipmentDetailEntityListForSideA: KitchenEquipmentDetailEntity[] = [];
  objKitchenEquipmentDetailEntityListForSideB: KitchenEquipmentDetailEntity[] = [];
  objKitchenEquipmentDetailEntity: KitchenEquipmentDetailEntity = new KitchenEquipmentDetailEntity();
  objKSSDimensionofHoodEntityList: KSSDimensionofHoodEntity[] = [];
  
  ddlNameOfKitchen: string = "0";
  ddlNameOfHood: string = "0";
  IsDisableForEquipDtl: boolean = false;
  tempPlenumType: string = '';
  KitchenRoomNumber: number = 0;
  ToggleChangeValue: any = true;
  filterargsForA = {Side: 'Side_A'};
  filterargsForB = {Side: 'Side_AB'};
  btnAddDetails:boolean=false;
  KitchenBtnTitle:string='';
  KitchenEquipBtnTitle:string='';
  typeOFkiUp: string=''
  tempUp: string=''
  constructor(public ApiServive: ApiService) {
    this.objKSSEntity = new KSSEntity_New();
    this.objKSSEntityForGrid=new KSSEntity_New;
    this.objKSSEntityList= new KSSEntity_New();
    this.IsNoOfHoods= [];
    this.objKitchenRoomEntity= new KitchenRoomEntity;
    this.objKitchenRoomEntityList=[new KitchenRoomEntity()];
    this.objKitchenRoomEntityListFilter = [new KitchenRoomEntity()];
    this.ObjfileSaveEntity=new fileSaveEntity
    // this.objKSSEntityList= [new K/SSEntity_New()];
    // this.CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    const userString = localStorage.getItem('CurrentUser');
if (userString !== null) {
  this.CurrentUser = JSON.parse(userString);
}

  }


  // addHoods(PL: any) {
  //   debugger
  //   PL.isShowHoods = !PL.isShowHoods;
  //   this.IsShow = !this.IsShow;
  //   // if(this.IsNoOfHoods.length<(index+1)){
  //   //   this.IsNoOfHoods.push(index);
  //   // }
  //   //  this.IsNoOfHoods[index]=!this.IsNoOfHoods[index]
  //   //
  // }

  BindToolTips() {
    $('a[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'bottom',
      html: true
    });
  }

  // @ViewChild('tt', { static: false }) mytooltip: NgbTooltip;
 
  ngOnInit() {
    // alert(this.toShowUL)
    // alert(this.IID)
    // alert(this.IID)
    // this.KssID=this.IID
    // alert("ryyyy")TypeOfKitchenRequired
    // alert(this.dataToSend)
// this.typeOFkiUp='Water_Mist'

    this.KitchenBtnTitle='Add To Grid';
    this.KitchenEquipBtnTitle='Add To Grid';

    this.BindProposalList();
    this.BindKitchenRoomDetailsList();
    this.BindKitchenEquipDetailsList();
    this.objKitchenEquipmentEntity = new KitchenEquipmentEntity();
    this.ObjfileSaveEntity = new fileSaveEntity();
    this.objKSSEntity = new KSSEntity_New();
    // this.objKSSEntity.TypeOfKitchenRequired='Water_Mist'
    // this.objKSSEntity.TypeOfKitchenRequired='Water_Mist'

    // this.objKSSEntityList = [];
    this.objKitchenRoomEntity = new KitchenRoomEntity();
    this.objKSSEntity.objKitchenRoomEntityList = [];
    this.objKitchenRoomEntityListForInnerGrid = [];
    // this.objKitchenRoomEntityListFilter = [];
    this.objKSSDimensionofHoodEntityList = [];
    // this.objKitchenRoomEntityList = [];
    this.objKSSFryersEntity = new KSSFryersEntity();
    this.objKSSHoodDuctEntity = new KSSHoodDuctEntity();
    this.objKSSHoodDuctEntityList = [];
    this.objKSSHoodDuctEntityListForInnerGrid = [];
    this.objKSSFryersEntityList = [];
    this.objKSSFryersEntityListForInnerGrid = [];
    this.objFileUploadEntity = new FileUploadEntity();
    this.objKSSEntity.KSSId = 0;
    this.objKSSDOHEntityList = [];
    this.objFileUploadEntityList = [];
  
    this.objKitchenEquipmentEntityList = [];
    this.objKitchenEquipmentDetailEntity = new KitchenEquipmentDetailEntity();
    this.objKitchenEquipmentDetailEntityListForSideA= [];
    this.objKitchenEquipmentDetailEntityListForSideB = [];
    // this.BindFryersList();
    // this.BindDuctsList();
    // // this.BindKSSList();

    // this.BindKSSDimensionofHoodList();
    this.BindKitchenList();
    this.BindAttachement();
    if(this.toShowUL){
      this.objKSSEntity.TypeOfKitchenRequired='KSS-ULtra(UL)'
    }
    if(this.dataToSend){
      // this.objKSSEntity=this.dataToSend[0]
// alert("Exist")
// this.typeOFkiUp=this.dataToSend[0].TypeOfKitchenRequired
this.tempUp=this.dataToSend[0].Temperature
    }
    this.annuc='No'
    this.objKSSEntity.Temperature='No'
    
    // this.objKSSEntity.TypeOfKitchenRequired='Water_Mist'

  }
  ProposalDetail: any = []
  BindProposalList() {
 
    var query1 = '&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/ProposalDetails',).subscribe((data:any) => {
      if (data.Status === true) {
        // debugger
        this.ProposalDetail = data.Data;
        console.log(data.Data)
      }
    });
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
  updateKSS(){
    
  }
  callbackEvent(w:any){
    // alert(w) 
  this.hoods=w
  console.log(this.hoods, "hoods")
  }
  AddKithchenDetails2(){
    // alert(this.KssIDOriginal)
    this.objKSSEntity.Flag = 'Insert';
  
      this.objKSSEntity.KSSId =this.KssIDOriginal;
    
    this.objKSSEntity.ProspectCode = this.ProspectCode;
    // this.objKSSEntity.NoOfKitchen = this.objKSSEntity.NoOfKitchen;
    this.objKSSEntity.NoOfKitchen = 1;
    this.objKSSEntity.CreatedBy = this.CurrentUser.EmpCode;
    this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
    this.objKSSEntity.sheetName= this.sheetName
    this.btnAddDetails=true;
    this.KitchenBtnTitle='Add To Grid'
    this.ApiServive.httpost(this.objKSSEntity, 'Inputsheet/addMoreKitchen').subscribe(
      (data :any)=> {
        if (data.Status === true) {
          alert(data.Data.MessageBox );
          this.KssID = data.Data.IID;
          this.KssIDOriginal =data.Data.IID
          // alert(this.KssID)

          // this.objKitchenRoomEntityList = [];
          // this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
   
          // // this.objKSSEntity = new KSSEntity_New();
          this.BindKitchenRoomDetailsList();
         
          // this.btnAddDetails=true;
          // this.KitchenBtnTitle='Add To Grid'
          // // // this.objKSSEntity = new KSSEntity_New();
          // this.BindKitchenRoomDetailsList();
        }
        else {
          alert(data.Data.Message);
        }
      });
  }

  AddKithchenDetails() {
    
    // if (this.objKitchenRoomEntityList.length < this.objKSSEntity.NoOfKitchen) {
    //   if (this.objKitchenRoomEntity.NameOfKitchen == undefined) {
    //     alert('Kitchen is require.');
    //     return;
    //   }
    this.objKSSEntity.Flag = 'Insert';
    if (!this.KssID) {
      this.objKSSEntity.KSSId = 0;
    } else {
      this.objKSSEntity.KSSId = this.KssID;
    }
    this.objKSSEntity.ProspectCode = this.ProspectCode;
    // this.objKSSEntity.NoOfKitchen = this.objKSSEntity.NoOfKitchen;
    this.objKSSEntity.NoOfKitchen = 1;
    this.objKSSEntity.CreatedBy = this.CurrentUser.EmpCode;
    this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
    this.objKSSEntity.sheetName= this.sheetName
    this.objKSSEntity.SystemOperationType= this.operated
    this.objKSSEntity.Annunciationdevice= this.annuc
    this.objKSSEntity.annucRequirement= this.wise
    this.objKSSEntity.annucType= this.typeAnnuc
    this.objKSSEntity.GasShutOffValve= this.gshut
    this.objKSSEntity.GasShutOffValveReq= this.wiseGas
    this.objKSSEntity.GasshutoffvalveType= this.gsVtype





    
    this.btnAddDetails=true;
    this.KitchenBtnTitle='Add To Grid'
    this.ApiServive.httpost(this.objKSSEntity, '/Proposal/KSSRoomDetailsAction').subscribe(
      (data:any) => {
        if (data.Status === true) {
          alert(data.Data.MessageBox );
          this.KssID = data.Data.IID;
          this.KssIDOriginal =data.Data.IID
          // alert(this.KssID)

          // this.objKitchenRoomEntityList = [];
          this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
         if(this.isAddMore){
          // delete extra created sheet 
          let q1 = "&kssid="+this.KssID
    this.ApiServive.httpget(q1, "Inputsheet/deleteExtraKss").subscribe(
      (data:any)=>{
        alert("Successfully Added More Kitchen")
      }
    )
         }
          // // this.objKSSEntity = new KSSEntity_New();
          this.BindKitchenRoomDetailsList();
         
          // this.btnAddDetails=true;
          // this.KitchenBtnTitle='Add To Grid'
          // // // this.objKSSEntity = new KSSEntity_New();
          // this.BindKitchenRoomDetailsList();
        }
        else {
          alert(data.Data.Message);
        }
      });
    //   this.objKitchenRoomEntity = new KitchenRoomEntity();
    //   // }
    // }
    // else {
    //   alert('No of Fryers/Burner is more than your input');
    // }
  }

  AddKithchenEquipmentDetails() {
    debugger
    if (this.tempPlenumType == 'V-PLENUM') {
      if (!this.objKitchenEquipmentEntity.Side_B_CYPosition && this.objKitchenEquipmentEntity.Side_B_CYPosition == '0') {
        alert('Please fill the side A all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_B_RunningPipeLength) {
        alert('Please fill the side B all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_B_ManualReleasePosition && this.objKitchenEquipmentEntity.Side_B_ManualReleasePosition == '0') {
        alert('Please fill the side B all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_B_HSTLength) {
        alert('Please fill the side B all Details');
        return;
      }
    } else {
      if (!this.objKitchenEquipmentEntity.Side_A_CYPosition && this.objKitchenEquipmentEntity.Side_A_CYPosition == '0') {
        alert('Please fill the side A all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_A_RunningPipeLength) {
        alert('Please fill the side A all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_A_ManualReleasePosition && this.objKitchenEquipmentEntity.Side_A_ManualReleasePosition == '0') {
        alert('Please fill the side A all Details');
        return;
      }
      if (!this.objKitchenEquipmentEntity.Side_A_HSTLength) {
        alert('Please fill the side A all Details');
        return;
      }
    }
    let temp_Arrry: any = []
    this.objKitchenEquipmentEntity.Flag = 'Insert';
    this.objKitchenEquipmentEntity.KSSId = this.KssID;
    this.objKitchenEquipmentEntity.ProspectCode = this.ProspectCode;
    this.objKitchenEquipmentEntity.CreatedBy = this.CurrentUser.EmpCode;
    // temp_Arrry=this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList;
    
    this.objKitchenEquipmentDetailEntityListForSideA.forEach(element => {
      temp_Arrry.push(element);
    });
    this.objKitchenEquipmentDetailEntityListForSideB.forEach(element => {
      temp_Arrry.push(element);
    });
    
    // temp_Arrry.push(this.objKitchenEquipmentDetailEntityListForSideB);

    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.push();
    this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList=temp_Arrry;
    this.ApiServive.httpost(this.objKitchenEquipmentEntity, '/Inputsheet/KSSKitchenEquipmentAction').subscribe(
      (data:any) => {
        if (data.Status === true) {
          alert(data.Data.MessageBox);
          this.objKitchenEquipmentEntity = new KitchenEquipmentEntity();
          this.KitchenEquipBtnTitle='Add To Grid';
          this.BindKitchenEquipDetailsList();
        }
        else {
          alert(data.Data.Message);
        }
      });
    //   this.objKitchenRoomEntity = new KitchenRoomEntity();
    //   // }
    // }
    // else {
    //   alert('No of Fryers/Burner is more than your input');
    // }
  }


  AddFryers() {
    debugger
    if (this.objKSSFryersEntityList.length < this.objKSSDimensionofHoodEntity.NumberofFryers) {
      // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
      //   alert('Name of hood is require.');
      //   return;
      // }
      if (this.objKSSFryersEntity.FLength == undefined) {
        alert('Fryers Length is require.');
        return;
      }
      if (this.objKSSFryersEntity.FWidth == undefined) {
        alert('Fryers Width is require.');
        return;
      }
      // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
      this.objKSSFryersEntity.Flag = 'Insert';
      this.objKSSFryersEntity.FryersId = Number(1);
      this.objKSSFryersEntity.NameOfHood = this.objKSSDimensionofHoodEntity.NameofHood
      this.objKSSFryersEntity.NoOfFryers = Number(this.objKSSDimensionofHoodEntity.NumberofFryers);
      this.objKSSFryersEntity.ProspectCode = this.ProspectCode;
      this.ApiServive.httpost(this.objKSSFryersEntity, '/Proposal/KSSFryerAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            //alert(data.Data.MessageBox);
            this.BindFryersList();
          }
          else {
            //alert(data.Data.Message);
          }
        });
      this.objKSSFryersEntity = new KSSFryersEntity();
      // }
    }
    else {
      alert('No of Fryers/Burner is more than your input');
    }
  }


  DeleteFryers(item:any) {
    if (confirm('Are you sure to delete this item.')) {
      this.objKSSFryersEntity.Flag = 'Delete';
      this.objKSSFryersEntity.FryersId = item.FryersId;
      this.objKSSFryersEntity.NameOfHood = 'Test'
      this.objKSSFryersEntity.NoOfFryers = Number(1);
      this.objKSSFryersEntity.ProspectCode = this.ProspectCode;
      this.ApiServive.httpost(this.objKSSFryersEntity, '/Proposal/KSSFryerAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            this.BindFryersList();
          }
        });
      this.objKSSFryersEntity = new KSSFryersEntity();
      this.BindKSSDimensionofHoodList();
    }
  }


  BindFryersList() {
    var query1 = '&HoodName=1&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/KSSFryersList').subscribe((data :any) => {
      if (data.Status === true) {
        this.objKSSFryersEntityList = data.Data.filter((a:any) => a.NameOfHood == this.objKSSDimensionofHoodEntity.NameofHood);
        this.objKSSFryersEntityListForInnerGrid = data.Data;
      }
    });
  }

  BindKitchenRoomDetailsList() {    
    this.objKSSEntity = new KSSEntity_New();
    // this.objKSSEntity.TypeOfKitchenRequired='Water_Mist'

    var query1 = '&IID=' + this.KssID + '&ProspectCode=' + this.ProspectCode;
    // var query1 = '&IID='+this.KssID+'&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/KSSRoomDetailsList').subscribe((data :any) => {
      if (data.Status === true) {
        debugger
        // this.objKitchenRoomEntityList = data.Data.filter(a => a.ProspectCode == this.ProspectCode);
        if (data.Data != null) {
          // this.objKSSEntity.TypeOfKitchenRequired = data.Data.TypeOfKitchenRequired;
          if(this.toShowUL){
            this.objKSSEntity.TypeOfKitchenRequired='KSS-ULtra(UL)'
          }
          this.objKSSEntity.ProductId = data.Data.ProductId;
          this.objKSSEntity.Temperature = data.Data.Temperature;
          data.Data.objKitchenRoomEntityList.forEach((element:any) => {
            if (!element.IsShowInputSheetRemarksTbl)
              element.IsShowInputSheetRemarksTbl = false;
          });
          this.objKitchenRoomEntityListFilter = data.Data.objKitchenRoomEntityList;
          this.BindKitchenList();
          // if (this.objKitchenRoomEntityListFilter.length <= this.objKSSEntity.NoOfKitchen) {
          //   this.BindKitchenList();
          // } else {
          //   this.objKSSEntity.objKitchenRoomEntityList = [];
          // }
        } else {
          this.objKSSEntity = new KSSEntity_New();

          // this.objKitchenRoomE/ntityListFilter = [];
        }

      }
    });
  }
  BindKitchenEquipDetailsList() {
    var query1 = '&IID=' + this.KssID + '&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/KSSKitchenEquipmentList').subscribe((data :any) => {
      if (data.Status === true) {
        debugger
        if (data.Data != null) {
          this.objKitchenEquipmentEntityList = data.Data;
        } else {
          this.objKitchenEquipmentEntityList = [];
        }
        // data.Data.objKitchenRoomEntityList.forEach(element => {
        //   if (!element.IsShowInputSheetRemarksTbl)
        //     element.IsShowInputSheetRemarksTbl = false;
        // });
        // this.objKitchenRoomEntityListFilter = data.Data.objKitchenRoomEntityList;
      }
    });
  }


  DeleteKithchenRoom(item:any) {
    if (confirm('Are you sure to delete this item.')) {
      this.objKitchenRoomEntity.Flag = 'Delete';
      this.objKitchenRoomEntity.KitchenId = item.KitchenId;
      this.objKitchenRoomEntity.NameOfKitchen = 'Test'
      this.objKitchenRoomEntity.NoOfKitchen = Number(1);
      this.objKitchenRoomEntity.ProspectCode = this.ProspectCode;
      this.ApiServive.httpost(this.objKitchenRoomEntity, '/Proposal/KSSRoomDetailsAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            this.BindFryersList();
          }
        });
      this.objKitchenRoomEntity = new KitchenRoomEntity();
      this.BindKitchenRoomDetailsList();
    }
  }

  AddDucts() {
    debugger
    if (this.objKSSHoodDuctEntityList.length < this.objKSSDimensionofHoodEntity.NoOfDucts) {
      // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
      //   alert('Name of hood is require.');
      //   return;
      // }
      if (this.objKSSHoodDuctEntity.TypeOfDuct == undefined) {
        alert('Type of ducts is require.')
        return;
      }
      else if (this.objKSSHoodDuctEntity.TypeOfDuct == 'Circular') {
        if (this.objKSSHoodDuctEntity.DuctsDiameter == undefined) {
          alert('Duct Diameter is require.');
          return;
        }
      }
      else if (this.objKSSHoodDuctEntity.TypeOfDuct == 'Rectangular') {
        if (this.objKSSHoodDuctEntity.DuctsLength == undefined) {
          alert('Duct Length is require.');
          return;
        }
        if (this.objKSSHoodDuctEntity.DuctsWidth == undefined) {
          alert('Duct Width is require.');
          return;
        }
      }
      // if (this.objKSSDimensionofHoodEntity.NameofHood != undefined) {
      this.objKSSHoodDuctEntity.Flag = 'Insert';
      this.objKSSHoodDuctEntity.DuctId = Number(1);
      this.objKSSHoodDuctEntity.NameOfHood = this.objKSSDimensionofHoodEntity.NameofHood;
      this.objKSSHoodDuctEntity.NoOfDuct = Number(this.objKSSDimensionofHoodEntity.NoOfDucts);
      this.objKSSHoodDuctEntity.ProspectCode = this.ProspectCode;
      this.ApiServive.httpost(this.objKSSHoodDuctEntity, '/Proposal/KSSDuctAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            //alert(data.Data.MessageBox);
            this.BindDuctsList();
          }
          else {
            //alert(data.Data.Message);
          }
        });
      this.objKSSHoodDuctEntity = new KSSHoodDuctEntity();
      // }
    }
    else {
      alert('No of Duct is more than your input');
    }
  }


  DeleteDucts(item:any) {
    if (confirm('Are you sure to delete this item.')) {
      this.objKSSHoodDuctEntity.Flag = 'Delete';
      this.objKSSHoodDuctEntity.DuctId = item.DuctId;
      this.objKSSHoodDuctEntity.NameOfHood = 'Test'
      this.objKSSHoodDuctEntity.NoOfDuct = Number(1);
      this.objKSSHoodDuctEntity.ProspectCode = this.ProspectCode;
      this.ApiServive.httpost(this.objKSSHoodDuctEntity, '/Proposal/KSSDuctAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            this.BindFryersList();
          }
        });
      this.objKSSHoodDuctEntity = new KSSHoodDuctEntity();
      this.BindKSSDimensionofHoodList();
    }
  }


  BindDuctsList() {
    var query1 = '&HoodName=1&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/KSSDuctList').subscribe((data :any) => {
      if (data.Status === true) {
        debugger
        this.objKSSHoodDuctEntityList = data.Data.filter((a :any)=> a.NameOfHood == this.objKSSDimensionofHoodEntity.NameofHood);
        this.objKSSHoodDuctEntityListForInnerGrid = data.Data;
      }
    });
  }





  AddHood_ForKss() {
    debugger

    // if (this.objKSSDOHEntityList.length < this.objKSSEntity.NoOfHoods) {
    //   if (this.objKSSDimensionofHoodEntity.NameofHood == undefined) {
    //     alert('Name of hood is require.')
    //     return;
    //   }
    //   if (this.objKSSDimensionofHoodEntity.DOHLength == undefined) {
    //     alert('Length is require.')
    //     return;
    //   }
    //   if (this.objKSSDimensionofHoodEntity.DOHWidth == undefined) {
    //     alert('Width is require.')
    //     return;
    //   }
    //   if (this.objKSSDimensionofHoodEntity.DOHHeight == undefined) {
    //     alert('Height is require.')
    //     return;
    //   }
    //   if (this.objKSSDimensionofHoodEntity.NoOfDucts == undefined) {
    //     alert('No. of ducts is require.')
    //     return;
    //   }


    // if (this.objKSSEntity.NameofHood != undefined) {
    this.objKSSEntity.Flag = 'Insert';
    this.objKSSEntity.ProductId = 1;
    this.objKSSEntity.KSSId = 1;
    // this.objKSSEntity.IID = 1;
    this.objKSSEntity.ProspectCode = this.ProspectCode;
    this.ApiServive.httpost(this.objKSSEntity, '/Proposal/KSSDimensionofHoodAction').subscribe(
      (data :any) => {
        if (data.Status === true) {
          //alert(data.Data.MessageBox);
          this.BindKSSDimensionofHoodList();
        }
        else {
          //alert(data.Data.Message);
        }
      });
    //this.objKSSDOHEntityList.push(this.objKSSDimensionofHoodEntity);
    this.objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity();
    this.objKSSFryersEntityList = [];
    // }
    // }
    // else {
    //   alert('No of Hood is more than your input');
    // }
  }

  DeleteHoods(item:any) {
    if (confirm('Are you sure to delete this item.')) {
      this.objKSSDimensionofHoodEntity.Flag = 'Delete';
      this.objKSSDimensionofHoodEntity.ProductId = 1;
      this.objKSSDimensionofHoodEntity.KSSId = item.KSSId;
      this.objKSSDimensionofHoodEntity.IID = item.IID;
      this.objKSSDimensionofHoodEntity.ProspectCode = item.ProspectCode;
      this.objKSSDimensionofHoodEntity.DOHWidth = item.DOHWidth;
      this.objKSSDimensionofHoodEntity.DOHLength = item.DOHLength;
      this.objKSSDimensionofHoodEntity.DOHHeight = item.DOHHeight;
      this.objKSSDimensionofHoodEntity.NoOfDucts = item.NoOfDucts;
      this.objKSSDimensionofHoodEntity.NameofHood = item.NameofHood;

      this.ApiServive.httpost(this.objKSSDimensionofHoodEntity, '/Proposal/KSSDimensionofHoodAction').subscribe(
        (data :any) => {
          if (data.Status === true) {
            //alert(data.Data.MessageBox);
            this.BindKSSDimensionofHoodList();
          }
          else {
            //alert(data.Data.Message);
          }
        });
      this.objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity();
    }
  }

  BindKSSDimensionofHoodList() {
    this.objKSSFryersEntityList = [];
    var query1 = '&ProductId=1&ProspectCode=' + this.ProspectCode;
    this.ApiServive.httpget(query1, '/Proposal/KSSDimensionofHoodList').subscribe((data :any) => {
      if (data.Status === true) {
        this.objKSSDOHEntityList = data.Data;
        if (this.objKSSDOHEntityList != undefined && this.objKSSDOHEntityList != null && this.objKSSDOHEntityList.length > 0) {
          for (var i = 0; i < this.objKSSDOHEntityList.length; i++) {
            var KSSFryersList = this.objKSSFryersEntityListForInnerGrid.filter(e => e.NameOfHood == this.objKSSDOHEntityList[i].NameofHood);
            var KSSDuctList = this.objKSSHoodDuctEntityListForInnerGrid.filter(e => e.NameOfHood == this.objKSSDOHEntityList[i].NameofHood);
            this.objKSSDOHEntityList[i].objKSSFryersEntityList = KSSFryersList;
            this.objKSSDOHEntityList[i].objKSSHoodDuctEntityList = KSSDuctList;
          }
        }
        this.BindFryersList();
        this.BindDuctsList();
      }
    });
  }
  handleFileInput(files: any) {
let f = files.target.file
    this.objGSSFile = files.item(0);
  }

  SaveAttachement() {
    // this.spinner./show();
    this.objFileUploadEntity.Flag = 'Insert';
    this.objFileUploadEntity.FilesId = 0;
    this.objFileUploadEntity.FilesName = 'KSSFileName_' + this.objFileUploadEntityList.length;
    this.objFileUploadEntity.FilesPath = '';
    this.objFileUploadEntity.FileType = 'KSS';
    this.objFileUploadEntity.ProspectCode = this.ProspectCode;
    this.objFileUploadEntity.ProductId = 1;
    this.objFileUploadEntity.ProductId = 1;
    // this.objFileUploadEntity.IID = this.objKSSEntity.KSSId;
    this.objFileUploadEntity.IID = this.KssID;
    this.objFileUploadEntity.CreatedBy = this.CurrentUser.EmpCode;
    // this.objFileUploadEntity.OriginalFilesName = this.objGSSFile.name;

    // this.objFileUploadEntityList.push(this.objFileUploadEntity);

    // this.ApiServive.httpostWithFile(this.objFileUploadEntity, restAPIPath.SaveFile, this.objGSSFile,).subscribe(
    //   (data :any) => {
    //     if (data.Status === true) {
    //       alert(data.Data.MessageBox);
    //       if (data.Data.Status == true) {
    //         this.ObjfileSaveEntity.FileId = data.Data.PageId;
    //         this.ObjfileSaveEntity.ProspectCode = this.ProspectCode;
    //         // this.ObjfileSaveEntity.KSSId = this.objKSSEntity.KSSId;
    //         this.ObjfileSaveEntity.KSSId = this.KssID;
    //         this.ObjfileSaveEntity.CreatedBy = this.CurrentUser.EmpCode;
    //         this.ObjfileSaveEntity.Id = 0;
    //         this.ObjfileSaveEntity.Flag = 'Insert';

    //         this.ApiServive.httpost(this.ObjfileSaveEntity, restAPIPath.KSSFileSaveKitchenWise).subscribe(
    //           (data :any) => {
    //             if (data.Status === true) {

    //             }
    //           });
    //       }
    //       // this.spinner.hide();
    //       this.objGSSFile = null;
    //       this.BindAttachement();
    //     }
    //     else {
    //       //alert(data.Data.Message);
    //     }
    //   });
  }

  BindAttachement() {
  //   if(this.isUpdate!='true'){
  //     var query1 = '&FilesId=0&ProspectCode=' + this.ProspectCode + '&ProductId=1&IID=' + this.KssID;
  //     this.ApiServive.httpget(query1, restAPIPath.FileUploadedList).subscribe((data :any) => {
  //       if (data.Status === true) {
  //         data.Data.forEach((element:any) => {
  //           var query1 = '&FilesId=' + element.FilesId + '&ProspectCode=' + this.ProspectCode + '&IID=' + this.KssID;
  //           this.ApiServive.httpget(query1, restAPIPath.KSSFileGetListKitchenWise).subscribe(res => {
  //             if (!element.NameOfKitchen) debugger
  //             element.NameOfKitchen = res.Data[0].NameOfKitchen;
  //           });
  //         });
  //         this.objFileUploadEntityList = data.Data;
  //       }
  //     });
  //   }
  //  else{
  //   var query1 = '&FilesId=0&ProspectCode=' + this.ddlProspect + '&ProductId=1&IID=' + this.KssID;
  //   this.ApiServive.httpget(query1, restAPIPath.FileUploadedList).subscribe((data :any) => {
  //     if (data.Status === true) {
  //       data.Data.forEach((element:any) => {
  //         var query1 = '&FilesId=' + element.FilesId + '&ProspectCode=' + this.ProspectCode + '&IID=' + this.KssID;
  //         this.ApiServive.httpget(query1, restAPIPath.KSSFileGetListKitchenWise).subscribe((res:any) => {
  //           if (!element.NameOfKitchen) debugger
  //           element.NameOfKitchen = res.Data[0].NameOfKitchen;
  //         });
  //       });
  //       this.objFileUploadEntityList = data.Data;
  //     }
  //   });
  //  }
  }

  KSSFileSaveKitchenWise() {
    var query1 = '&FilesId=0&ProspectCode=' + this.ProspectCode + '&ProductId=1&IID=' + this.KssID;
    // this.ApiServive.httpget(query1, restAPIPath.FileUploadedList).subscribe((data :any) => {
    //   if (data.Status === true) {

    //     this.objFileUploadEntityList = data.Data;
    //   }
    // });
  }

  DeleteSavedFile(item:any) {

    // if (confirm('Are you sure to delete this item.')) {
    //   this.objFileUploadEntity.Flag = 'Delete';
    //   this.objFileUploadEntity.FilesId = item.FilesId;
    //   this.objFileUploadEntity.FilesName = item.FilesName;
    //   this.objFileUploadEntity.FilesPath = '';
    //   this.objFileUploadEntity.FileType = '';
    //   this.objFileUploadEntity.ProspectCode = this.ProspectCode;
    //   this.objFileUploadEntity.ProductId = 1;
    //   this.objFileUploadEntity.IID = item.IID;
    //   this.objFileUploadEntity.CreatedBy = this.CurrentUser.EmpCode;
    //   this.ApiServive.httpost(this.objFileUploadEntity, restAPIPath.FileUpload).subscribe(
    //     (data :any) => {
    //       if (data.Status === true) {
    //         alert(data.Data.MessageBox);
    //         if (data.Data.Status == true) {
    //           this.ObjfileSaveEntity.FileId = data.Data.PageId;
    //           this.ObjfileSaveEntity.ProspectCode = this.ProspectCode;
    //           this.ObjfileSaveEntity.KSSId = item.IID;
    //           this.ObjfileSaveEntity.CreatedBy = this.CurrentUser.EmpCode;
    //           this.ObjfileSaveEntity.Id = 0;
    //           this.ObjfileSaveEntity.Flag = 'Delete';

    //           this.ApiServive.httpost(this.ObjfileSaveEntity, restAPIPath.KSSFileSaveKitchenWise).subscribe(
    //             (res:any) => {
    //               if (res.Status === true) {
    //               }

    //             });
    //         }

    //         this.BindAttachement();
    //       }
    //       else {
    //         //alert(data.Data.Message);
    //       }
    //     });
    // }

  }

  NextStep1() {
    if (this.objKitchenRoomEntityListFilter.length == 0) {
      alert('Please enter atleast one kitchen detail.')
      return;
    }

    if (this.objKitchenRoomEntityListFilter.length < this.objKSSEntity.NoOfKitchen) {
      alert('Saved kitchen details is less then from input number of kitchen.')
      return;
    }
    // if (this.objKSSEntity.Temperature == '0') {
    //   alert('Select the type of Temperature.')
    //   return;
    // }
    // if (!this.objKSSEntity.NoOfKitchen) {
    //   alert('Fill the atleast one kitchen detail.')
    //   return;
    // }

    this.ShowtabActive = 2;
  }

  NextStepHood(){
    this.ShowtabActive++
    
    this.showTabHoodw++
console.log(this.showTabHoodw,"btn")
console.log(this.hoods , "hoods")
  }
  NextStep2() {
    if (this.ProposalDetail.btnAddDetails == 1) {
      this.ShowtabActive = 3;
      return;
    }
    if(this.objKSSDOHEntityListForddlHood){
    if (this.objKitchenEquipmentEntityList.length < this.objKSSDOHEntityListForddlHood.length) {
      alert('Please fill the Equipment details for all.');
      return;
    }
  }
    // if (this.objKSSEntity.Temperature == '0') {
    //   alert('Select the type of Temperature.')
    //   return;
    // }
    // if (!this.objKSSEntity.NoOfKitchen) {
    //   alert('Fill the atleast one kitchen detail.')
    //   return;
    // }
    this.ShowtabActive = 3;
  }


  SubmittedToDesign() {
    if(this.wise=='For individual hood'){
      this.isSubmit='true'

// submit a dummy kitchen detail for showing sheet = 

this.objKSSEntity.Flag = 'Insert';
if (!this.KssID) {
  this.objKSSEntity.KSSId = 0;
} else {
  this.objKSSEntity.KSSId = this.KssID;
}
this.objKSSEntity.ProspectCode = this.ProspectCode;
// this.objKSSEntity.NoOfKitchen = this.objKSSEntity.NoOfKitchen;
this.objKSSEntity.NoOfKitchen = 1;
this.objKSSEntity.CreatedBy = this.CurrentUser.EmpCode;
this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
this.objKSSEntity.sheetName= this.sheetName
this.objKSSEntity.SystemOperationType= this.operated
this.objKSSEntity.Annunciationdevice= this.annuc
this.objKSSEntity.annucRequirement= this.wise
this.objKSSEntity.annucType= this.typeAnnuc
this.objKSSEntity.GasShutOffValve= this.gshut
this.objKSSEntity.GasShutOffValveReq= this.wiseGas
this.objKSSEntity.GasshutoffvalveType= this.gsVtype






this.btnAddDetails=true;
this.KitchenBtnTitle='Add To Grid'
this.ApiServive.httpost(this.objKSSEntity, '/Proposal/KSSRoomDetailsAction').subscribe(
  (data :any) => {
    if (data.Status === true) {
      // alert(data.Data.MessageBox );
      this.KssID = data.Data.IID;
      this.KssIDOriginal =data.Data.IID
      // alert(this.KssID)
      for (let index = 0; index < this.hoods.length; index++) {
        const element = this.hoods[index];
        // const query = 'ApplianceOilCap='+element.ApplianceOilCap+'&CreatedBy='+element.CreatedBy+'&Flag=Insert&HHeight=4&HLength=4&HWidth=32&IsPlenumLengthSame=0&NumberOfPlenum=1&dontShow=true&ductArray=...&gasShutSize=undefined&hoodName=jhb&plenumArray=...&typeHood=WallType
        // const query = 'ApplianceOilCap=' + element.ApplianceOilCap + '&CreatedBy=' + element.CreatedBy + '&Flag=Insert&HHeight=4&HLength=4&HWidth=32&IsPlenumLengthSame=0&NumberOfPlenum=1&dontShow=true&ductArray=...&gasShutSize=undefined&hoodName=jhb&plenumArray=...&typeHood=WallType';
      
        const query = '&ApplianceOilCap=' + element.ApplianceOilCap + 
                    '&CreatedBy=' + element.CreatedBy + 
                    '&Flag=' + element.Flag + 
                    '&HHeight=' + element.HHeight + 
                    '&HLength=' + element.HLength + 
                    '&HWidth=' + element.HWidth + 
                    '&IsPlenumLengthSame=' + element.IsPlenumLengthSame + 
                    '&NumberOfPlenum=' + element.NumberOfPlenum + 
                  
                    '&gasShutSize=25'  + 
                    '&hoodName=' + element.hoodName + 
                    '&prospectcode=' + this.ProspectCode + 
                    '&kssID=' + this.KssIDOriginal + 
            
                    '&typeHood=' + element.typeHood;
      
                    this.ApiServive.httpget(query, "Proposal/handleHoodWise").subscribe((data:any)=>{
                      console.log(data)
                      let hoodID = Number(data.Data[0].InsertedHoodID)
                      // console.log(hoodID)
                      //  add plenum after getting HOOD ID
                      for (let index = 0; index < element.plenumArray.length; index++) {
                        const elementPlen = element.plenumArray[index];
                        
      
                        const queryPlen = '&DistOfPlenumLeftHoodEdge=' + elementPlen.DistOfPlenumLeftHoodEdge                  + 
                        '&PlenumDepth=' + elementPlen.PlenumDepth+ 
                        '&PlenumHeight=' + elementPlen.PlenumHeight + 
                        '&PlenumLength=' + elementPlen.PlenumLength + 
                        '&TypeOfPlenum=' + elementPlen.TypeOfPlenum + 
                        '&hoodID=' + hoodID 
      this.ApiServive.httpget(queryPlen, "Proposal/handlePlenumHoodWise").subscribe((data:any)=>{
      
      })
      //  end plenum add by hood id
      
      // add duct by getting hoodid
      
      for (let indexx = 0; indexx < element.ductArray[0].length; indexx++) {
        const elementDuct = element.ductArray[0][indexx]
        // for (let i = 0; i < elementDuct.length; i++) {
        //   const elementdd = i[index];
        //   console.log(elementdd)
        // }
        console.log(elementDuct,"eld")
      console.log(element.ductArray , "edddd")
        const queryPlen = '&DuctsDiameter=' + elementDuct.diameterDuctR + 
        '&DuctsLength=' + elementDuct.lengthDuctR+ 
        '&DuctsWidth=' + elementDuct.widthDuctR+ 
        '&NoOfDuct=' + elementDuct.NoDuctR  + 
        '&TypeOfDuct=' + elementDuct.TypeOfDuct + 
        '&hoodID=' + hoodID 
        +"&NoDuctC="+elementDuct.NoDuctC
        +"&lengthDuctC="+elementDuct.lengthDuctC
        +"&widthDuctC="+elementDuct.widthDuctC
        +"&diameterDuctC="+elementDuct.diameterDuctC
      this.ApiServive.httpget(queryPlen, "Proposal/handleDuctHoodWise").subscribe((data:any)=>{
      
      })
                      }
                    }
                    })
      
      
      
      }
      // this.objKitchenRoomEntityList = [];
      this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;
 
      // // this.objKSSEntity = new KSSEntity_New();
      this.BindKitchenRoomDetailsList();
   
      // this.btnAddDetails=true;
      // this.KitchenBtnTitle='Add To Grid'
      // // // this.objKSSEntity = new KSSEntity_New();
      // this.BindKitchenRoomDetailsList();
    }
    else {
      // alert(data.Data.Message);
    }
  });


    }
    else{
    this.isSubmit='true'

    }
    // this.spinner.show();
    // if (!this.KssID)
    
    //   }
    // });
  }
  handleYes(){


    var query1 = '&product=Kitchen Supression System' +"&subP="+this.objKSSEntity.TypeOfKitchenRequired  + '&iid='+this.objKSSEntity.KSSId;;
    this.ApiServive.httpget(query1, "Inputsheet/addSheetTemp").subscribe((data :any) => {
      if (data.Status === true) {
        // alert('Proposal Submitted to Design Team');

  }
    })


    this.objKSSEntity.Cat="KSS"
    this.objKSSEntity.KSSIdOriginal= this.KssIDOriginal
    this.objKSSEntity.sheetName=this.sheetName
    let prevSheet = localStorage.getItem("inpSheet")
    if(prevSheet){
      let sheetArr = JSON.parse(prevSheet)
      sheetArr.push(this.objKSSEntity)
    localStorage.setItem("inpSheet",JSON.stringify(sheetArr))
      // alert(sheetArr.Cat)
    this.callback.emit(JSON.stringify(this.objKSSEntity))

    }
    else{
      let arr=[]
      arr.push(this.objKSSEntity)
    localStorage.setItem("inpSheet",JSON.stringify(arr))
    this.callback.emit(JSON.stringify(this.objKSSEntity))

    }
    // save existing input sheet in ls 
// alert("yyyyyyyyyyyyyyyyyyyyyy")
  }
  handleNo(){

    var query1 = '&product=Kitchen Supression System' +"&subP="+this.objKSSEntity.TypeOfKitchenRequired  + '&iid='+this.objKSSEntity.KSSId;;
    this.ApiServive.httpget(query1, "Inputsheet/addSheetTemp").subscribe((data :any) => {
      if (data.Status === true) {
        // alert('Proposal Submitted to Design Team');

  }
    })

    this.objKSSEntity.Cat="KSS"
    this.objKSSEntity.sheetName=this.sheetName
    this.objKSSEntity.KSSIdOriginal= this.KssIDOriginal
    let prevSheet = localStorage.getItem("inpSheet")
    if(prevSheet){
      let sheetArr = JSON.parse(prevSheet)
      sheetArr.push(this.objKSSEntity)
    localStorage.setItem("inpSheet",JSON.stringify(sheetArr))
      // alert(sheetArr.Cat)
    this.callback.emit(JSON.stringify(this.objKSSEntity))

    }
    else{
      let arr=[]
      arr.push(this.objKSSEntity)
    localStorage.setItem("inpSheet",JSON.stringify(arr))
    this.callback.emit(JSON.stringify(this.objKSSEntity))

    }
    // this.isNo='true'
// this.isSubmit='false'
// this.KssID = this.objKSSEntity.KSSId;
// var query1 = '&Flag=PendingWithDesignTeam&ProspectCode=' + this.ProspectCode + '&CreatedBy=' + this.CurrentUser.EmpCode + '&PID=1&IID=' + this.KssID;;
// this.ApiServive.httpget(query1, restAPIPath.OnSubmitProposalStatusChange).subscribe((data :any) => {
//   if (data.Status === true) {

//     var query1 = '&PropsoalCode=' + this.ProspectCode + '&SMSType=Sales_Person_Send_Proposal_to_Design_Team_Head&EmpCode=' + this.CurrentUser.EmpCode;
//     this.ApiServive.httpget(query1, restAPIPath.SendEmailToDTH).subscribe((data :any) => {
//       if (data.Status === true) {
//         // alert('Proposal Submitted to Design Team');
//         this.spinner.hide();
//         // this.ApiServive.routerService('/MyProposal');
//         this.callback.emit('Proposal Submitted to Design Team');
//         this.isSubmit='false'
//       }
//     });
//   }
// })
  }

handleCancel(){
  // this.isNo='false'
  this.isSubmit='false'
}

  get() {
    this.list.filter(item => item.checked === true);
  }




  BindKitchenList() {
    this.IsShow = false;
    this.IsNoOfHoods.length = 0;
    var TempArry: any = [];
    // if(this.objKSSEntity.NoOfKitchen>this.objKitchenRoomEntityListFilter.length){
    //   this.KitchenRoomNumber = this.KitchenRoomNumber + 1;
    // }

    // for(var i=0;i<this.objKSSEntity.NoOfKitchen;i++){
    for (var i = 0; i < 1; i++) {
      let objKitchenRoomEntity = new KitchenRoomEntity();
      objKitchenRoomEntity.Flag = 'Insert'
      objKitchenRoomEntity.KitchenId = 0;
      objKitchenRoomEntity.KitchenLength = 0;
      objKitchenRoomEntity.KitchenWidth = 0;
      objKitchenRoomEntity.KitchenHeight = 0;
      objKitchenRoomEntity.ProspectCode = this.ProspectCode;
      objKitchenRoomEntity.NoOfKitchen = 0;
      objKitchenRoomEntity.NoOfHoods = 0;
      objKitchenRoomEntity.objKSSDimensionofHoodEntityList = [];
      objKitchenRoomEntity.isShowHoods = false;
      TempArry.push(objKitchenRoomEntity)

    }

    this.objKitchenRoomEntityList = TempArry;
  }

  DeleteKitchenDetail(i: number) {
    if (confirm('Are you sure want to delete.')) {
      this.BindKitchenList();
      // this.objKitchenRoomEntityList=[]
      // this.objKSSEntity = new KSSEntity_New();
      // this.objKSSEntityList = [];
      // this.objKitchenRoomEntity = new KitchenRoomEntity();
      // this.objKitchenRoomEntityList.splice(i, 1);
      // this.objKSSEntity.NoOfKitchen = (this.objKSSEntity.NoOfKitchen - 1);
    }
  }

  AddHoodsDetails(data: any, index: number) {
    debugger
    if (!this.objKitchenRoomEntityList[index].NameOfKitchen) {
      alert('Please fill the kitchen details.');
      this.objKitchenRoomEntityList[index].NoOfHoods = 0;
      return;
    }
    if (!this.objKitchenRoomEntityList[index].KitchenLength) {
      alert('Please fill the kitchen details.');
      this.objKitchenRoomEntityList[index].NoOfHoods = 0;
      return;
    }
    if (!this.objKitchenRoomEntityList[index].KitchenWidth) {
      alert('Please fill the kitchen details.');
      this.objKitchenRoomEntityList[index].NoOfHoods = 0;
      return;
    }
    if (!this.objKitchenRoomEntityList[index].KitchenHeight) {
      alert('Please fill the kitchen details.');
      this.objKitchenRoomEntityList[index].NoOfHoods = 0;
      return;
    }
    var abc = data;
    let TempHoodArry: any = [];
    for (var i = 0; i < data.NoOfHoods; i++) {
      let objKSSDimensionofHoodEntity: any = {};
      // let objKSSDimensionofHoodEntity = new KSSDimensionofHoodEntity();
      objKSSDimensionofHoodEntity.Flag = 'Insert'
      objKSSDimensionofHoodEntity.NameofHood = '';
      objKSSDimensionofHoodEntity.DOHHeight = 0;
      objKSSDimensionofHoodEntity.DOHLength = 0;
      objKSSDimensionofHoodEntity.DOHWidth = 0;
      objKSSDimensionofHoodEntity.NumberOfPlenum = 0;
      objKSSDimensionofHoodEntity.ProspectCode = this.ProspectCode;
      objKSSDimensionofHoodEntity.CreatedBy = this.CurrentUser.EmpCode;
      objKSSDimensionofHoodEntity.Remarks = '';
      objKSSDimensionofHoodEntity.TypeOfHood = '0';
      objKSSDimensionofHoodEntity.objPlenumEntityList = [];
      objKSSDimensionofHoodEntity.objKSSHoodDuctEntityList = [];
      objKSSDimensionofHoodEntity.objKSSFryersEntityList = [];
      TempHoodArry.push(objKSSDimensionofHoodEntity);
    }
    this.objKitchenRoomEntityList[index].objKSSDimensionofHoodEntityList = TempHoodArry
  }
  ShowPlenumTable(data: any, Hoodindex: number, Kitchenindex: number, objKSSDimensionofHoodEntity: KSSDimensionofHoodEntity, event: any) {
    if (!objKSSDimensionofHoodEntity.NameofHood || !objKSSDimensionofHoodEntity.DOHHeight || !objKSSDimensionofHoodEntity.DOHLength || !objKSSDimensionofHoodEntity.DOHWidth) {
      alert('Please fill Hood details first.');
      event.preventDefault();
      event.stopPropagation();
      return;

    }
    else {
      let TempPlenumArry: any = [];
      for (var i = 0; i < 1; i++) {
        // let objPlenumEntity = new PlenumEntity();
        let objPlenumEntity: any = {};
        objPlenumEntity.Flag = 'Insert'
        objPlenumEntity.NumberOfPlenum = 0;
        objPlenumEntity.TypeOfPlenum = '0';
        objPlenumEntity.PlenumHeight = 0;
        // if (data.IsPlenumLenghtSame == 'Yes') {
        objPlenumEntity.PlenumLength = this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].DOHLength
        // }
        // else if (data.IsPlenumLenghtSame == 'No') {
        //   objPlenumEntity.PlenumLength = 0;
        // }

        objPlenumEntity.PlenumDepth = 0;
        objPlenumEntity.ProspectCode = this.ProspectCode;
        objPlenumEntity.Remarks = '';
        // objKSSDimensionofHoodEntity.NoOfHoods= 0;
        TempPlenumArry.push(objPlenumEntity);
      }
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList = TempPlenumArry;




      let TempDuctArry: any = [];
      for (var i = 0; i < 1; i++) {
        // let objDuctEntity = new KSSHoodDuctEntity();
        let objDuctEntity: any = {};
        objDuctEntity.Flag = 'Insert'
        objDuctEntity.NoOfDuct = 0;
        objDuctEntity.TypeOfDuct = '0';
        objDuctEntity.DuctsLength = 0;
        objDuctEntity.DuctsWidth = 0;
        objDuctEntity.DuctsDiameter = 0;
        objDuctEntity.ProspectCode = this.ProspectCode;
        objDuctEntity.Remarks = '';
        // objKSSDimensionofHoodEntity.NoOfHoods= 0;
        TempDuctArry.push(objDuctEntity);
      }
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objKSSHoodDuctEntityList = TempDuctArry;


      // let TempHoodArry:any=[];
      // for(var i=0;i<1;i++){
      //   let objPlenumEntity=new PlenumEntity();
      //   objPlenumEntity.Flag='Insert'
      //   objPlenumEntity.NumberOfPlenum=0;
      //   objPlenumEntity.PlenumHeight=0;
      //   objPlenumEntity.PlenumLength=0;
      //   objPlenumEntity.PlenumDepth=0;
      //   objPlenumEntity.ProspectCode=this.ProspectCode;
      //   objPlenumEntity.Remarks= '';
      //   // objKSSDimensionofHoodEntity.NoOfHoods= 0;
      //   TempHoodArry.push(objPlenumEntity);
      // }
      // this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList=TempHoodArry

    }
  }
  ShowPlenumTableOnfillNoOfPlenum(data: any, Hoodindex: number, Kitchenindex: number, objKSSDimensionofHoodEntity: KSSDimensionofHoodEntity, event: any) {
    if (!objKSSDimensionofHoodEntity.NameofHood || !objKSSDimensionofHoodEntity.DOHHeight || !objKSSDimensionofHoodEntity.DOHLength || !objKSSDimensionofHoodEntity.DOHWidth) {
      alert('Please fill Hood details first.');
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].NumberOfPlenum = 0
      event.preventDefault();
      event.stopPropagation();
      return;

    }
    else if (this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].NumberOfPlenum) {
      let TempPlenumArry: any = [];
      let NoOfPlenum = this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].NumberOfPlenum;
      for (var i = 0; i < NoOfPlenum; i++) {
        let objPlenumEntity = new PlenumEntity();
        objPlenumEntity.Flag = 'Insert'
        // objPlenumEntity.NumberOfPlenum = 0;
        objPlenumEntity.TypeOfPlenum = '0';
        objPlenumEntity.PlenumHeight = 0;
        // if (data.IsPlenumLenghtSame == 'Yes') {
        objPlenumEntity.PlenumLength = this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].DOHLength
        // }
        // else if (data.IsPlenumLenghtSame == 'No') {
        //   objPlenumEntity.PlenumLength = 0;
        // }

        objPlenumEntity.PlenumDepth = 0;
        objPlenumEntity.ProspectCode = this.ProspectCode;
        objPlenumEntity.Remarks = '';
        // objKSSDimensionofHoodEntity.NoOfHoods= 0;
        TempPlenumArry.push(objPlenumEntity);
      }
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList = TempPlenumArry;




      let TempDuctArry: any = [];
      for (var i = 0; i < NoOfPlenum; i++) {
        let objDuctEntity = new KSSHoodDuctEntity();
        objDuctEntity.Flag = 'Insert'
        // objDuctEntity.NoOfDuct = 0;
        objDuctEntity.TypeOfDuct = '0';
        objDuctEntity.DuctsLength = 0;
        objDuctEntity.DuctsWidth = 0;
        objDuctEntity.DuctsDiameter = 0;
        objDuctEntity.ProspectCode = this.ProspectCode;
        // objDuctEntity.Remarks = '';
        // objKSSDimensionofHoodEntity.NoOfHoods= 0;
        TempDuctArry.push(objDuctEntity);
      }
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objKSSHoodDuctEntityList = TempDuctArry;

    }
  }


  AddNewDuctRow(Kitchenindex:any, Hoodindex:any, Ductindex:any) {
    var objDuctEntity = this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objKSSHoodDuctEntityList[Ductindex];

    if (!objDuctEntity.NoOfDuct || (objDuctEntity.TypeOfDuct == 'RECTANGULAR DUCT' ? (!objDuctEntity.DuctsLength || !objDuctEntity.DuctsWidth) : objDuctEntity.TypeOfDuct == 'CIRCULAR DUCT' ? (!objDuctEntity.DuctsDiameter) : true)) {
      alert('Please fill all duct details first.')
      return;
    } else {


      let objDuctEntity = new KSSHoodDuctEntity();
      objDuctEntity.Flag = 'Insert'
      objDuctEntity.NoOfDuct = 0;
      objDuctEntity.TypeOfDuct = '0';
      objDuctEntity.DuctsLength = 0;
      objDuctEntity.DuctsWidth = 0;
      objDuctEntity.DuctsDiameter = 0;
      objDuctEntity.ProspectCode = this.ProspectCode;
      // objDuctEntity.Remarks = '';
      // objKSSDimensionofHoodEntity.NoOfHoods= 0;

      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objKSSHoodDuctEntityList.push(objDuctEntity);;
    }
  }

  deleteDuctRow(Kitchenindex:any, Hoodindex:any, Ductindex:any) {
    this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objKSSHoodDuctEntityList.splice(Ductindex, 1);
  }

  AddNewPlenumRow(Kitchenindex:any, Hoodindex:any, Plenumindex:any) {
    var objPlenumEntity = this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList[Plenumindex];
    if (!objPlenumEntity.NumberOfPlenum
      || (objPlenumEntity.TypeOfPlenum == '0')
      || !objPlenumEntity.PlenumHeight
      || !objPlenumEntity.PlenumLength
      || !objPlenumEntity.PlenumDepth) {
      alert('Please fill all plenum details first.')
      return;
    }
    else {
      let objPlenumEntity = new PlenumEntity();
      objPlenumEntity.Flag = 'Insert'
      objPlenumEntity.NumberOfPlenum = 0;
      objPlenumEntity.TypeOfPlenum = '0';
      objPlenumEntity.PlenumHeight = 0;
      objPlenumEntity.PlenumLength = 0;
      objPlenumEntity.PlenumDepth = 0;
      objPlenumEntity.ProspectCode = this.ProspectCode;
      objPlenumEntity.Remarks = '';
      // objKSSDimensionofHoodEntity.NoOfHoods= 0;
      this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList.push(objPlenumEntity);
    }
  }
  deletePlenumRow(Kitchenindex:any, Hoodindex:any, Plenumindex:any) {
    this.objKitchenRoomEntityList[Kitchenindex].objKSSDimensionofHoodEntityList[Hoodindex].objPlenumEntityList.splice(Plenumindex, 1);;;
  }


  BindToolIps() {

  }
  showTooltip() {
    // this.mytooltip.open();
  }

  hideTooltip() {
    // this.mytooltip.close();
  }
  EquipmentHoodList: any = [];
  BindHoodForEquipment() {
    let tempArray: any = [];
    let tempArray_Hood: any = [];
    this.EquipmentHoodList = []
    tempArray = this.objKitchenRoomEntityListFilter.find((a:any) => a.NameOfKitchen == this.objKitchenEquipmentEntity.NameOfKitchen);
    this.objKitchenEquipmentEntity.KitchenId = tempArray.KitchenId
    tempArray_Hood = tempArray.objKSSDimensionofHoodEntityList;
    this.objKSSDOHEntityListForddlHood = tempArray_Hood;
    // this.EquipmentHoodList.push[{}]

    // this.EquipmentHoodList=this.objKitchenRoomEntityList.filter(a=>a.NameOfKitchen==this.objKitchenEquipmentEntity.NameOfKitchen)
  }

  OnKitchenEquipHoodSelect() {
    let tempArray: any = [];
    let tempPlenumArray: any = [];
    tempArray = this.objKSSDOHEntityListForddlHood.find(a => a.NameofHood == this.objKitchenEquipmentEntity.NameOfHood)
    this.objKitchenEquipmentEntity.HoodId = tempArray.HoodId
    tempPlenumArray = tempArray.objPlenumEntityList[0].TypeOfPlenum;
    this.tempPlenumType = tempArray.objPlenumEntityList[0].TypeOfPlenum;

  }
  deleteEquipmntDtl(Equipmentindex:any) {
    this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.splice(Equipmentindex, 1);
  }
  deleteEquipmntDtlForSideA(Equipmentindex:any) {
    debugger
    this.objKitchenEquipmentDetailEntityListForSideA.splice(Equipmentindex, 1);
    // if(Equipmentindex>0){
    //   this.objKitchenEquipmentDetailEntityListForSideA.splice(Equipmentindex, 1);
    // }else{
    //   if(Equipmentindex==0 && this.objKitchenEquipmentDetailEntityListForSideA.length>1){
    //     this.objKitchenEquipmentDetailEntityListForSideA.splice(Equipmentindex, 1);
    //   }else{
    //     this.BindKitchenEquipmentDtlForSideA();
    //   }
      
    // }    
  }

  deleteEquipmntDtlForSideB(Equipmentindex:any) {
    this.objKitchenEquipmentDetailEntityListForSideB.splice(Equipmentindex, 1);
    // if(Equipmentindex>0){
    //   this.objKitchenEquipmentDetailEntityListForSideB.splice(Equipmentindex, 1);
    // }else {
    //   if(Equipmentindex==0 && this.objKitchenEquipmentDetailEntityListForSideB.length>1){
    //     this.objKitchenEquipmentDetailEntityListForSideB.splice(Equipmentindex, 1);
    //   }else{
    //     this.BindKitchenEquipmentDtlForSideB();
    //   }
    // }   
  }

  AddNewEquipmentRow(Equipmentindex:any) {
    Equipmentindex = this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.length;
    let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();
    EquipmentDetail.Flag = 'Insert';
    EquipmentDetail.EquipmentDetailsId = 0;
    EquipmentDetail.KitchenEquipmentId = 0;
    EquipmentDetail.NoOfEquipment = 0;

    EquipmentDetail.EquipmentDepth = 0;
    EquipmentDetail.EquipmentHeight = 0;
    EquipmentDetail.EquipmentWidth = 0;
    EquipmentDetail.ProspectCode = this.ProspectCode;
    EquipmentDetail.Remarks = 0;
    EquipmentDetail.KitchenId = 0;
    EquipmentDetail.HoodId = 0;
    EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
    EquipmentDetail.Dist_CounterTop_salamander = 0;
    if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
      EquipmentDetail.KitchenEquipmentName = 'S' + (Equipmentindex + 1);
      this.IsDisableForEquipDtl = true;
    }
    this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.push(EquipmentDetail);
  }
  AddNewEquipmentRowForSideA(Equipmentindex:any) {
    Equipmentindex = this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.length;
    Equipmentindex = this.objKitchenEquipmentDetailEntityListForSideA.length;
    let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();
    EquipmentDetail.Flag = 'Insert';
    EquipmentDetail.EquipmentDetailsId = 0;
    EquipmentDetail.KitchenEquipmentId = 0;
    EquipmentDetail.NoOfEquipment = 0;
    EquipmentDetail.KitchenEquipmentName='0'
    EquipmentDetail.EquipmentDepth = 0;
    EquipmentDetail.EquipmentHeight = 0;
    EquipmentDetail.EquipmentWidth = 0;
    EquipmentDetail.ProspectCode = this.ProspectCode;
    EquipmentDetail.Remarks = 0;
    EquipmentDetail.Side = 'Side_A';
    EquipmentDetail.KitchenId = 0;
    EquipmentDetail.HoodId = 0;
    EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
    EquipmentDetail.Dist_CounterTop_salamander = 0;
    if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
      // EquipmentDetail.KitchenEquipmentName = 'S' + (Equipmentindex + 1);
      EquipmentDetail.KitchenEquipmentName = 'Salamander';
      this.IsDisableForEquipDtl = true;
    }
    this.objKitchenEquipmentDetailEntityListForSideA.push(EquipmentDetail);
    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.push(EquipmentDetail);
  }
  AddNewEquipmentRowForSideB(Equipmentindex:any) {
    Equipmentindex = this.objKitchenEquipmentDetailEntityListForSideB.length;
    let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();
    EquipmentDetail.Flag = 'Insert';
    EquipmentDetail.EquipmentDetailsId = 0;
    EquipmentDetail.KitchenEquipmentId = 0;
    EquipmentDetail.NoOfEquipment = 0;
    EquipmentDetail.KitchenEquipmentName='0'
    EquipmentDetail.EquipmentDepth = 0;
    EquipmentDetail.EquipmentHeight = 0;
    EquipmentDetail.EquipmentWidth = 0;
    EquipmentDetail.ProspectCode = this.ProspectCode;
    EquipmentDetail.Remarks = 0;
    EquipmentDetail.Side = 'Side_AB';
    EquipmentDetail.KitchenId = 0;
    EquipmentDetail.HoodId = 0;
    EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
    EquipmentDetail.Dist_CounterTop_salamander = 0;
    if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
      // EquipmentDetail.KitchenEquipmentName = 'S' + (Equipmentindex + 1);
      EquipmentDetail.KitchenEquipmentName = 'Salamander';
      this.IsDisableForEquipDtl = true;
    }
    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList.push(EquipmentDetail);
    this.objKitchenEquipmentDetailEntityListForSideB.push(EquipmentDetail);
  }

  BindKitchenEquipmentDtl() {
    debugger
    // let TempArry = [];
    // for (var i = 0; i < 1; i++) {
    //   let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();     

    //   EquipmentDetail.Flag = 'Insert';
    //   EquipmentDetail.EquipmentDetailsId = 0;
    //   EquipmentDetail.KitchenEquipmentId = 0;
    //   EquipmentDetail.NoOfEquipment = 0;
    //   EquipmentDetail.EquipmentDepth = 0;
    //   EquipmentDetail.EquipmentHeight = 0;
    //   EquipmentDetail.EquipmentWidth = 0;
    //   EquipmentDetail.ProspectCode = this.ProspectCode;
    //   EquipmentDetail.Remarks = 0;
    //   EquipmentDetail.KitchenId = 0;
    //   EquipmentDetail.HoodId = 0;
    //   EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
    //   EquipmentDetail.Dist_CounterTop_salamander = 0;
    //   if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
    //     // EquipmentDetail.KitchenEquipmentName = 'S' + (i + 1);
    //     EquipmentDetail.KitchenEquipmentName = 'Salamander';
    //     this.IsDisableForEquipDtl = true;
    //   } else {
    //     EquipmentDetail.KitchenEquipmentName = '0';
    //     this.IsDisableForEquipDtl = false;
    //   }
    //   TempArry.push(EquipmentDetail)

    // }
    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList = TempArry
    // this.objKitchenEquipmentDetailEntityList = TempArry;
    if(this.objKitchenEquipmentEntity.Side=='Side_A'){
      this.BindKitchenEquipmentDtlForSideA();
    }else  if(this.objKitchenEquipmentEntity.Side=='Side_AB'){
      // this.BindKitchenEquipmentDtlForSideA();
      this.BindKitchenEquipmentDtlForSideB();
    }
  }
  BindKitchenEquipmentDtlForSideA() {
    debugger
    let TempArry:any = [];
    for (var i = 0; i < 1; i++) {
      let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();     
      // let EquipmentDetail= new KitchenEquipmentDetailEntity();     

      EquipmentDetail.Flag = 'Insert';
      EquipmentDetail.EquipmentDetailsId = 0;
      EquipmentDetail.KitchenEquipmentId = 0;
      EquipmentDetail.NoOfEquipment = 0;
      EquipmentDetail.EquipmentDepth = 0;
      EquipmentDetail.EquipmentHeight = 0;
      EquipmentDetail.EquipmentWidth = 0;
      EquipmentDetail.ProspectCode = this.ProspectCode;
      EquipmentDetail.Remarks = '0';
      EquipmentDetail.Side = 'Side_A';
      EquipmentDetail.KitchenId = 0;
      EquipmentDetail.HoodId = 0;
      EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
      EquipmentDetail.Dist_CounterTop_salamander = 0;
      if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
        // EquipmentDetail.KitchenEquipmentName = 'S' + (i + 1);
        EquipmentDetail.KitchenEquipmentName = 'Salamander';
        this.IsDisableForEquipDtl = true;
      } else {
        EquipmentDetail.KitchenEquipmentName = '0';
        this.IsDisableForEquipDtl = false;
      }
      TempArry.push(EquipmentDetail)

    }
    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList = TempArry
    this.objKitchenEquipmentDetailEntityListForSideA = TempArry;
  }
  BindKitchenEquipmentDtlForSideB() {
    debugger
    let TempArry:any = [];
    for (var i = 0; i < 1; i++) {
      let EquipmentDetail: any = {}; //= new KitchenEquipmentDetailEntity();     
      // let EquipmentDetail= new KitchenEquipmentDetailEntity();     

      EquipmentDetail.Flag = 'Insert';
      EquipmentDetail.EquipmentDetailsId = 0;
      EquipmentDetail.KitchenEquipmentId = 0;
      EquipmentDetail.NoOfEquipment = 0;
      EquipmentDetail.EquipmentDepth = 0;
      EquipmentDetail.EquipmentHeight = 0;
      EquipmentDetail.EquipmentWidth = 0;
      EquipmentDetail.ProspectCode = this.ProspectCode;
      EquipmentDetail.Remarks = '0';
      EquipmentDetail.Side = 'Side_AB';
      EquipmentDetail.KitchenId = 0;
      EquipmentDetail.HoodId = 0;
      EquipmentDetail.Dist_Salamander_leftEdge_hood = 0;
      EquipmentDetail.Dist_CounterTop_salamander = 0;
      if (this.objKitchenEquipmentEntity.ProtectionType == "Total") {
        // EquipmentDetail.KitchenEquipmentName = 'S' + (i + 1);
        EquipmentDetail.KitchenEquipmentName = 'Salamander';
        this.IsDisableForEquipDtl = true;
      } else {
        EquipmentDetail.KitchenEquipmentName = '0';
        this.IsDisableForEquipDtl = false;
      }
      TempArry.push(EquipmentDetail)

    }
    // this.objKitchenEquipmentEntity.objKitchenEquipmentDetailEntityList = TempArry
    this.objKitchenEquipmentDetailEntityListForSideB = TempArry;
  }

  BindHoodListOfKitchen(item: any) {
    debugger
    item.IsShowInputSheetRemarksTbl = !item.IsShowInputSheetRemarksTbl
    this.objKSSDimensionofHoodEntityList = item.objKSSDimensionofHoodEntityList;
  }

  // AddKithchenEquipmentDetails(){

  // }
  KitchenRowAction(Action: string, item: any) {
    let tempArray: any = []
    if (Action == 'EditKitchenDetails') {
      this.btnAddDetails=false;
      this.KitchenBtnTitle='Update'
      this.objKitchenRoomEntityList = this.objKitchenRoomEntityListFilter.filter(a => a.KitchenId == item.KitchenId);

      if (this.objKitchenRoomEntityList.length > 0) {
        this.objKitchenRoomEntityList.forEach(element => {
          element.Flag = 'Update';
          // this.objKitchenRoomEntityList=tempArray
          // this.objKitchenRoomEntity.Flag = 'Insert'  
          if (element.objKSSDimensionofHoodEntityList.length > 0) {
            element.objKSSDimensionofHoodEntityList.forEach((element2:any) => {
              element2.Flag = 'Update';
              if (element2.objKSSHoodDuctEntityList.length > 0) {
                element2.objKSSHoodDuctEntityList.forEach((element3:any) => {
                  element3.Flag = 'Update';
                  if(!element3.Remarks)
                  element3.Remarks = '';
                });
              }
                if (element2.objPlenumEntityList.length > 0) {
                  element2.objPlenumEntityList.forEach((element4:any) => {
                    element4.Flag = 'Update';
                    if(!element4.Remarks)
                    element4.Remarks = '';                 
                  });
              }
            });
          }
        });
      }      
    }
    else if(Action =='DeleteKitchenDetails'){debugger
      let TempArry:any=[];
      // let KitchenId = item.KitchenId;
      TempArry=this.objKitchenRoomEntityListFilter.filter(a => a.KitchenId == item.KitchenId);
      TempArry.forEach((element :any)=> {
        element.Flag='Delete';
      });
      if (TempArry.length > 0) {
        TempArry.forEach((element:any) => {
          element.Flag = 'Delete';
          // this.objKitchenRoomEntityList=tempArray
          // this.objKitchenRoomEntity.Flag = 'Insert'  
          if (element.objKSSDimensionofHoodEntityList.length > 0) {
            element.objKSSDimensionofHoodEntityList.forEach((element2:any) => {
              element2.Flag = 'Delete';
              if (element2.objKSSHoodDuctEntityList.length > 0) {
                element2.objKSSHoodDuctEntityList.forEach((element3:any) => {
                  element3.Flag = 'Delete';
                  element3.Remarks = 'test';
                });
              }
                if (element2.objPlenumEntityList.length > 0) {
                  element2.objPlenumEntityList.forEach((element4:any) => {
                    element4.Flag = 'Delete';
                    element4.Remarks = 'test';
                  });
              }
            });
          }
        });
        this.ApiServive.httpost(TempArry, '/Proposal/KSSKitchenRoomDeleteById').subscribe(
          (data :any) => {
            if (data.Status === true) {
              alert(data.Data.MessageBox);
              // this.KssID = data.Data.IID;
              // this.objKitchenRoomEntityList = [];
              // this.objKSSEntity.objKitchenRoomEntityList = this.objKitchenRoomEntityList;  
              this.btnAddDetails=false;
              // // this.objKSSEntity = new KSSEntity_New();
              this.BindKitchenRoomDetailsList();
            }
            else {
              alert(data.Data.Message);
            }
          });
      } 
    }

  }

  FileDownload(fileName: string) {
    fileName = fileName;
    var query1 = 'FileName=' + fileName;
    // this.ApiServive.httpgetForDownloadFile(query1, restAPIPath.InputsheetDownLoadFile).subscribe(
    //   file(Data :any) => {
    //     let b: any = new Blob([fileData], { type: 'application/octet-stream' });
    //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //       window.navigator.msSaveOrOpenBlob(b, fileName);
    //     }
    //     else {
    //       var url = window.URL.createObjectURL(b);
    //       //window.open(url);
    //       var a = document.createElement('a');
    //       document.body.appendChild(a);
    //       a.setAttribute('style', 'display: none');
    //       a.href = url;
    //       a.download = fileName;
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //       a.remove(); // remove the element
    //     }
    //   }
    // );
  }


  KitchenEquipmentRowAction(Action: string, item: any) {
    if(Action=='EditKitchenEquipment'){
      this.KitchenEquipBtnTitle='Update';
    this.objKitchenEquipmentEntity=item;
    this.objKitchenEquipmentDetailEntityListForSideA=item.objKitchenEquipmentDetailEntityList.filter((a:any)=>a.Side=='Side_A');
    this.objKitchenEquipmentDetailEntityListForSideB=item.objKitchenEquipmentDetailEntityList.filter((a:any)=>a.Side=='Side_AB');
    }else if(Action=='DeleteKitchenEquipment'){
      let TempArry:any;
      // let KitchenId = item.KitchenId;
      TempArry=item
      TempArry.Flag='Delete';
   
      // if (TempArry.objKitchenEquipmentDetailEntityList.length > 0) {
      //   TempArry.objKitchenEquipmentDetailEntityList.forEach(element => {
      //     element.Flag = 'Delete';    
      //   });
      if (this.objKitchenEquipmentEntityList.length > 0) {
        if (TempArry.objKitchenEquipmentDetailEntityList.length > 0) {
        TempArry.objKitchenEquipmentDetailEntityList.forEach((element:any) => {
          element.Flag = 'Delete';    
        });
      }
        this.ApiServive.httpost(TempArry, '/Proposal/KSSKitchenEquipmentAction').subscribe(
          (data :any) => {
            if (data.Status === true) {
              alert(data.Data.MessageBox);
              this.objKitchenEquipmentEntity = new KitchenEquipmentEntity();
              this.BindKitchenEquipDetailsList();
            }
            else {
              alert(data.Data.Message);
            }
          });
      } 
    }
  }
  AddMoreKitchen(){
  this.ShowtabActive = 1
  this.btnAddDetails=false;
  }

}



