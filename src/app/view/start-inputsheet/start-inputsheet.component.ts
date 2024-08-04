import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';

@Component({
  selector: 'app-start-inputsheet',
  templateUrl: './start-inputsheet.component.html',
  styleUrls: ['./start-inputsheet.component.scss']
})
export class StartInputsheetComponent {
  objInputsheetList: any = [];
  objInputsheetLists: any = [];
  InputsheetId: Number = 0;
  objInputDetail:any;
  flag:string="Insert";
  constructor(private _router: Router,private modalService: NgbModal, private sanitizer: DomSanitizer, private ApiService: ApiService, public route: ActivatedRoute, private CommonService: CommonService) {
    this.route.params.subscribe(params => {
      this.InputsheetId  = Number(params['id']);
      if(params['flag']!=undefined)
      {
        this.flag  = params['flag'];
      }

    });
  }

  ngOnInit(): void {
    this.objInputDetail = '';
    this.objInputsheetList = [];
    this.objInputsheetLists = [];

    if ( Number(this.InputsheetId) > 0) {
      this.GetInputsheet();
    }
  }

  GetInputsheet() {
    this.ApiService.httpgetMaster("", "/InputSheetMaster/getAllInputSheet").subscribe(
      (response: any) => {
  

        this.objInputsheetList = response.data;

        console.log("PPPPPPPPPPPPPPPPP",this.objInputsheetList)
        this.objInputsheetLists = this.objInputsheetList.filter(((x: { id: Number; })=>x.id== this.InputsheetId));


        console.log("PPPPP",this.objInputsheetLists )
      },
      (err) => {
      }
    );
  }

  public OpenInputsheet() {
    if (this.isLoggedIn()) {
      this.OpenInput(this.InputsheetId);
    }
    else {
      this.logIn('Log in')
    }
  }

  isLoggedIn() {
    return this.ApiService.getUserId();
  }

  logIn(type: string) {
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
    // Subscribe to modal close event if needed
    modalRef.result.then(
      (result) => {
        if (this.isLoggedIn()) {
          this.OpenInput(this.InputsheetId);
        }
        console.log('Modal closed with:', result);
      },
      (reason) => {
        if (this.isLoggedIn()) {
          this.OpenInput(this.InputsheetId);
        }
        console.log('Modal dismissed with:', reason);
      }
    );
  }

  private OpenInput(id: any) {
    this._router.navigate(['/eproposal', { id: id,flag:this.flag }]);
  }

}
