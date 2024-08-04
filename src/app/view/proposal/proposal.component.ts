import { Component, OnInit , TemplateRef, inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPopupComponent } from '../express-proposal/inputsheet/confirm-popup/confirm-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
  private modalService = inject(NgbModal);
  proposalData: any;
  proposalCode : any
  isDE : boolean=false
  kssAll : any[]=[]
  cqrsAll : any[]=[]
  gssALL : any[]=[]
  fireALL : any[]=[]
  ProspectCode:any
  scenario :any
  objProposalSummaryEntityList : any
  testData:any
  baseValueFinal : number=0
  deliveryCharge : number=0
  isCS :boolean=false
  designCharge : number=0
  insCharge : number=0
  gstCharge:number=0
  netValueBeforeGST:number=0
  netValueAfterGST:number=0
  finalProducts:any
  globalFilter: string='';
  constructor(public ApiService: ApiService,private _router: Router,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {

      if(params['proposalCode']!=undefined)
      {
        this.globalFilter= params['proposalCode'];
        
      }

    });
  }

  ngOnInit(): void {
    const d= this.calculateMonthRange()
    this.isCS=this.ApiService.getCS();
    this.isDE=this.ApiService.getDE()

    this.proposalSearchFilter.fromDate=d.firstDate
    this.proposalSearchFilter.toDate=d.lastDate
    this.getProposalData();
    this.kssAll=[]
    this.cqrsAll=[]
    this.gssALL=[]
this.fireALL=[]
  }

  proposalSearchFilter:any={
    fromDate:'',
    toDate:'',
    status:'All'
  }

  calculateMonthRange(): { firstDate: string, lastDate: string } {
    let currentDate = new Date();
		let firstDate = new Date(currentDate.getFullYear(), 0, 1); 
		let lastDate = new Date(currentDate.getFullYear(), 11, 31); 

    return {
      firstDate: formatDate(firstDate, 'yyyy-MM-dd', 'en-US'),
      lastDate: formatDate(lastDate, 'yyyy-MM-dd', 'en-US')
    };
  }



  contactPersonName: string = '';
  email: string = '';
  contacts: any[] = [];


  ProductSummaryList() {
    var query2 = '&ProposalCode=' + this.ProspectCode+"&flag=products";
    this.ApiService.httpget(query2, "/Proposal/getProposalProduct").subscribe(
      (data:any) => {
        // console.log(data , "...proposal data///")
      if (data.statusCode === 200) {
        this.objProposalSummaryEntityList = JSON.parse(data.data);
        this.testData=JSON.parse(data.data)
        // console.log(this.objProposalSummaryEntityList, "...");
   
          

        var query2 = '&ProposalCode=' + this.ProspectCode+"&flag=final";
        this.ApiService.httpget(query2, "/Proposal/getProposalProduct").subscribe(
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
        if(this.objProposalSummaryEntityList){
          debugger
          // console.log(this.objProposalSummaryEntityList, "raw")/
           cqrsArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId=== 2);
           kssArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 3);
           gssArr = this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 4)
           atomArr=this.objProposalSummaryEntityList.filter((i:any) => i.category === 'Atom-X');
           fireArr=this.objProposalSummaryEntityList.filter((i:any) => i.ProductId === 11);
        
        }
console.log(kssArr, "kss arr")
console.log(cqrsArr, "cqrsArr arr")
console.log(gssArr, "gssArr arr")
console.log(atomArr, "atomArr arr")
console.log(fireArr, "fireArr arr")






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



  generatePDF() {
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
    : '';
    let data = [
      { sectionName: "CQRS", data: this.cqrsAll , isHaskss: this.kssAll.length>0 , isHasgss:this.gssALL.length>0,prospectCode : this.ProspectCode ,
      fullname :fullname},


      { sectionName: "KSS", data: this.kssAll , isHaskss: this.kssAll.length>0 ,isHasgss:this.gssALL.length>0 ,prospectCode : this.ProspectCode ,
      fullname: this.kssAll.length > 0 ? this.kssAll[0].fullname : ''},

      { sectionName: "STANDALONE", data: this.fireALL , prospectCode : this.ProspectCode , isHaskss: this.kssAll.length>0,isHasgss:this.gssALL.length>0,
      
      fullname: this.fireALL.length > 0 ? this.fireALL[0].fullname : '' },

      { sectionName: "GSS", data: this.gssALL , prospectCode : this.ProspectCode , isHaskss: this.kssAll.length>0,isHasgss:this.gssALL.length>0,
      fullname:this.gssALL.length > 0 ? this.gssALL[0].fullname : ''},

      
    ];
    

    let path = ""
    if(this.scenario=='Standalone'){
      path='/PDF/generatePdfFE'
    }
    else{
      path='/PDF/generatePdf'
    }
    this.ApiService.httpost(JSON.stringify(data), path).subscribe((data:any)=>{
      
        this.ApiService.httpost(this.contacts, "/Email/sendProposalToCustomer").subscribe((data:any)=>{
          this.ApiService.httpgetMaster("&Flag=SubmittedToClient&ProspectCode=" + this.proposalCode+"&CreatedBy="+this.ApiService.getUserId()+"&PID=11&IID=65"+"", "/Proposal/submitInputsheet").subscribe(
            (response: any) => {
          alert("Submitted To Customer")
          
          this.modalService.dismissAll();
          // window.location.reload()
          this.getProposalData()
              console.log(response.data);
              // const modalRef = this.modalService.open(ConfirmPopupComponent);
              // modalRef.componentInstance.name = response.data[0].messageBox;
              // modalRef.componentInstance.proposalCode=this.ProspectCode;
              // modalRef.componentInstance.proposalType='System';
              //alert(response.data[0].messageBox)
          // this.router.navigate(['user/proposal']);
            },
            (err) => {
          this.modalService.dismissAll();
          
            }
          );
          
              })
        // alert("PDF Generated Successfully")

      
      // if(this.proposalType=='Standalone'){
      //   if(scenario!='from Submit'){
      //     this.FileDownload2("", this.ProspectCode+".pdf")

      //   }

      // }
      // else{
      //   if(scenario!='from Submit'){
      //     this.FileDownload2("", this.ProspectCode+".pdf")

      //   }

      // }
      

    })
  }


  addContact() {
    if (this.contactPersonName && this.email) {
      this.contacts.push({
        to: false,
        cc: false,
        contactPersonName: this.contactPersonName,
        email: this.email,
        proposalCode: this.proposalCode
      });
      this.clearForm();
    }
  }

  clearForm() {
    this.contactPersonName = '';
    this.email = '';
  }

  submitForm() {

    this.generatePDF()

    // Handle form submission if needed
  }
  getInpsheets(i:any){
 
// Define a type for the keys of numberMap
type NumberKey = 2 | 11 | 4 | 3|13;

const numberToString = (num: NumberKey): string => {
    const numberMap: Record<NumberKey, string> = {
        2: 'CQRS',
        11: 'STANDALONE',
        4: 'Total Flooding System',
        3: 'Kitchen Suppression System',
        13: 'Customize Inputsheet',

        // Add more mappings as needed
    };

    return numberMap[num] || num.toString(); // If mapping doesn't exist, return the number as string
};

const inputArray: NumberKey[] = i.split(',')

const convertedArray: string[] = inputArray.map(num => numberToString(num));

console.log(convertedArray);

return convertedArray

  
  }
  getProposalData() {
  const query=`&CustomerId=${this.ApiService.getUserId()}&fromDate=${this.proposalSearchFilter.fromDate}&toDate=${this.proposalSearchFilter.toDate}`

    this.ApiService.httpgetMaster(query, "/Proposal/getProposalData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.proposalData=response.data;
        this.ProspectCode=this.proposalData
        this.applyFilter(this.globalFilter);
        console.log("Propsal Data is ....",this.proposalData)
      },
      (err) => {
      }
    );
  }

   routeToProposal(item:any) {

    this._router.navigate(['/eproposal', { proposalCode: item.proposalCode,proposalType:item.productType,  }]);
  }
  routeToProposalSummary(item:any) {

    this._router.navigate(['/eproposal-summary', { proposalCode: item.proposalCode,proposalType:item.productType, status:item.status}]);
  }
  routeToOrder(item:any) {
    this.ApiService.routeToOrder(item);
    //this._router.navigate(['./user/shipping-address'], { queryParams: { proposalCode: item.proposalCode } });
    //this._router.navigate(['/user/shipping-address', { proposalCode: item.proposalCode}]);
  }
  getImageSrc(e:number): string {
    switch (e) {
      case 2:
        return 'https://ccrmuk.ceasefire.biz/assets/icons/Category1_20240117172159.png'; // Change the path accordingly
      case 3:
        return 'https://ccrmuk.ceasefire.biz/assets/icons/kss.jpg'; // Change the path accordingly
      case 4:
        return 'https://ccrmuk.ceasefire.biz/assets/icons/gas_ss.png'; // Change the path accordingly
        case 11:
          return 'https://cfx.api.ceasefire.biz/Images/46d924ff-7558-40cd-88b7-3348b0f3135f.png';
      default:
        return 'https://ccrmuk.ceasefire.biz/assets/icons/kss.jpg'; // Provide a default image path or handle other cases
    }

}
onTypeOfEqChange(e:string,content: TemplateRef<any>, data:any)
{
  this.proposalCode=data.proposalCode
this.ProspectCode=data.proposalCode
this.scenario=data.productType
this.ProductSummaryList()
    // this.modelText="Sorry no solution is available in CQRS for open cabinets. Please see other options like Total flooding system. Do you want to get solution for total flooding system";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );

}




//Ajay
statusDataArray:any[]=['Completed Proposal','Received From Design Cell','Pending with Design Cell','Submitted To Client','All']



getApplicationAreaSelectedData(){

}

proposalDataByFilter:any

OnSearchProposal(){
  debugger
  console.log("Search Data is...",this.proposalSearchFilter)

  const query=`&CustomerId=${this.ApiService.getUserId()}&fromDate=${this.proposalSearchFilter.fromDate}&toDate=${this.proposalSearchFilter.toDate}&status=${this.proposalSearchFilter.status}`
console.log("......................",query)
  this.ApiService.httpgetMaster(query, "/Proposal/getProposalDatabyFilter").subscribe(
   {
    next:(response:any)=>{
      this.proposalDataByFilter=response.data;

      console.log("Propsal Data is OnSearchProposalOnSearchProposal....",this.proposalDataByFilter)
      this.proposalData=this.proposalDataByFilter
    },
    error:(error:Error)=>{
      console.log("Something Wrong ",error)
    }
   }
  );
}



ClearFilterProposalData(){
this.getProposalData()
}

applyFilter(event: any) {
  const searchText = event.toLowerCase();
  this.proposalData = this.proposalData.filter((item: { proposalCode: string; }) => item.proposalCode.toLowerCase().includes(searchText));
}
}
