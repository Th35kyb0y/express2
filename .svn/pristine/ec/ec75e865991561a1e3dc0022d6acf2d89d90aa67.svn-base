import { Component, Input, OnInit, ElementRef, ViewChild,AfterViewInit } from '@angular/core';

import { restapiURL } from 'src/app/services/restapi-url';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-proposal-summary',
  templateUrl: './proposal-summary.component.html',
  styleUrls: ['./proposal-summary.component.scss']
})
export class ProposalSummaryComponent implements OnInit ,AfterViewInit{
  // @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef;
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  @Input() ProspectCode: string='';
  @Input() CreatedByEmpCode: string='';

  // PCode: string;
  showCreateC : string='false'
  // PName: string;
  CurrentUser: any;
status : string=''
  currentProduct : any
  baseValueFinal : number=0
  deliveryCharge : number=0
  designCharge : number=0
  insCharge : number=0
  gstCharge:number=0
  netValueBeforeGST:number=0
  netValueAfterGST:number=0
  cs:boolean=false
  objDeliveryChrgDisc: number = 0;
  objInstallationChrgDisc: number = 0;
  objCBATotalBaseValue: number = 0;
  objCBATotalMarginValue: number = 0;
  objCBATotalNetValue: number = 0;
  objCBATotalValue: number = 0;
  objCBAVatValue: number = 20;
  objTotalBaseValue: number = 0;
  objTotalMarkupValue: number = 0;
  objTotalSellingPrice: number = 0;
  objTotalDiscoutValue: number = 0;
  objDeliveryCharge: number = 0;
  objInstallationCharge: number = 0;

  objVatValue: number = 0;

  CoveringLetterId: number = 0;
  finalProducts : any
  objDeliveryChargeValue: number = 0;
  objDesginCharge: number = 0;
  objOtherCaption: string = '';
  objOtherCharge: number = 0;
  objInstallationChargeValue: number = 0;
  objCBACoveringLetter: any;
  // showCoveringLetter: number;
  showTermsConditions: number = 0;
  ShowtabActive: number = 1;
  netValue:number=0
  objRunningDelivery: number = 0;
  objRunningInstallation: number = 0;
  kssAll : any[]=[]
  cqrsAll : any[]=[]
  gssALL : any[]=[]
  fireALL : any[]=[]
  ciALL : any[]=[]

  objProposalEntity:any
  objRunningDeliveryValue: number = 0;
  objRunningInstallationValue: number = 0;
  FASSOptionsDetailsID: number = 0;
  IsApplyToAllProduct: boolean = false;
  objDeliveryChargePercent: number = 0;
  objProposalSummaryEntityList : any
  objTotalGrossValue: number = 0;
  objDiscDeliveryChrgValue: number = 0;
  objDiscInstallationChrgValue: number = 0;
  objInstallationChargePercent: number = 0;
  MainHeaderPath: string = '';
  MainFooterPath: string = '';
  // objcbaProfile: CBAProfileEntity;
  CountryDetails: any;
  // ProductCode: string;
  ProposalType: string = '';
  CurrentEmployee: string = '';
  objInputsheetList: any;
  SelectedProductId: any;
  testData: any[]=[]
  IsApplyMarginToAllProduct: boolean = false;
  ProductOptionsTypeID: any=0;
  Nextbtn: boolean=false;
 proposalType :string =''
  TemplateModal:boolean=false;
  largeModal:boolean=false;
  EditTemplateModal:boolean=false;
  constructor(private activatedRoute: ActivatedRoute,  	 private router:Router, private http: HttpClient, private api : ApiService, private route: ActivatedRoute) { 
    this.CurrentUser = '';
    this.CountryDetails = '';
    this.route.params.subscribe(params => {
this.proposalType=params['proposalType']
      this.ProspectCode= params['proposalCode'];
      this.status= params['status'];
    

    });

  }
  ngAfterViewInit() {
    // The ViewChild is now guaranteed to be initialized
    // console.log(this.pdfContent);

  }
  ngOnInit(): void {
    if(localStorage.getItem("isCS")){
      this.cs=true
    }
    // alert(this.Prospec/tCode)
    this.kssAll=[]
    this.cqrsAll=[]
    this.gssALL=[]
this.fireALL=[]
this.ciALL=[]

    // this.BindtxtNotes();

    // this.CreatedByEmployeeDetail();

    this.objOtherCaption = '';
    this.objOtherCharge = 0;
    this.ProductSummaryList();
   
  }


 



  BindProposalList() {
    var query1 = '&ProspectCode=' + this.ProspectCode;
    this.api.httpget(query1, '/Proposal/ProposalDetails').subscribe(
      (data:any) => {
      if (data.StatusCode === 200) {
        this.objProposalEntity = JSON.parse(data.data);
      }
    });
  }
  handleNOimage(){

  }
  FileDownload2(e:any,name:string)
  {

    const fileUrl = 'https://cfx.ceasefire.biz/assets/proposal/PDF/'+name;

    const link = document.createElement('a');

 
    link.href = fileUrl;

    link.download = name;
    link.target = '_blank';

    document.body.appendChild(link);

 
    link.click();

    document.body.removeChild(link);
  }

  generatePDF(scenario:any) {
    console.log(this.gssALL[0])
    const fullname =
  this.cqrsAll.length > 0
    ? this.cqrsAll[0][0].fullname
    : this.kssAll.length > 0
    ? this.kssAll[0][0].fullname
    : this.fireALL.length > 0
    ? this.fireALL[0][0].fullname
    : this.gssALL.length > 0
    ? this.gssALL[0][0].fullname
    :
    this.ciALL.length > 0
    ? this.ciALL[0][0].fullname
    :
    '';
    let data = [
      { sectionName: "CQRS", data: this.cqrsAll , isHaskss: this.kssAll.length>0 , isHasgss:this.gssALL.length>0,prospectCode : this.ProspectCode ,
      fullname :fullname},


      { sectionName: "KSS", data: this.kssAll , isHaskss: this.kssAll.length>0 ,isHasgss:this.gssALL.length>0 ,prospectCode : this.ProspectCode ,
      fullname: this.kssAll.length > 0 ? this.kssAll[0].fullname : ''},

      { sectionName: "STANDALONE", data: this.fireALL , prospectCode : this.ProspectCode , isHaskss: this.kssAll.length>0,isHasgss:this.gssALL.length>0,
      
      fullname: this.fireALL.length > 0 ? this.fireALL[0].fullname : '' },

      { sectionName: "GSS", data: this.gssALL , prospectCode : this.ProspectCode , isHaskss: this.kssAll.length>0,isHasgss:this.gssALL.length>0,
      fullname:this.gssALL.length > 0 ? this.gssALL[0].fullname : ''},
      
      { sectionName: "Customized Input", data: this.ciALL , prospectCode : this.ProspectCode , isHaskss: this.kssAll.length>0,isHasgss:this.gssALL.length>0,
      fullname:this.ciALL.length > 0 ? this.ciALL[0].fullname : ''},

      
    ];
    

    let path = ""
    if(scenario=='standalone'){
      path='/PDF/generatePdfFE'
    }
    else{
      path='/PDF/generatePdf'
    }
    this.api.httpost(JSON.stringify(data), path).subscribe((data:any)=>{
      if(scenario!='from Submit'){
        alert("PDF Generated Successfully")

      }
      if(this.proposalType=='Standalone'){
        if(scenario!='from Submit'){
          this.FileDownload2("", this.ProspectCode+".pdf")

        }

      }
      else{
        if(scenario!='from Submit'){
          this.FileDownload2("", this.ProspectCode+".pdf")

        }

      }
      

    })
  }
  submitProposal(){
    this.api.httpgetMaster("&Flag=CompletedProposalSummary&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.api.getUserId()+"&PID=11&IID=65"+"", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        // console.log(response.data);

        // const modalRef = this.modalService.open(ConfirmPopupComponent);
        // modalRef.componentInstance.name = response.data[0].messageBox;
        // modalRef.componentInstance.proposalCode=this.ProspectCode;
        // modalRef.componentInstance.proposalType='System';
        //alert(response.data[0].messageBox)
		this.router.navigate(['user/proposal']);
      },
      (err) => {
      }
    );
  }
  ProductSummaryList() {
    var query2 = '&ProposalCode=' + this.ProspectCode+"&flag=products";
    this.api.httpget(query2, "/Proposal/getProposalProduct").subscribe(
      (data:any) => {
        // console.log(data , "...proposal data///")
      if (data.statusCode === 200) {
        this.objProposalSummaryEntityList = JSON.parse(data.data);
        this.testData=JSON.parse(data.data)
        // console.log(this.objProposalSummaryEntityList, "...");
   
          

        var query2 = '&ProposalCode=' + this.ProspectCode+"&flag=final";
        this.api.httpget(query2, "/Proposal/getProposalProduct").subscribe(
          (data:any) => {
            // alert("rus")
            // console.log(data , "...proposal data final///")
          if (data.statusCode === 200) {
            let d = JSON.parse(data.data)
            this.baseValueFinal=d[0].totalFinalProducttt
            this.deliveryCharge=d[0].deliveryCharge
            this.designCharge=d[0].designCharge
            this.insCharge=d[0].insCharge
            this.netValueBeforeGST=d[0].netValueBeforeGST
            this.gstCharge=d[0].gstCharge
            this.netValueAfterGST=d[0].netValueAfterGST
        
        
            
        
        
          }
              })



        
        // let cqrsArr=[]
        let cqrsArr: (number | string)[] = [];

        let kssArr: (number | string)[] = [];
        let gssArr: (number | string)[] = [];
        let atomArr: (number | string)[] = [];
        let fireArr : (number | string)[] = [];
        let ciArr : (number | string)[] = [];

        if(this.objProposalSummaryEntityList){
          debugger
          // console.log(this.objProposalSummaryEntityList, "raw")/
           cqrsArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId=== 2);
           kssArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 3);
           gssArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 4)
           atomArr=this.objProposalSummaryEntityList.filter((i:any) => i.category === 'Atom-X');
           fireArr=this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 11);
           ciArr=this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 13);

        
        }
console.log(kssArr, "kss arr")
console.log(cqrsArr, "cqrsArr arr")
console.log(gssArr, "gssArr arr")
console.log(atomArr, "atomArr arr")
console.log(fireArr, "fireArr arr")
console.log(ciArr, "ciArr arr")







        this.finalProducts =this.objProposalSummaryEntityList.filter(
          (thing:any, i:any, arr:any) => arr.findIndex((t:any) => t.ProductCode === thing.ProductCode) === i
          );
          let pc: any[] = [];

(pc as any) = this.objProposalSummaryEntityList.map((i:any) => i.ProductCode);
// console.log(pc, "pc");
// let pc2 = this.objProposalSummaryEntityList.map((i) => i.ProductCode);

// Create an object to store the counts
// let productCodeCounts = {};
let productCodeCounts: { [key: string]: number } = {};

// Count occurrences of each product code
for (let code of pc) {
 ( productCodeCounts[code] as any) = (productCodeCounts[code] || 0) + 1;
  // console.log(productCodeCounts, "../test")
}
this.finalProducts.map((product:any) => {
  if (productCodeCounts[product.ProductCode]) {

  // product.QTY=productCodeCounts[product.ProductCode]
  if(product.QTY>1){
let q1 = "&productCode="+product.ProductCode+"&ProspectCode="+this.ProspectCode
// this.api.httpget(q1, "Proposal/getTotal").subscribe((data : any)=>{
//   // console.log(data.Data.TotalQTY," yugyu")
//   let d= JSON.parse(data.data)
// product.MarginValue1=d[0].TotalQTY
// console.log(this.finalProducts, ".....fp")
// console.log(this.kssAll, "klssfp")
// })
  }
    // alert(productCodeCounts[product.ProductCode])
    // product.ProductDiscountPercentage= allDiscountsWithProductCode.
    // alert(`Product code ${product.ProductCode} has a count of ${productCodeCounts[product.productCode]}`);
 
  }
// console.log(pc, "pc");
// alert("runs")

  if( gssArr.length>0){
  
    let gssByIid = gssArr.reduce((acc:any, obj:any) => {
      const iid = obj.IID;
      if (!acc[iid]) {
        acc[iid] = [];
      }
      acc[iid].push(obj);
      return acc;
    }, {});
    const myArray2kss : any[] = Object.values(gssByIid);
    this.gssALL = myArray2kss
    // console.log(myArray2kss, "kss arr")
    let kss1=gssByIid[gssArr[0]]
    // console.log(kss1, "kss1x")
 
  }

  
  if( ciArr.length>0){
  
    let ciByIid = ciArr.reduce((acc:any, obj:any) => {
      const iid = obj.IID;
      if (!acc[iid]) {
        acc[iid] = [];
      }
      acc[iid].push(obj);
      return acc;
    }, {});
    const myArray2kss : any[] = Object.values(ciByIid);
    this.ciALL = myArray2kss
    // console.log(myArray2kss, "kss arr")
    let kss1=ciByIid[ciArr[0]]
    // console.log(kss1, "kss1x")
 
  }
// console.log(pc, "pc");
// alert("runs")
  if( cqrsArr.length>0){
    // alert("rr")
    // console.log(this.objProposalSummaryEntityList, "all cqrs")
    // console.log(kssArr, " kss2")
    let cqrsByIid = cqrsArr.reduce((acc:any, obj:any) => {
      const iid = obj.IID;
      if (!acc[iid]) {
        acc[iid] = [];
      }
      acc[iid].push(obj);
      return acc;
    }, {});
    const myArray2cqrs : any[] = Object.values(cqrsByIid);
    this.cqrsAll = myArray2cqrs
    // console.log(myArray2cqrs, "cqrs arr")
    let kss1=cqrsByIid[cqrsArr[0]]
    // console.log(kss1, "kss1x")
    // for (let index = 0; index < kss1.length; index++) {
    //   // alert(i)
    //   //  this.KSSarr.push(kss1[index]);
      
    // }
  }
  if( fireArr.length>0){
  
    let fireByIid = fireArr.reduce((acc:any, obj:any) => {
      const iid = obj.IID;
      if (!acc[iid]) {
        acc[iid] = [];
      }
      acc[iid].push(obj);
      return acc;
    }, {});
    const myArray2fire: any[] = Object.values(fireByIid);
    this.fireALL = myArray2fire
    // console.log(myArray2kss, "kss arr")
    let kss1=fireByIid[gssArr[0]]
    // console.log(kss1, "kss1x")
  
  }

  if( kssArr.length>0){
    // console.log(this.objProposalSummaryEntityList, "all")
    // console.log(kssArr, " kss2")
    let kssByIid = kssArr.reduce((acc:any, obj:any) => {
      const iid = obj.IID;
      if (!acc[iid]) {
        acc[iid] = [];
      }
      acc[iid].push(obj);
      return acc;
    }, {});
    const myArray2kss : any[] = Object.values(kssByIid);
    this.kssAll = myArray2kss
    // console.log(myArray2kss, "kss arr")
    let kss1=kssByIid[kssArr[0]]
    // console.log(kss1, "kss1x")
    // for (let index = 0; index < kss1.length; index++) {
    //   // alert(i)
    //   //  this.KSSarr.push(kss1[index]);
      
    
  }
 


});






// ..............

      }
    });

  }

  
  getDiscountPrice(cq:any){
    let total =0
    // for (let index = 0; index < cq.length; index++) {
    //   // const element = array[index];
    //   total += cq[index].ProductDiscountValue * cq[index].Qty
    // }
    // console.log(Number(cq.SellingPrice), "cqqrrsssrrser")
    return total 
  }

   getInsPrice(cq:any) {
    let total = cq.ProductPrice * cq.Qty;
    
    // Calculate installation charge based on percentage
    let insChargePercentage = cq.InsChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
    let insCharge = (insChargePercentage / 100) * total;

    // Add installation charge to the total
    total = insCharge;

    // console.log(cq, "ins");
    return total;
}
getIns(cq:any){
  let ins=0
  for (let index = 0; index < cq.length; index++) {
    const element = cq[index];
    ins+=element.insCharge1
    
  }
  return ins
}
 getGST(v:any) {
  return (v * 0.18).toFixed(2);
}

 getInsV(cq:any) {
  let totalInsCharge = 0;

  for (let index = 0; index < cq.length; index++) {
      // Calculate installation charge based on percentage for each element
      let insChargePercentage = cq[index].InsChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
      let insCharge = (insChargePercentage / 100) * (cq[index].ProductPrice * cq[index].Qty);

      // Add installation charge for the current element to the total
      totalInsCharge += insCharge;

      // console.log(cq[index], "ins");
  }

  return totalInsCharge;
}

getDeliveryV(cq:any){
  let total=0
  for (let index = 0; index < cq.length; index++) {
    const element = cq[index];
    total+=element.deliveryCharge
    
  }
  return total
}


getdesignPrice(cq:any) {
  let total = cq.ProductPrice * cq.Qty;
  
  // Calculate installation charge based on percentage
  let insChargePercentage = cq.DesignChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
  let insCharge = (insChargePercentage / 100) * total;

  // Add installation charge to the total
  total = insCharge;

  // console.log(cq, "ins");
  return total;
}

getNetValue(arr:any){
  // console.log(arr , "net")
  let netVal=0
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    netVal+=Number(element.netValueBeforeGST1)
  
  }
  netVal+=Number(arr[0].discValue)
  netVal+=Number(arr[0].deliveryChargeFinal?arr[0].deliveryChargeFinal:arr[0].deliveryCharge1)
  netVal+=Number(arr[0].designChargeFinal?arr[0].designChargeFinal:arr[0].designCharge1)
  netVal+=Number(arr[0].insChargeFinal?arr[0].insChargeFinal:arr[0].insCharge1)
  this.netValue=netVal
  return netVal
}
// getNetValue

  ViewPDFSM(){
  
    // this.spinner.show();


    setTimeout(() => {
      var query2 = '&ProposalCode=' + this.ProspectCode;
      this.api.httpget(query2, "/Proposal/getProposalProduct").subscribe((data:any) => {
        // console.log(data.Data)
        let allKeys=[]
        let cqrsArr = JSON.parse(data.data).filter((i:any) => i.ProductId === 2);
  let kssArr= JSON.parse(data.data).filter((i:any) => i.ProductId === 3);
  let gssArr= JSON.parse(data.data).filter((i:any) => i.ProductId === 4);
  let atomArr= JSON.parse(data.data).filter((i:any) => i.category === 'Atom-X');
  let fireArr= JSON.parse( data.data).filter((i:any) => i.category === 'Fire');
  
  // console.log(data, "proppsak")
  // Using the reduce method to group objects by their 'iid' property
  let cqrsByIid = cqrsArr.reduce((acc:any, obj:any) => {
    const iid = obj.IID;
    if (!acc[iid]) {
      acc[iid] = [];
    }
    acc[iid].push(obj);
   
    return acc;
  }, {});
  // console.log(allKeys," allk")
  let keys = Object.keys(cqrsByIid);
  for (let key of keys) {
    // Use 'key' here to access each key in the object
    allKeys.push({cat:"CQRS", iid:key})
    // console.log(allKeys, "inl")
  }
  // Access the first key (assuming there is at least one key in cqrsByIid)
  let cqrs1ID = keys[0];
  // let cqrs2ID = keys[1];
  
  let gssByIid = gssArr.reduce((acc:any, obj:any) => {
    const iid = obj.IID;
    if (!acc[iid]) {
      acc[iid] = [];
    }
    acc[iid].push(obj);
    return acc;
  }, {});
  let keys3 = Object.keys(gssByIid);
  for (let key of keys3) {
    // Use 'key' here to access each key in the object
    allKeys.push({cat:"Gas Suppression System", iid:key})
    // console.log(allKeys, "inl")
  }
  // Access the first key (assuming there is at least one key in cqrsByIid)
  let gss1ID = keys3[0];
  
  let atomByIid = atomArr.reduce((acc:any, obj:any) => {
    const iid = obj.IID;
    if (!acc[iid]) {
      acc[iid] = [];
    }
    acc[iid].push(obj);
    return acc;
  }, {});
  let keys4 = Object.keys(atomByIid);
  for (let key of keys4) {
    // Use 'key' here to access each key in the object
    allKeys.push({cat:"Atom-X", iid:key})
    // console.log(allKeys, "inl")
  }
  
  
  
  let fireByIid = fireArr.reduce((acc:any, obj:any) => {
    // console.log(obj , " fire")
    const iid = obj.IID;
    if (!acc[iid]) {
      acc[iid] = [];
    }
    acc[iid].push(obj);
    return acc;
  }, {});
  let keys7 = Object.keys(fireByIid);
  for (let key of keys7) {
    // Use 'key' here to access each key in the object
    allKeys.push({cat:"Fire", iid:key})
    // console.log(allKeys, "inl")
  }
  
  
  // Access the first key (assuming there is at least one key in cqrsByIid)
  // let gss1ID = keys3[0];
  
  
  let kssByIid = kssArr.reduce((acc:any, obj:any) => {
    const iid = obj.IID;
    if (!acc[iid]) {
      acc[iid] = [];
    }
    acc[iid].push(obj);
    return acc;
  }, {});
  let keysKSS = Object.keys(kssByIid);
  for (let key of keysKSS) {
    // Use 'key' here to access each key in the object
    allKeys.push({cat:"Kitchen Suppression System", iid:key})
    // console.log(allKeys, "inl")
  }
  // Access the first key (assuming there is at least one key in cqrsByIid)
  let kss1ID = keysKSS[0];
  // let cqrs2ID = keys[1];
  
  // Access the array associated with the first key (the first group)
  // let cqrs1 = cqrsByIid[firstKey];
  
  // console.log(firstKey);
  var query1 = '&ProspectCode=' +this.ProspectCode+ '&CustomerCode=6554436545'+'&FASSOptionId=1&LoggedEmpCode=' +
  this.CurrentUser.EmpCode + '' +"&cqrs1ID="+cqrs1ID+"&cqrs2ID="+gss1ID+"&kss1ID="+kss1ID+"&allKey="+JSON.stringify(allKeys);
  this.api.httpget(query1, '/Proposal/PDFGeneate2').subscribe(
   (data:any) => {
     if (data.Status === true) {
       //this.objCBATemplateList = data.Data;
       //alert('Generated');
    
      //  this.spinner.hide();
     }
   });
      })
    },200)
    // console.log(ProposalEntity)

    // var query1 = '&ProspectCode=' + this.ProspectCode;

   
    
}
FileDownload(e:any,name:string)
{
  const fileUrl = e;

  // Create a link element
  const link = document.createElement('a');

  // Set the href attribute with the file URL
  link.href = fileUrl;

  // Set the download attribute with the desired file name
  link.download = name;

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click event on the link
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}
FileDownloadSM(fileName: string) {
  fileName = this.ProspectCode + ".pdf";
  // var query1 = 'FileName=' + fileName;
  // this.ApiServive.httpgetForDownloadFile(query1, restAPIPath.PDFDownLoadFile).subscribe(
  //   fileData => {
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

addNewProduct(cq:any){
  // console.log(cq)
}
deleteInputsheet(sheet:any){
  // alert(sheet)
  let q = "&iid="+sheet
  this.api.httpget(q, "/Proposal/DeleteInputsheetSummary").subscribe((d)=>{
    alert("Inputsheet Deleted Successfully")
    // window.location.reload()
    // // this.getProd()
    // this.ProductSummaryList();
    // this.getSumDelivery()
    // this.CBAProductSummaryList();
    // this.ApiServive.routerService("EditProposal?ProspectCode="+this.ProspectCode+"&BT=Standalone"+"&createdBy="+this.createdBy)
  
  })
    }
  total(cq:any){
    let total =0
    let dp
    let dc 
    let insChargePercentage
    let insCharge
    for (let index = 0; index < cq.length; index++) {
      // const element = array[index];
      total += (cq[index].ProductPrice) * cq[index].Qty
      insChargePercentage = cq[index].InsChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
      insCharge = (insChargePercentage / 100) * total;
      dp = cq[index].DesignChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
       dc = (insChargePercentage / 100) * total;
      total+= (insCharge+dc)
    }
    // console.log(Number(cq.SellingPrice), "cqqrrsssrrser")
    let tw= total * 0.18
    let final =  Number(total) + Number(tw)
    return final
  }
  getTotalPrice(cq:any){
  let gst = this.getGST(this.getNetValueForSystem(cq))
  return Number(this.getNetValueForSystem(cq))+Number(gst)
    // return final.toFixed(2)
  }
  setDeliveryChargeFD(cq: any, e:any) {
    // console.log(cq, "fire")

    // Get the input and calculate the discounted delivery charge
    const discountPercentage = parseFloat(e?.target?.value) || 0;
    const deliveryCharge = parseFloat(cq[0].deliveryCharge1) || 0;
    const discountedDeliveryCharge = deliveryCharge - (deliveryCharge * (discountPercentage / 100));
// console.log(discountedDeliveryCharge*parseFloat(e?.target?.value),"discount.....")
cq.map((i:any)=>{
i.deliveryChargeDiscV=(deliveryCharge * (discountPercentage / 100))
// console.log((discountPercentage / 100), "ds")
// console.log(deliveryCharge , "dcv")
// console.log(deliveryCharge * (discountPercentage / 100), "ds")
i.deliveryChargeFinal=discountedDeliveryCharge
i.DiscDeliveryChargePercentage= parseFloat(e?.target?.value) || 0;
// i.netValueBeforeGST1=i.netValueBeforeGST1-(deliveryCharge * (discountPercentage / 100))
})
    // Update the content of the span element
    // document.getElementById('discountedDeliveryCharge').innerText = discountedDeliveryCharge.toFixed(2);
}
changeDisc(cq:any,e:any){
  cq.map((i:any)=>{
    i.discValue=Number(e.target.value)
  })
}
setInsChargeFD(cq: any, e:any) {
  // Get the input and calculate the discounted installation charge
  const discountPercentage = parseFloat(e?.target?.value) || 0;
  const insCharge = parseFloat(cq[0].insCharge1) || 0;
  const discountedInsCharge = insCharge - (insCharge * (discountPercentage / 100));
  const tenPercentOfDiscountedInsCharge = discountedInsCharge * 0.1;
  cq.map((i:any)=>{
    i.insChargeDiscV=(insCharge * (discountPercentage / 100))
    i.insChargeFinal=discountedInsCharge
    i.DiscInsChargePercentage=parseFloat(e?.target?.value) || 0;
    })

}

setDesignChargeFD(cq: any, e:any) {
  // Get the input and calculate the discounted installation charge
  const discountPercentage = parseFloat(e?.target?.value) || 0;
  const insCharge = parseFloat(cq[0].designCharge1) || 0;
  const discountedInsCharge = insCharge - (insCharge * (discountPercentage / 100));
  const tenPercentOfDiscountedInsCharge = discountedInsCharge * 0.1;
  cq.map((i:any)=>{
    i.designChargeDiscV=(insCharge * (discountPercentage / 100))
    i.designChargeFinal=discountedInsCharge
    i.DiscDesignChargePercentage=parseFloat(e?.target?.value) || 0;
    })


}
saveDiscounts(cq:any){
// console.log(cq)
this.api.httpost(cq, "/Proposal/saveDiscounts").subscribe((data:any)=>{
  alert("Discounts Added Successfully")
window.location.reload()
})
}
  DeleteProposal(item:any,j:any){
    // alert(item[j].IID)
    console.log(item ,"iiii")
        if (!confirm('Are you sure, you want to delete this product?')) {
          return;
        }
     var query1 = "&id="+item[j].BOQItemDetailsID
        
    
        this.api.httpget(query1, "Inputsheet/deleteProduct").subscribe(
         ( data : any )=> {
            if (data.Status === true) {
              // this.objProductSearched = [];
              // this.objFireExtinguisherEntityList = [];
              // this.getProd()
              this.ProductSummaryList();
              // this.CBAProductSummaryList();
              // this.CalculateProposalSummary();
              // this.CalculateValue();
              // this.CalculateValueFinal();
              alert('Product deleted successfullyyyy');
    // window.location.reload()
    
    
              // this.api.routerService('/EditProposal?ProspectCode=' + this.ProspectCode + '&BT=Standalone');
            }
          });
    
      }
 




  ViewPDF() {
    var query1 = '&ProspectCode=' + this.ProspectCode + '&CustomerCode=C2020116112846654&FASSOptionId=1&LoggedEmpCode=test'  + '';
    this.api.httpget(query1, "restAPIPath.ViewPDF").subscribe(
      (data:any) => {
        if (data.StatusCode === 200) {
          setTimeout(() => { }, 50050);
        }
      });
  }






  getNetValueForSystem(cq:any){
let nv=0
    for (let index = 0; index < cq.length; index++) {
      const element = cq[index];
      nv+=element.netValueBeforeGST1
    }
    return nv
  }
  getDc(cq:any){
    let nv=0
    for (let index = 0; index < cq.length; index++) {
      const element = cq[index];
      nv+=element.designCharge1
    }
    return nv
  }
  getdelc(cq:any){
    let nv=0
    for (let index = 0; index < cq.length; index++) {
      const element = cq[index];
      nv+=element.deliveryCharge1
    }
    return nv
  }
  

  // AddMoreDiscount(item, i) {
  //   this.objFireExtinguisherEntity = new FireExtinguisherEntity();
  //   this.objFireExtinguisherEntity = item;
  //   var query2 = '&ProspectCode=' + this.objFireExtinguisherEntity.ProspectCode;
  //   this.api.httpget(query2, restAPIPath.CheckAnyMarginPending).then(
  //     (data:any) => {
  //     if (data.StatusCode === 200) {
  //       if(JSON.parse(data.data)[0].MStatus === true){        
  //         //this.toast.showWarning('Your Margin is under review, Once it is approved by Sales Admin then you may process.','Warning');
  //       //$('#finalModal').modal('hide');
  //       this.Nextbtn=true;
  //       return;
  //     }else{
  //       //$('#finalModal').modal('show');
  //     }
  //     console.log(data);
  //   }
  //   });
    
  //   if (i == 0) {
  //     this.showIsApply = true;
  //   }
  //   else {
  //     this.showIsApply = false;
  //   }
  //   this.IsApplyToAllProduct = false;

  //   this.objFireExtinguisherEntity.ProductDiscount = item.ProductDiscountPercentage;
  //   this.objDiscountValue = 0;
  //   this.objMarginValue = 0;
  //   this.FASSOptionsDetailsID = item.FASSOptionsDetailsID;

  //   this.objFireExtinguisherEntity.DeliverchargeDiscount = item.DiscDeliveryChargePercentage;
  //   this.objFireExtinguisherEntity.InstallationchargeDiscount = item.DiscInstallationChargePercentage;
  //   this.objFireExtinguisherEntity.DesignchargeDiscount = item.DiscDesginChargePercentage;

  //   this.objRunningDelivery = Number(item.DeliveryChargeValue);
  //   this.objRunningInstallation = Number(item.InstallationChargeValue);
  //   this.objRunningDesign= Number(item.DesginChargeValue);

  //   if (this.objFireExtinguisherEntity.AddMargin == undefined) {
  //     this.objFireExtinguisherEntity.SellingPrice = Number(this.objFireExtinguisherEntity.ProductPrice);
  //     this.objFireExtinguisherEntity.FinalSellPrice = Number(this.objFireExtinguisherEntity.ProductPrice);
  //   }
  //   else {
  //     this.objFireExtinguisherEntity.SellingPrice = Number(this.objFireExtinguisherEntity.ProductPrice) + (Number(this.objFireExtinguisherEntity.ProductPrice) * this.objFireExtinguisherEntity.AddMargin) / 100;
  //     this.objFireExtinguisherEntity.FinalSellPrice = Number(this.objFireExtinguisherEntity.ProductPrice) + (Number(this.objFireExtinguisherEntity.ProductPrice) * this.objFireExtinguisherEntity.AddMargin) / 100;
  //   }
  //   if (this.objFireExtinguisherEntity.ProductDiscount > 0) {
  //     Number(this.objFireExtinguisherEntity.FinalSellPrice) - parseFloat(((Number(this.objFireExtinguisherEntity.SellingPrice) * Number(this.objFireExtinguisherEntity.ProductDiscount)) / 100).toString());
  //   }
  //   this.CalculateValue();
  // }


  
  
 


  // DeleteProposal(item) {
  //   if (!confirm('Are you sure, you want to delete this product?')) {
  //     return;
  //   }

  //   var abc=this.ProspectCode
  //   this.objProductItemEntity.Flag = 'Delete';
  //   this.objProductItemEntity.FASSOptionsDetailsID = item.FASSOptionsDetailsID;
  //   this.objProductItemEntity.ProductOptionsTypeID = item.FASSOptionsDetailsID;
  //   this.objProductItemEntity.ProductDiscountPercentage = 0;
  //   this.objProductItemEntity.ProductDiscountValue = 0;
  //   this.objProductItemEntity.ProductCode = item.ProductCode;
  //   this.objProductItemEntity.ProspectCode = item.prospectcode;
  //   this.objProductItemEntity.DeliveryChargePercentage = 0;

  //   this.objProductItemEntity.NetValue = 0;
  //   this.objProductItemEntity.Tax = 20;
  //   this.objProductItemEntity.TaxValue = 0;
  //   this.objProductItemEntity.TotalValue = 0;

  //   this.objProductItemEntity.DesginCharge = 0;
  //   this.objProductItemEntity.DiscountPercentOnDesignCharge = 18;
  //   this.objProductItemEntity.DiscountedDesignCharge = 0;
  //   this.objProductItemEntity.Margin = 0;
  //   this.objProductItemEntity.MarginValue = 0;

  //   this.api.httpost(this.objProductItemEntity, restAPIPath.UpdateProductOptions).then(
  //     (data:any) => {
  //       if (data.StatusCode === 200) {
  //         this.ProductSummaryList();
  //         this.CBAProductSummaryListNew()
  //         this.CBAProductSummaryList()
  //         //this.toast.showSuccess('Product deleted successfully','Success');
  //       }
  //     });

  // }



getbaseValue(cq:any){
  let netVal=0
  for (let index = 0; index < cq.length; index++) {
    const element = cq[index];
netVal+=element.ProductPrice*element.Qty
  }

  return netVal
}

getFinalBalue(gst:any, net:any){
  return Number(gst)+Number(net)
}
getTotalPriceC(cq:any){
  
let total =0
let dp=0
let dc =0
let insChargePercentage=0
let insCharge=0
let designC =0
let insC=0
  for (let index = 0; index < cq.length; index++) {

    total += (cq[index].ProductPrice) * cq[index].Qty
    insChargePercentage = cq[index].InsChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
    insCharge = (insChargePercentage / 100) * total;
    dp = cq[index].DesignChargeInPercentage || 0; // Default to 0 if InsChargeInPercentage is not provided
     dc = (dp / 100) * total;

     designC=dc
     insC=insCharge
  total+=cq[index].deliveryCharge

  }
  // console.log(insCharge)
  // console.log(dc)
  total+= (insCharge+dc)
  return total
}
     

getFinal(cq:any){
  let p = Number(this.getTotalPriceC(cq))
  return( p * 0.18).toFixed(2)
}
   

    
    
}
