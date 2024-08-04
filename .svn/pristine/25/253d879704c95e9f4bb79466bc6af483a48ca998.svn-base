import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-virtual-assistant',
  templateUrl: './virtual-assistant.component.html',
  styleUrls: ['./virtual-assistant.component.scss']
})
export class VirtualAssistantComponent {
  menus:any = [];
  categories: any = [];
  areas: any = [];
  segments: any = [];
  isLogin: boolean = false;
  searchInput = "";
  routedata: any;
  isHomePage = false;
  private _firstName:string='';
  PostObj= {
    Audio_Video_Call:'Audio',
    Select_Date:'',
    SelectTime:'',
    VirtualName:'',
    VirtualEmail:'',
    VirtualContactNo:''
  }
  condition:boolean= false;
  constructor(private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }
    changeStyle($event:any){
      this.condition = $event.type == 'mouseover' ? true : false;
    }
    onSubmit(form: NgForm) {
      if (form.valid) {
        debugger
        this.ApiService.httpost(this.PostObj, "/UserMaster/AddVirtualAssistant").subscribe(
          (response: any) => {
            debugger
            alert("Submited successfully")
            this.router.navigate(['/'])
          },
          (err) => {
          }
        );
        console.log('Form Submitted!', form.value);
      } else {
        console.log('Form is invalid!');
      }
    }
    keyPress(event: any) {


      if (event.charCode !== 0) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
  
        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
      }
  
    }
}
