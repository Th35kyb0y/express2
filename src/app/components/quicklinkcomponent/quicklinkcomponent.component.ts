import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-quicklinkcomponent',
  templateUrl: './quicklinkcomponent.component.html',
  styleUrls: ['./quicklinkcomponent.component.scss'],
  providers:[Location]

})
export class QuicklinkcomponentComponent {
  @Input() images: any;
  QuickLinkList:any = [];
  constructor(private modalService: NgbModal,
    private location: Location,
    public activeModal: NgbActiveModal,private ApiService: ApiService,  private router:Router,) { }

  ngOnInit(): void {
    this.QuickLinkList = [];
    this.BindQuickLink();
  }
  closeModal(msg: any) {
    this.activeModal.dismiss(msg);
  }

  BindQuickLink() {
   
    let currentUrl = this.location.path();
    if(!currentUrl){
      currentUrl='/'
    }
    let Q = "&url="+currentUrl;
    //this.ApiService.httpgetMaster(Q, "/QuickLink/AllGetbyParentId").subscribe(
    this.ApiService.httpgetMaster(Q, "/QuickLink/GetQuickLinkByUrl").subscribe(
      (response: any) => {
       this.QuickLinkList = response.data;

      },
      (err) => {
      }
    );
  }

  public GoToLink(item: any) {
    this.router.navigateByUrl(item.linkURL);
   this.closeModal('Dismissed')
  }
}
