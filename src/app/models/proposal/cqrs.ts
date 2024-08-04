export class SystemFormData {
    equipmentType: string="";
    //systemType: string="";
    extinguishingAgent: any="";
    typeOfEq: string="";
    typeOfTransformer:string=''
    // responsePanelRequired: string="";
    // responsePanel:string="";
    cqrsId:number=0;
    prospectcode : string="";
    //remarks:string="";
    flag:string="";
    
    constructor(data?: Partial<SystemFormData>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class BatteryBankEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    // dimensionsLength:number | undefined;
    // dimensionsWidth:number| undefined;
    // dimensionsHeight:number| undefined;
    // cabinetLength:number| undefined;
    // cabinetWidth:number| undefined;
    // cabinetHeight:number | undefined;
    // distanceLHS:number| undefined;
    // distanceRHS:number| undefined;
    // distanceBack:number| undefined;
    // totalRowBattery:number| undefined;
    // totalColumnBattery:number| undefined;
    // roomNames:any;

    batteryType:string="";
    alarmRequired:string="";
    alarmOption:string="";
    noOfBatteryRooms:number=1;
    batteryRooms: BatteryRoom[]=[];
    constructor(data?: Partial<BatteryBankEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }


  export class EPEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    // dimensionsLength:number | undefined;
    // dimensionsWidth:number| undefined;
    // dimensionsHeight:number| undefined;
    // cabinetLength:number| undefined;
    // cabinetWidth:number| undefined;
    // cabinetHeight:number | undefined;
    // distanceLHS:number| undefined;
    // distanceRHS:number| undefined;
    // distanceBack:number| undefined;
    // totalRowBattery:number| undefined;
    // totalColumnBattery:number| undefined;
    roomNames:any;

    // batteryType:string="";
    alarmRequired:string="";
    alarmOption:string="";
    NoOfEPRooms:number=1;
    
noOfEPRooms:number=1
    EPRooms: EPRooms[]=[];
    epRooms: epRooms[]=[];

    constructor(data?: Partial<BatteryBankEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class BatteryRoom {
    id:number=0;
    floorNo:number | null = null;
    roomName: string="";
    cabinets: Cabinet[]=[];
  }
  export class EPRoom {
    id:number=0;
    roomName: string="";
    floorNo :number=0
    isActive:boolean=true;
    cabinets: CabinetEntityEP[]=[];
  }

  export class CabinetEntityEP {
    id:number=0;
    roomId:number=0;
    cabinetName: string="";
    cqrsType: string="";
    volumeInMeterCube: number | null = null;
    length: number | null = null;
    distanceBetweenTwoBB: number | null = null;
    distanceBetweenTwoep: number | null = null;

    width: number | null = null;
    height: number | null = null;
    totalRow: number | null = null;
    totalColumn: number | null = null;
    totalRowB: number | null = null;
    totalColumnB: number | null = null;
    cylinderPosition: string="";
    lhs: number | null = null;
    rhs: number | null = null;
    back: number | null = null;
    totalInp: number | null = null;
airflow:number=0
openA:number=0
    backVolume: number | null = null;
    VentilationType:string='forced';
    ventilationType:string='forced';

    isActive:boolean=true;
  }
  export class EPRooms {
    id:number=0;
    roomName: string="";
    floorNo:number=0
    isActive:boolean=true
    cabinets: Cabinet[]=[];
  }
  export class epRooms {
    id:number=0;
    roomName: string="";
    floorNo:number=0
    cabinets: Cabinet[]=[];
  }

  export class Cabinet {
    id:number=0;
    roomId:number=0;
    cabinetName: string="";
    cqrsType: string="";
    volumeInMeterCube: number | null = null;
    distanceBetweenTwoBB: number | null = null;
    distanceBetweenTwoep: number | null = null;

    // floorNo: number | null = null;
    length: number | null = null;
    width: number | null = null;
    height: number | null = null;
    totalRow: number | null = null;
    totalColumn: number | null = null;
    totalRowB: number | null = null;
    totalColumnB: number | null = null;
    cylinderPosition: string="";
    lhs: number | null = null;
    rhs: number | null = null;
    back: number | null = null;
    totalInp: number | null = null;
airflow:number=0;
openA:number=0;
    backVolume: number | null = null;
    VentilationType:string='forced';
    ventilationType:string='forced';

    isActive:boolean=true;
  }

  export class CncMachineEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    distanceBetweenTwoBB:number | undefined;
    cylinderPosition:string=''
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    distanceLHS:number| undefined;
    distanceRHS:number| undefined;
    distanceBack:number| undefined;
    distanceBetweenTwoCNC:number=0;
    alarmRequired:string=''
    alarmOption:string=''
    dimensionsLengthEp:number | undefined;
    dimensionsWidthEp:number| undefined;
    dimensionsHeightEp:number| undefined;
    electicalPanelRequired:string="";
    cqrsType:string="";
    machineName:string="";
    totalRowofEP:number | undefined;
    totalColumnofEP:number | undefined;
    constructor(data?: Partial<CncMachineEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class ElectricalPanelEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    description: string="";
  panelLength:number | undefined;
  panelWidth:number | undefined;
  panelHeight:number | undefined;
  largestBoxLength:number | undefined;
  largestBoxWidth:number | undefined;
  largestBoxHeight:number | undefined;
  horizontalPartition:number | undefined;
  verticalPartition:number | undefined;
  rearPartition:number | undefined;
  roomNames:any;

    constructor(data?: Partial<ElectricalPanelEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class FumeHoodEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    distanceBetweenFumeHoods:number| undefined;
    roomNames:any;
    constructor(data?: Partial<FumeHoodEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class GensetEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    distanceBetweenGensetCanopies:number| undefined;
    roomNames:any;
    constructor(data?: Partial<GensetEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class NetworkRackEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    alarmRequired:string="";
    alarmOption:string="";
    noOfNetworkRooms:number=1;
    networkRooms: NetworkRoom[]=[];
    constructor(data?: Partial<NetworkRackEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class NetworkRoom {
    id:number=0;
    roomName: string="";
    rack: Rack[]=[];
  }

  export class Rack {
    id:number=0;
    roomId:number=0;
    rackName: string="";
    cqrsType: string="";
    length: number | null = null;
    width: number | null = null;
    height: number | null = null;
    cylinderPosition: string="";
    lhs: number | null = null;
    rhs: number | null = null;
    back: number | null = null;
    distanceBetweenTwoRacks: number | null = null;
    isActive:boolean=true;
  }

  export class PrintingMachineEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    cabinetLength:number| undefined;
    cabinetWidth:number| undefined;
    cabinetHeight:number | undefined;
    numberOfCabinets:number| undefined;
    distanceBetweenCabinets:number| undefined;
    roomNames:any;
    constructor(data?: Partial<PrintingMachineEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class ServerRackEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    distanceLHS:number| undefined;
    distanceRHS:number| undefined;
    distanceBack:number| undefined;
    distanceBetweenTwoServerRacks:number| undefined;
    roomNames:any;
    constructor(data?: Partial<ServerRackEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class TransformerEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    coilLength:number| undefined;
    coilWidth:number| undefined;
    coilHeight:number | undefined;
    roomNames:any;
    constructor(data?: Partial<TransformerEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class UpsEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    distanceBetweenTwoUPSPanels:number| undefined;
    roomNames:any;
    constructor(data?: Partial<UpsEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class VolvoBusEntity {
    id:number=0;
    flag:string="";
    cqrsId:number=0;
    prospectcode : string="";
    dimensionsLength:number | undefined;
    dimensionsWidth:number| undefined;
    dimensionsHeight:number| undefined;
    dimensionsOfVolvoBusEngine:number| undefined;
    roomNames:any;
    constructor(data?: Partial<UpsEntity>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class AssignToDesigner {
    inputSheetId: number=0;
    approvedBy: string="";
    designTeamId: string="";
    statusId: number=0;
    productId: number=0;
    taskCompleteDate: string="";
    productGroupCode: string="";
    remarks: string="";
    constructor(data?: Partial<AssignToDesigner>) {
        if (data) {
          Object.assign(this, data);
        }
      }
  }

  export class AddBoqEntity {
    flag: string = "";
    boqItemDetailsID: number = 0;
    productType: string = "";
    productName: string = "";
    productCode: string = "";
    productPrice: number = 0;
    qty: number = 0;
    unit: string = "";
    gst: number = 0;
    designerRemark: string = "";
    productDesc: string = "";
    make: string = "";
    prospectCode: string = "";
    createdBy: string = "";
    productImage: string = "";
    productId: number = 0;
    iid: number = 0;
    status:string="";

    constructor(data?: Partial<AddBoqEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
  

export class OtherInputsheetEntity {
  id:number=0;
  flag:string="";
  cqrsId:number=0;
  prospectcode : string="";
  nameOfEquipment: string="";
  enclosureName: string="";
  length:number| undefined;
  height:number| undefined;
  depth:number| undefined;
  fireClass: string="";
  circularDiameter:number| undefined;
  remarks: string="";
  constructor(data?: Partial<OtherInputsheetEntity>) {
      if (data) {
        Object.assign(this, data);
      }
    }
}

export class CustomizeInputsheetEntity {
  id:number=0;
  flag:string="";
  ciId:number| undefined;
  prospectcode : string="";
  nameOfEquipment: string="";
  enclosureName: string="";
  length:number| undefined;
  height:number| undefined;
  depth:number| undefined;
  fireClass: string="";
  circularDiameter:number| undefined;
  remarks: string="";
  area:number| undefined;
  noOfFloor:number| undefined;
  constructor(data?: Partial<OtherInputsheetEntity>) {
      if (data) {
        Object.assign(this, data);
      }
    }
}



  
  