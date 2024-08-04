export class KSSEntity {
    Flag: string='';
    KSSId:  number = 0;
    ProductId:  number = 0;
    CustomerCode: string='';
    TypeOfKitchenRequired: string = '0';
    Temperature: string = '0';
    TypeofHoods: string = '0';
    DetailsOfDesigner: string='';
    DescriptionOfRisk: string='';
    DimensionOfKitchenLength: number=0;
    DimensionOfKitchenWidth: number=0;
    DimensionOfKitchenHeight:  number=0;
    NoOfHoods:  number = 0;
    KitchenType: string = '0';
    BurnerType: string = '0';
    FuelType: string = '0';
    ProtectAllEquipment: string='';
    IntegratedWithSystem: string='';
    RequirementForInstallation: string='';
    TrippingShuttOffTimeAtFire: string = '0';
    TrippingShuttOffPipeSize: string = '0';
    LPGShuttoff: string='';
    LPGShuttoffPipeSize: string='';
    SystemTesting: string = '0';
    Remarks: string='';
    ProspectCode: string='';
    CustomerTypeId: string='';
    ProductType: string='';
    CreatedBy: string='';
    Status: string='';
    IsActive:boolean=false;

}
export class KSSDimensionofHoodEntity{
    Flag: string = '';
  KSSId: number = 0;
  TypeOfHood: string = '0';
  DOHWidth: number = 0;
  DOHLength: number = 0;
  DOHHeight: number = 0;
  NoOfDucts: number = 0;
  NameofHood: string = '';
  ProductId: number = 0;
  ProspectCode: string = '';
  IID: number = 0;
  Typeofducts: string = '0';
  DuctsWidth: number = 0;
  DuctsLength: number = 0;
  DuctsDiameter: number = 0;
  ProtectionType: string = '0';
  NumberofFryers: number = 0;
  NumberOfPlenum: number = 0;
  ProtectionTypeWidth: number = 0;
  ProtectionTypeLength: number = 0;
    NameOfKitchen:string='';
    Remarks:string='';
    IsPlenumShow:boolean=false;
    IsPlenumLenghtSame:string='';
    objKSSFryersEntityList : KSSFryersEntity[]=[];
    objKSSHoodDuctEntityList : KSSHoodDuctEntity[]=[];
    objPlenumEntityList:PlenumEntity[]=[];
}



export class KSSFryersEntity{
    Flag: string='';
    FryersId: number =0;
    ProspectCode: string='';
    NameOfHood: string='';
    NoOfFryers: number =0 ;
    FLength: number =0;
    FWidth: number =0 ;
}

export class KSSHoodDuctEntity{
    Flag: string='';
    DuctId: number =0;
    ProspectCode: string='';
    NameOfHood: string='';
    TypeOfDuct: string='';
    DuctsWidth: number =0;
    DuctsLength: number =0 ;
    DuctsDiameter: number =0 ;
    NoOfDuct:number =0;
    TypeOfPlenum:string=''
}


export class KSSEntity_New {
    Cat:string='';
    Flag: string='';
    KSSId:  number = 0;
    ProductId:  number = 0;
    CustomerCode: string= '';
    TypeOfKitchenRequired: string='';
    Temperature: string = 'No';    
    NoOfKitchen:  number = 0;
    KSSIdOriginal : string='';
    SystemOperationType: string='';
    Annunciationdevice : string='';
    annucRequirement : string=''
    annucType : string=''
    GasShutOffValve : string=''
    GasShutOffValveReq : string=''
    GasshutoffvalveType : string=''

    // KitchenType: string = '0';
    // BurnerType: string = '0';
    // FuelType: string = '0';
    // ProtectAllEquipment: string = '0';
    // IntegratedWithSystem: string = '0';
    // RequirementForInstallation: string;
    // TrippingShuttOffTimeAtFire: string = '0';
    // TrippingShuttOffPipeSize: string = '0';
    // LPGShuttoff: string = '0';
    // LPGShuttoffPipeSize: string = '0';
    // SystemTesting: string = '0';
    Remarks: string = '0';
    ProspectCode: string='';
    CustomerTypeId: string= '0';
    ProductType: string= '0';
    CreatedBy: string='';
    objKitchenRoomEntityList : KitchenRoomEntity[]=[];
    sheetName : string=''
}


export class KitchenRoomEntity{
    Flag: string='';
    KitchenId: number = 0;
    KSSId:number=0;
    NameOfKitchen:string='';
    KitchenLength: number= 0;
    KitchenWidth: number= 0;
    KitchenHeight:  number= 0;
    ProspectCode:string='';
    NoOfKitchen:  number = 0;
    NoOfHoods:  number = 0;
    objKSSDimensionofHoodEntityList:KSSDimensionofHoodEntity[]=[];
    isShowHoods:  boolean = false;
}
export class nDuc{
    Flag: string='';
    KitchenId: number = 0;
    NameOfKitchen:string='';
    KitchenLength: number= 0;
    KitchenWidth: number= 0;
    KitchenHeight:  number= 0;
    ProspectCode:string='';
    NoOfKitchen:  number = 0;
   
}





export class PlenumEntity{
    Flag: string='';
    PlenumId: number = 0;
    NumberOfPlenum:number=0;
    PlenumLength: number= 0;
    PlenumDepth: number= 0;
    PlenumHeight:  number= 0;
    ProspectCode:string='';
    TypeOfPlenum: string = '0';
    Remarks:string='';
    DistOfPlenumLeftHoodEdge:number=0;
   
}


export class KitchenEquipmentEntity {
    Flag: string='';
    KitchenId:  number = 0;
    KSSId:  number = 0;
    NameOfKitchen: string= '0';
    NameOfHood: string= '0';
    HoodId:number=0;
    EquipmentId:number=0;
    EquipmentDetailsId:number=0;
    ProtectionType: string = '0';
    Remarks: string = '0';
    ProspectCode: string='';
    CustomerTypeId: string= '0';
    ProductType: string= '0';
    CreatedBy: string='';
    Side:  string= "0";
    Side_A_CYPosition:  string= '0';
    Side_B_CYPosition:  string= '0';
    Side_A_ManualReleasePosition:  string= '0';
    Side_B_ManualReleasePosition:  string= '0';
    Side_A_DistCY:  number=0;
    Side_B_DistCY:  number=0;
    Side_A_RunningPipeLength:  number= 0;
    Side_B_RunningPipeLength:  number= 0;
    Side_A_HSTLength:  number=0;
    Side_B_HSTLength:  number=0;
    ResponsePannel:string='';
    ResponsePannelPosition:string='0';
    LengthOfWireResponsePannel:string='';
    objKitchenEquipmentDetailEntityList : KitchenEquipmentDetailEntity[]=[];
}

export class KitchenEquipmentDetailEntity{
    Flag: string='';
    EquipmentDetailsId:number=0;
    KitchenEquipmentId: number = 0;
    KitchenEquipmentName:string='0';
    NoOfEquipment: number= 0;
    Dist_Salamander_leftEdge_hood: number= 0;
    Dist_CounterTop_salamander:number= 0;
    EquipmentDepth: number= 0;
    EquipmentHeight:  number= 0;
    EquipmentWidth:  number= 0;
    Remarks:string='';
    KitchenId:  number = 0;
    HoodId:number=0;
    ProspectCode: string='';
    Side: string='';
   
}

export class fileSaveEntity{
    Flag: string='';
    Id:number=0;
    FileId:number=0;
    ProspectCode: string=''; 
    CreatedBy: string='';
    NameOfKitchen:string='0';
    KSSId:  number = 0;
}