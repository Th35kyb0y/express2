import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

import { QuicklinkcomponentComponent } from 'src/app/components/quicklinkcomponent/quicklinkcomponent.component';
@Component({
  selector: 'app-chat-assistance',
  templateUrl: './app-chat-assistance.component.html',
  styleUrls: ['./app-chat-assistance.component.scss']
})
export class AppChatAssistanceComponent {

  constructor(private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }

  openOffcanvas() {
    const options: NgbModalOptions = {
      centered: false,
      windowClass: 'xlModal-quicklink',
      animation:true,
      keyboard : false,
      backdrop: true, // 'static' to prevent closing on clicking outside the modal
    };

    const modalRef = this.modalService.open(QuicklinkcomponentComponent, options);

    // You can pass data to your offcanvas component if needed
    modalRef.componentInstance.someInput = 'your data';
  }

}
