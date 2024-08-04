import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignToDesigner } from 'src/app/models/proposal/cqrs';
import { ApiService } from 'src/app/services/api.service';
import { CqrsInputsheetComponent } from '../inputsheet/cqrs-inputsheet/cqrs-inputsheet.component';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { NotificationEntity } from 'src/app/models/proposal/proposal';

@Component({
  selector: 'app-express-proposal',
  templateUrl: './express-proposal.component.html',
  styleUrls: ['./express-proposal.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ExpressProposalComponent implements OnInit, AfterViewInit {
  private modalService = inject(NgbModal);
  TaskCompleteDate: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  productId: number = 0;
  proposalCode: string = "";
  id: number = 0;
  dataRetrieved: boolean = false;
  isCS: boolean = false
  inputsheetData: any;
  showgrid: boolean = false;
  proposalType: any;
  designerCode: string = "";
  taskCompletionDate: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  designEmployeeList: any;
  remarks: string = "";
  objAssignToDesign: AssignToDesigner;
  flag: string = 'Insert';
  notification: NotificationEntity;
  customerCode: string = '';
  isDE: boolean = false
  mail: any
  mailerData: any[] = []
  @ViewChild('childComponent', { static: true }) childComponent!: CqrsInputsheetComponent;


  ngAfterViewInit() {

  }

  constructor(public notificationService: NotificationService, public ApiService: ApiService, private route: ActivatedRoute, private datepipe: DatePipe, private _router: Router) {
    this.objAssignToDesign = new AssignToDesigner();
    this.notification = new NotificationEntity();
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']);
      this.proposalCode = params['proposalCode'];
      this.proposalType = params['proposalType'];
      this.mail = params['email']
      if (params['flag'] != undefined) {
        this.flag = params['flag'];
      }
      if (params['customerCode'] != undefined) {
        this.customerCode = params['customerCode'];
      }


      console.log(this.productId)
      if (params['id'] == undefined) {
        this.getInputsheetData();
        this.showgrid = true;
      }
      else {
        this.getProposalCode();
      }

    });

  }

  userProfileName: string = ''
  ngOnInit(): void {
    this.isCS = this.ApiService.getCS();
    this.isDE = this.ApiService.getDE()
    if (this.isDE == false) {
      // this.fetchMailersForCsNCust('Customer submit to CS')

    }
    else if (this.isDE) {
      this.fetchMailersForCsNDesignNcust('design completed proposal')
    }
    this.UserDataByProposalCode(this.proposalCode)
  }

  fetchMailersForCsNDesignNcust(stage: string) {
    this.ApiService.httpgetMaster("&stage=" + stage, "/Proposal/fetchMailersForCsNCust").subscribe(
      (response: any) => {
        this.mailerData = response.data
      })
  }
  getProposalCode() {
    var designCode = this.ApiService.getDEEmpCode() == null ? this.ApiService.getUserId() : this.ApiService.getDEEmpCode()
    this.ApiService.httpgetMaster("&flag=" + this.flag + "&ProductId=" + Number(this.productId) + "&CustomerId=" + this.ApiService.getUserId() + "&DesignEmpCode=" + designCode + "", "/Proposal/saveInputSheet").subscribe(
      (response: any) => {
        console.log(response.data);
        var data = response.data[0]
        this.proposalCode = data.proposalCode;
        this.id = data.id;
        this.dataRetrieved = true;
      },
      (err) => {
      }
    );
  }

  getInputsheetData() {
    this.ApiService.httpgetMaster("&ProspectCode=" + this.proposalCode + "", "/Proposal/getInputSheetData").subscribe(
      (response: any) => {
        console.log(response.data);
        this.inputsheetData = response.data;
      },
      (err) => {
      }
    );
  }

  openInputsheet(item: any) {
    this.productId = item.productId;
    this.id = item.iid;
    this.dataRetrieved = true;
    this.showgrid = false;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  viewInputsheet(content: TemplateRef<any>, item: any) {
    if (this.childComponent) {

    }
    this.getDesignEmployeesList();
    this.productId = item.productId;
    this.id = item.iid;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }



  ProposalSendForDesignTeamApproval() {
    console.log(this.TaskCompleteDate);
    let isCS = 'false'
          if (this.isCS) {
            isCS = 'true'
          }
    this.ApiService.httpgetMaster("&ProspectCode=" + this.proposalCode + "&ProposalRequiredDate=" + this.TaskCompleteDate + "&ProposalType=" + this.proposalType + "&isCS=" + isCS, "/Proposal/proposalSendForDesignTeamApproval").subscribe(
      (response: any) => {
        console.log(response.data);
        this.modalService.dismissAll();
        this._router.navigate(['user/proposal']);
      },
      (err) => {
      }
    );

  }

  AssignToDesigner() {
    this.objAssignToDesign.inputSheetId = this.id;
    this.objAssignToDesign.productGroupCode = this.proposalCode;
    this.objAssignToDesign.approvedBy = this.ApiService.getDEEmpCode();
    this.objAssignToDesign.designTeamId = this.designerCode;
    this.objAssignToDesign.productId = this.productId;
    this.objAssignToDesign.remarks = this.remarks;
    this.objAssignToDesign.statusId = 4;
    this.objAssignToDesign.taskCompleteDate = this.taskCompletionDate;

    this.ApiService.httpost(this.objAssignToDesign, '/Proposal/assignToDesigner')
      .subscribe((res: any) => {
        this.modalService.dismissAll();
        this.getInputsheetData();

      }, (error => {

      }))
  }

  getDesignEmployeesList() {
    this.ApiService.httpgetMaster("", "/Proposal/getDesignEmployeesList").subscribe(
      (response: any) => {
        console.log(response.data);
        this.designEmployeeList = response.data;
      },
      (err) => {
      }
    );
  }

  gotoBOQ(item: any) {
    console.log(item)
    this._router.navigate(['design/addBOQ', { proposalCode: item.prospectCode, productId: item.productId, IID: item.iid }]);
  }

  submitToSales() {
    debugger
    this.ApiService.httpgetMaster("&Flag=CompletedProposal&ProspectCode=" + this.proposalCode + "&CreatedBy=" + this.ApiService.getDEEmpCode() + "&PID=0&IID=0" + "", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        this.mailerData[0].email = this.mail
        // Send Mail To Customer Support 'lokesh@ceasefire.in'
        // this.mailerData[1].email = 'ajay.yadav@ceasefire.in'
        this.mailerData[1].email = 'lokesh@ceasefire.in'
        let result = this.mailerData[0]?.html?.replace(/#Customer/g, this.userProfileName);
        let nameInSubject = this.mailerData[0]?.mailSubject?.replace(/#2ProposalCode/g, this.mailProposalCode);
        let nameInSubject1 = this.mailerData[1]?.mailSubject?.replace(/#2ProposalCode/g, this.mailProposalCode);
        this.mailerData[1].mailSubject = nameInSubject1
        this.mailerData[0].mailSubject = nameInSubject
        this.mailerData[0].html = result
        // this.mailerData[2].email='ajay.yadav@ceasefire.in'
        let data = {
          mailEntity: this.mailerData,
          proposalCode: this.mailProposalCode
        }
        let Mailinfo = data

        //Genereate PDF
        this.generatePDF(Mailinfo)
        this.notification.caseId = this.proposalCode;
        this.notification.createdOn = new Date();
        this.notification.notificationBy = "Design";
        this.notification.notificationContent = "Proposal Received from Design Team - " + this.proposalCode;
        this.notification.notificationFor = this.customerCode;
        this.notification.readReceipt = true;

        this.notificationService.saveNotification(this.notification).subscribe(
          (res: any) => {
            // Handle successful response
          },
          (error) => {
            // Handle error
          }
        );

      },
      (err) => {
      }
    );
  }

  deleteInputSheet(item: any) {
    this.ApiService.httpgetMaster("&Flag=Update&ProductId=" + item.productId + "&UserId=" + this.ApiService.getUserId()!.toString() + "&InputSheetId=" + item.iid + "", "/Proposal/deleteInputsheet").subscribe(
      (response: any) => {
        console.log(response.data);
        alert(response.data[0].messageBox)
        this.getInputsheetData()
      },
      (err) => {
      }
    );
  }


  mailProposalCode: string = ''
  cutomerData: any[] = []
  UserDataByProposalCode(item: any) {
    debugger
    const query = `&proposalCode=${item}`
    this.ApiService.httpgetMaster(query, "/Proposal/UserDataByProposalCode").subscribe({
      next: (res: any) => {
        const userData = res.data[0] || {}
        this.cutomerData = res.data[0] || {}
        this.userProfileName = `${userData?.firstName} ${userData?.lastName}`
        this.mailProposalCode = userData?.proposalCode
        this.scenario = userData?.productType
        this.ProductSummaryList();
      },
      error: (error: Error) => {
        alert('Something Is Wrong')
      }
    })

  }

  sendMailByDesigner(data: any) {
    this.ApiService.httpost(data, '/Email/sendProposalMails').subscribe((i: any) => {
      alert('Success')
      this._router.navigate(['design']);
    })
  }


  kssAll: any[] = []
  cqrsAll: any[] = []
  gssALL: any[] = []
  fireALL: any[] = []
  scenario: any = ''
  contacts: any[] = []
  generatePDF(MailInfo: any) {
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
      {
        sectionName: "CQRS", data: this.cqrsAll, isHaskss: this.kssAll.length > 0, isHasgss: this.gssALL.length > 0, prospectCode: this.proposalCode,
        fullname: fullname
      },


      {
        sectionName: "KSS", data: this.kssAll, isHaskss: this.kssAll.length > 0, isHasgss: this.gssALL.length > 0, prospectCode: this.proposalCode,
        fullname: this.kssAll.length > 0 ? this.kssAll[0].fullname : ''
      },

      {
        sectionName: "STANDALONE", data: this.fireALL, prospectCode: this.proposalCode, isHaskss: this.kssAll.length > 0, isHasgss: this.gssALL.length > 0,

        fullname: this.fireALL.length > 0 ? this.fireALL[0].fullname : ''
      },

      {
        sectionName: "GSS", data: this.gssALL, prospectCode: this.proposalCode, isHaskss: this.kssAll.length > 0, isHasgss: this.gssALL.length > 0,
        fullname: this.gssALL.length > 0 ? this.gssALL[0].fullname : ''
      },


    ];

    debugger
    let path = ""
    if (this.scenario == 'Standalone') {
      path = '/PDF/generatePdfFE'
    }
    else {
      path = '/PDF/generatePdf'
    }
    this.ApiService.httpost(JSON.stringify(data), path).subscribe({
      next:(res:any)=>{
          this.sendMailByDesigner(MailInfo)

      },
      error:(error:Error)=>{
        console.log("Someting Wrong")
        alert('Something Is Wrong')

      }
      })
  }



  finalProducts: any
  ciALL: any[] = []
  objProposalSummaryEntityList: any
  currentProduct: any
  baseValueFinal: number = 0
  deliveryCharge: number = 0
  designCharge: number = 0
  insCharge: number = 0
  gstCharge: number = 0
  netValueBeforeGST: number = 0
  netValueAfterGST: number = 0
  ProductSummaryList() {
    var query2 = '&ProposalCode=' + this.mailProposalCode + "&flag=products";
    this.ApiService.httpget(query2, "/Proposal/getProposalProduct").subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.objProposalSummaryEntityList = JSON.parse(data.data);
          var query2 = '&ProposalCode=' + this.mailProposalCode + "&flag=final";
          this.ApiService.httpget(query2, "/Proposal/getProposalProduct").subscribe(
            (data: any) => {
              if (data.statusCode === 200) {
                let d = JSON.parse(data.data)
                this.baseValueFinal = d[0].totalFinalProducttt
                this.deliveryCharge = d[0].deliveryCharge
                this.designCharge = d[0].designCharge
                this.insCharge = d[0].insCharge
                this.netValueBeforeGST = d[0].netValueBeforeGST
                this.gstCharge = d[0].gstCharge
                this.netValueAfterGST = d[0].netValueAfterGST
              }
            })
          let cqrsArr: (number | string)[] = [];
          let kssArr: (number | string)[] = [];
          let gssArr: (number | string)[] = [];
          let atomArr: (number | string)[] = [];
          let fireArr: (number | string)[] = [];
          let ciArr: (number | string)[] = [];
          if (this.objProposalSummaryEntityList) {
            cqrsArr = this.objProposalSummaryEntityList.filter((i: any) => i.ProductId === 2);
            kssArr = this.objProposalSummaryEntityList.filter((i: any) => i.ProductId === 3);
            gssArr = this.objProposalSummaryEntityList.filter((i: any) => i.ProductId === 4)
            atomArr = this.objProposalSummaryEntityList.filter((i: any) => i.category === 'Atom-X');
            fireArr = this.objProposalSummaryEntityList.filter((i: any) => i.ProductId === 11);
            ciArr = this.objProposalSummaryEntityList.filter((i: any) => i.ProductId === 13);
          }
          this.finalProducts = this.objProposalSummaryEntityList.filter(
            (thing: any, i: any, arr: any) => arr.findIndex((t: any) => t.ProductCode === thing.ProductCode) === i
          );
          let pc: any[] = [];
          (pc as any) = this.objProposalSummaryEntityList.map((i: any) => i.ProductCode);
          // Create an object to store the counts
          // let productCodeCounts = {};
          let productCodeCounts: { [key: string]: number } = {};
          // Count occurrences of each product code
          for (let code of pc) {
            (productCodeCounts[code] as any) = (productCodeCounts[code] || 0) + 1;
          }
          this.finalProducts.map((product: any) => {
            if (productCodeCounts[product.ProductCode]) {

              if (product.QTY > 1) {
                let q1 = "&productCode=" + product.ProductCode + "&ProspectCode=" + this.mailProposalCode
              }
            }
            if (gssArr.length > 0) {
              let gssByIid = gssArr.reduce((acc: any, obj: any) => {
                const iid = obj.IID;
                if (!acc[iid]) {
                  acc[iid] = [];
                }
                acc[iid].push(obj);
                return acc;
              }, {});
              const myArray2kss: any[] = Object.values(gssByIid);
              this.gssALL = myArray2kss
              let kss1 = gssByIid[gssArr[0]]
            }
            if (ciArr.length > 0) {
              let ciByIid = ciArr.reduce((acc: any, obj: any) => {
                const iid = obj.IID;
                if (!acc[iid]) {
                  acc[iid] = [];
                }
                acc[iid].push(obj);
                return acc;
              }, {});
              const myArray2kss: any[] = Object.values(ciByIid);
              this.ciALL = myArray2kss
              let kss1 = ciByIid[ciArr[0]]
            }
            if (cqrsArr.length > 0) {
              let cqrsByIid = cqrsArr.reduce((acc: any, obj: any) => {
                const iid = obj.IID;
                if (!acc[iid]) {
                  acc[iid] = [];
                }
                acc[iid].push(obj);
                return acc;
              }, {});
              const myArray2cqrs: any[] = Object.values(cqrsByIid);
              this.cqrsAll = myArray2cqrs
              let kss1 = cqrsByIid[cqrsArr[0]]
            }
            if (fireArr.length > 0) {

              let fireByIid = fireArr.reduce((acc: any, obj: any) => {
                const iid = obj.IID;
                if (!acc[iid]) {
                  acc[iid] = [];
                }
                acc[iid].push(obj);
                return acc;
              }, {});
              const myArray2fire: any[] = Object.values(fireByIid);
              this.fireALL = myArray2fire
              let kss1 = fireByIid[gssArr[0]]
            }

            if (kssArr.length > 0) {
              let kssByIid = kssArr.reduce((acc: any, obj: any) => {
                const iid = obj.IID;
                if (!acc[iid]) {
                  acc[iid] = [];
                }
                acc[iid].push(obj);
                return acc;
              }, {});
              const myArray2kss: any[] = Object.values(kssByIid);
              this.kssAll = myArray2kss
              let kss1 = kssByIid[kssArr[0]]
            }
          });
        }
      });

  }


}
