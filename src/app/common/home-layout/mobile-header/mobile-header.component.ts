import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationComponent } from 'src/app/view/notification/notification.component';
declare function myCustomFunction(): void;
@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit,OnChanges {
  @ViewChild('appNotification') appNotification!: NotificationComponent;
  @Input('menus') menus:any
  @Input('collectins') collectins:any;
  @Input('segments') segments:any;
  @Input('areas') areas:any;
  searchInput = "";
private _firstName:string=''
menusList:any=[];
collectinsList:any=[];
areasList:any=[];
segmentsList:any=[];
  constructor(
 
    public notificationService: NotificationService,
    private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.menusList =  this.menus;
        this.collectinsList =  this.collectins;
        this.areasList =  this.areas;
        this.segmentsList =  this.segments;
        console.log("menusList"+this.menusList)
    }

    goToApplicationArea(){
      document.body.classList.remove('mobile-toggle-sidebar');
      this.router.navigateByUrl("/appAreaneedToProtect")
    }
    goToSegment(){
      document.body.classList.remove('mobile-toggle-sidebar');
      this.router.navigateByUrl("/exp-type/i-need-to-protect-my-premises")
    }
    public getChildren(event: any) {
      const currentUrl = this.location.path();
      if(currentUrl.includes('/products')){
       setTimeout(() => {
  
         window.location.reload();
       }, 500);
      }
      document.body.classList.remove('mobile-toggle-sidebar');
      localStorage.removeItem('filterProduct');
      this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId}});
  
  
    }
    CloseMenu(){
      try{ document.body.classList.remove('mobile-toggle-sidebar');}catch(e){}
    }

  ngOnInit() {
    // Call the function from the external JavaScript file
    myCustomFunction();
  }
  public getSegment(event: any) {
    const currentUrl = this.location.path();
    // if(currentUrl.includes('/products')){
    //  setTimeout(() => {

    //    window.location.reload();
    //  }, 500);
    // }
  //  localStorage.removeItem('filterProduct');
    this.router.navigate([event.url], { });
    setTimeout(() => {

         window.location.reload();
       }, 500);

  }


  get nameFirstCharector(){
    let rec:any =  ApiService.getProfile();
    let _firstName =""
    if(rec){
      _firstName  =  rec.firstName +' '+rec.lastName;
    }else{
      _firstName  =  '';
    }
    if (!_firstName) return 'I';
    const nameParts = _firstName.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }
  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }

  get firstName(){

    let rec:any =  ApiService.getProfile();
    if(rec){
      this._firstName  =  rec.firstName +' '+rec.lastName;
    }else{
      this._firstName  =  '';
    }
    return this._firstName;
  }

  onClickToggle(){
    if (!document.body.classList.contains('mobile-toggle-sidebar')) {
      document.body.classList.add('mobile-toggle-sidebar');
    }else{

      document.body.classList.remove('mobile-toggle-sidebar');
    }
   
  }
  get notificationtotal(){
    return this.notificationService.totalNotification();
    //return this.CommonService.getCart();
  }
  get cart(){
    return this.CartService.cartTotalItems();
    //return this.CommonService.getCart();
  }
  isLoggedIn(){
    return this.ApiService.getUserId();
  }
  searchProduct() {

    if (this.searchInput && this.searchInput.length > 2) {
      let Q ='&searchContent='+this.searchInput
      this.ApiService.httpgetMaster(Q, "/Product/GetProductsCollectionId").subscribe(
        (res: any) => {

         if (res != null) {
          if (res.data == 0) { res.data = 1; }
          if(res.message=='Collection'){
            this.router.navigate(['./products',res.collectionName.replaceAll(" ", "-")], { queryParams: { catId: res.data } });
          }else{
            this.router.navigate(['./products',res.collectionName.replaceAll(" ", "-")], { queryParams: { catId: res.data, searchContent: this.searchInput } });
          }
          document.body.classList.remove('mobile-toggle-sidebar');
          setTimeout(() => {

            window.location.reload();
          }, 500);

        }
        },
        (err) => {
        }
      );
    }
  }
  logIn(type:string){
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'md', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        document.body.classList.remove('mobile-toggle-sidebar');
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3'];
  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.appNotification.getNotification(); // Call your function here
    }
  }
  logout(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    document.body.classList.remove('mobile-toggle-sidebar');
    this.router.navigate(['/']);
    setTimeout(() => {
      //this.router.navigate(['.'], { queryParams: { reload: true } });

      window.location.reload()
    }, 100);

  }
}
