import { DatePipe } from '@angular/common';
import { Component, Input, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  providers: [DatePipe]
})
export class ConfirmPopupComponent {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  isCs: boolean = false
  mailerData: any[] = []
  @Input() name: string = "";
  @Input() proposalCode: string = "";
  @Input() proposalType: string = "";
  TaskCompleteDate: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private _router: Router, public ApiService: ApiService, private datepipe: DatePipe) {
    this.isCs = this.ApiService.getCS();
    if (this.isCs == false) {
      this.fetchMailersForCsNCust('Customer submit to CS')
      // this.fetchMailersForCsNCust('Input Submission Confirmation')

    }
    else if (this.isCs) {
      this.fetchMailersForCsNCust('cs submit to design')

    }
  }


  routeToProposal() {
    this._router.navigate(['user/proposal']);
  }
  routeTofireAudit() {
    this._router.navigate(['FireAuditForYourPremises', { flag: 'Update' }]);
  }

  fetchMailersForCsNCust(stage: string) {

    this.ApiService.httpgetMaster("&stage=" + stage, "/Proposal/fetchMailersForCsNCust").subscribe(
      (response: any) => {
        this.mailerData = response.data
        console.log(this.mailerData, "m data")
      })
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  ProposalSendForDesignTeamApproval(content: TemplateRef<any>) {
    debugger
    this.ApiService.httpgetMaster("&ProspectCode=" + this.proposalCode + "", "/Proposal/getInputSheetData").subscribe(
      (response: any) => {
        console.log();
        if (response.data.filter((p: { proposalStatus: string; }) => p.proposalStatus == 'Pending').length > 0) {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            (result) => {
              //this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
              //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            },
          );
        }
        else {
          let isCS = 'false'
          if (this.isCs) {
            isCS = 'true'
          }
          this.ApiService.httpgetMaster("&ProspectCode=" + this.proposalCode + "&ProposalRequiredDate=" + this.TaskCompleteDate + "&ProposalType=" + this.proposalType + "&isCS=" + isCS, "/Proposal/proposalSendForDesignTeamApproval").subscribe(
            (response: any) => {
              if (this.isCs == false) {
                const storedProfile:any = localStorage.getItem("profile");
                if (storedProfile !== null) {
                 this.UserDataByProposalCode1(this.proposalCode)
                }
              }
              else if (this.isCs) {
                this.UserDataByProposalCode(this.proposalCode)
              }
            },
            (err) => {
            }
          );
        }
      },
      (err) => {
      }
    );
  }

  routeToInputsheet() {
    this.modalService.dismissAll();
    this._router.navigate(['/eproposal', { proposalCode: this.proposalCode, proposalType: this.proposalType }]);

  }

  userProfileName:string=''
  cutomerData:any[]=[]

  //Mail Send to Design Team When Customer Support Submite
  UserDataByProposalCode(item: any) {
    debugger
    const query = `&proposalCode=${item}`
    this.ApiService.httpgetMaster(query, "/Proposal/UserDataByProposalCode").subscribe({
      next: (res: any) => {
        console.log("User Data by ProposalCode is ------", res.data[0])
        const userData=res.data[0] || {}
       this.cutomerData=res.data[0] || {}
        this.userProfileName=`${userData?.firstName} ${userData?.lastName}`
        const storedProfile:any = localStorage.getItem("profile");
        let result = this.mailerData[0]?.html?.replace(/##CustomerName/g, `${ JSON.parse(storedProfile)?.firstName} ${ JSON.parse(storedProfile)?.lastName}`);
        let result1 = result?.replace(/##PropoaslCode/g, `${ userData?.proposalCode} `);
        let result2 = result1?.replace(/##Products/g, `${ userData?.productNames}`);
        const formatedCreatedDate= this.datepipe.transform(new Date( userData?.createdOn), 'dd-MMM-yyyy hh:mm a')
        let result3 = result2 ?.replace(/##CreatedDate/g, `${formatedCreatedDate}`);
        let nameInSubject = this.mailerData[0]?.mailSubject?.replace(/###CustomerName/g, `${ this.userProfileName} `);
        this.mailerData[0].html = result3
        this.mailerData[0].mailSubject = nameInSubject
      //  this.mailerData[0].email = 'lokesh@ceasefire.in'
        this.mailerData[0].email = 'ajay.yadav@ceasefire.in'
        //this.mailerData[1].email = 'ajay.yadav@ceasefire.in'
        let str = "###CustomerName";
        let data = { mailEntity: this.mailerData }
        this.ApiService.httpost(data, '/Email/sendProposalMails').subscribe((i: any) => {
          this.modalService.dismissAll();
          this._router.navigate(['user/proposal']);
        })

      },
      error: (error: Error) => {
        console.log("Something Is Wrong")
      }
    })

  }

// Mail Send To Customer And Customer Support when Customer Submit the Proposal
UserDataByProposalCode1(item: any) {
  debugger
  const query = `&proposalCode=${item}`
  this.ApiService.httpgetMaster(query, "/Proposal/UserDataByProposalCode").subscribe({
    next: (res: any) => {
      const userData=res.data[0] || {}
     this.cutomerData=res.data[0] || {}
      this.userProfileName=`${userData?.firstName} ${userData?.lastName}`
      const storedProfile:any = localStorage.getItem("profile");
      let result = this.mailerData[0]?.html?.replace(/#Customer/g, `${ JSON.parse(storedProfile)?.firstName} ${ JSON.parse(storedProfile)?.lastName}`);
      this.mailerData[0].html = result
      let CustomerSubject = this.mailerData[0]?.mailSubject?.replace(/#1ProposalCode/g, `${ this.proposalCode}`);
      this.mailerData[0].mailSubject = CustomerSubject
      const custEmail = JSON.parse(storedProfile);
      this.mailerData[0].email = custEmail?.email
      let CSMailBody1 = this.mailerData[1]?.html?.replace(/###CustomerName/g, `${ JSON.parse(storedProfile)?.firstName} ${ JSON.parse(storedProfile)?.lastName}`);
      let CSMailBody = CSMailBody1?.replace(/##CustomerName/g, `${ JSON.parse(storedProfile)?.firstName} ${ JSON.parse(storedProfile)?.lastName}`);
      let result1 = CSMailBody?.replace(/##PropoaslCode/g, `${ userData?.proposalCode} `);
      let result2 = result1?.replace(/##Products/g, `${ userData?.productNames}`);
      const formatedCreatedDate= this.datepipe.transform(new Date( userData?.createdOn), 'dd-MMM-yyyy hh:mm a')
      let result3 = result2 ?.replace(/##CreatedDate/g, `${formatedCreatedDate}`);
      this.mailerData[1].html = result3
      // Send Mail To Customer Support
      // this.mailerData[1].email = 'lokesh@ceasefire.in'
       this.mailerData[1].email = 'ajay.yadav@ceasefire.in'
      let data = { mailEntity: this.mailerData }
      this.ApiService.httpost(data, '/Email/sendProposalMails').subscribe((i: any) => {
        this.modalService.dismissAll();
        this._router.navigate(['user/proposal']);
      })
    },
    error: (error: Error) => {
      console.log("Something Is Wrong")
    }
  })
}
}
