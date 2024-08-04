import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';


@Component({
  selector: 'app-fire-audit-for-your-premises',
  templateUrl: './fire-audit-for-your-premises.component.html',
  styleUrls: ['./fire-audit-for-your-premises.component.scss']
})
export class FireAuditForYourPremisesComponent {
  objInputsheetList: any = [];
  category: any = null;
  areaPivot: any = null;
  expTypesList: any = [];
  expTypesObj: any = null;
  typeObj: any = null;
  urlType: any = "";
  flag:string="Insert";
  urlTypes: any = {
    "i-am-clear-what-i-need": {
      id: 1,
      select_txt1: "Product Category",
      select_txt2: "for"
    },
    "i-need-to-protect-a-risk": {
      id: 2,
      select_txt1: "Area",
      select_txt2: "to protect"
    },
    "i-need-to-protect-my-premises": {
      id: 3,
      select_txt1: "Premises",
      select_txt2: "to protect"
    },
  }
  productId: any;
  constructor(private _router: Router,
    private modalService: NgbModal,private sanitizer: DomSanitizer, private ApiService: ApiService, public route: ActivatedRoute, private CommonService: CommonService) {
      this.route.params.subscribe(params => {
        if(params['flag']!=undefined)
        {
          this.flag  = params['flag'];
        }
  
      });
  }

  ngOnInit(): void {
    this.objInputsheetList = [];
    this.GetInputsheet();
    this.getExpTypes();
  }

  GetInputsheet() {
    debugger;
    this.ApiService.httpgetMaster("", "/InputSheetMaster/getAll").subscribe(
      (response: any) => {
        this.objInputsheetList = response.data;
      },
      (err) => {
      }
    );
  }

  getCategories() {
    const typeId = this.urlTypes[this.urlType];
    this.ApiService.httpgetMaster("", "/Categories/getAll").subscribe(
      (response: any) => {
        this.category = response.data.filter((e: any) => e.parentId == 0);
      },
      (err) => {
      }
    );
  }
  getExpTypes() {
    this.ApiService.httpgetMaster("", "/ExpTypes/getAll").subscribe(
      (response: any) => {
        this.expTypesList = response.data.map((e: any) => ({ ...e }));
        this.typeObj = this.urlTypes[this.urlType];
        this.expTypesObj = this.expTypesList.filter((e: any) => e.typeId == this.typeObj.id);
        console.log(this.typeObj);
        if (this.typeObj.id == 1) {
          this.getCategories();
        }

        if (!this.expTypesObj) {
          this.ApiService.gotoURL('/');
        }
      },
      (err) => {
      }
    );
  }


  public goBillingAddress(e:any) {
    this._router.navigate(['/StartInput', { id: e , flag: this.flag}]);

    
  //   console.log(e);
  //  this.productId=e;
  //   if(this.isLoggedIn()){
  //     this.getOrderByCartId(this.productId);
  //   }
  //   else{
  //     this.logIn('Log in')
  //   }
    
   
  }

  isLoggedIn(){
    return this.ApiService.getUserId();
  }
  logIn(type:string){
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        if(this.isLoggedIn()){
          this.getOrderByCartId(this.productId);
        }
        console.log('Modal closed with:', result);
      },
      (reason) => {
        if(this.isLoggedIn()){
          this.getOrderByCartId(this.productId);
        }
        console.log('Modal dismissed with:', reason);
      }
    );
  }

  private getOrderByCartId(id:any) {
   
    this._router.navigate(['/eproposal', { id: id }]);
  }
}
