import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  menus:any = [];
  categories: any = [];
  areas: any = [];
  segments: any = [];
  isLogin: boolean = false;
  searchInput = "";
  routedata: any;
  isHomePage = false;
  private _firstName:string='';
  condition:boolean= false;
  constructor(private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }
    changeStyle($event:any){
      this.condition = $event.type == 'mouseover' ? true : false;
    }
}
