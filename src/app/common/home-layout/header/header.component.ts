import { Location } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

import { EditProfileChangePwdComponent } from 'src/app/model-popups/user/edit-profile-change-pwd/edit-profile-change-pwd.component';
import { QuicklinkcomponentComponent } from 'src/app/components/quicklinkcomponent/quicklinkcomponent.component';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';
import { NotificationComponent } from 'src/app/view/notification/notification.component';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { Content, ContentType } from 'src/app/models/product/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  @ViewChild('appNotification') appNotification!: NotificationComponent;
  isMobile: boolean =  false;
  navigationStart: boolean = false;
  menus:any = [];
  collectins: any = [];
  areas: any = [];
  segments: any = [];
  isLogin: boolean = false;
  searchInput = "";
  routedata: any;
  isHomePage = false;
  private _firstName:string=''
  condition:boolean= false;
  isDE:boolean= false;
  searchProductList:any=[];
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
	private _productFirstImage: string = '';
  constructor(
 
    public notificationService: NotificationService,private ApiService: ApiService, private _location: Location, private router:Router,
    private CommonService:CommonService,
    private modalService: NgbModal,
    private location: Location,
    private CartService : CartService) { }
    changeStyle($event:any){
      this.condition = $event.type == 'mouseover' ? true : false;
    }

    width: number = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      
      this.width = event.target.innerWidth;
      this.isMobile = this.width < 992;
    }
  ngOnInit(): void {
   
    try{

      this.width = window.innerWidth;
      this.isMobile = this.width < 992;

    }catch(e){}
    this.getMenu();
    this.checkRouteChanges();
    var retrievedValue:any = localStorage.getItem('isDE');
    this.isDE=retrievedValue
  }
  public cartState: string = 'out';
  toggleMenu() {


   this.cartState = this.cartState === 'out' ? 'in' : 'out';
  }
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

  logIn(type:string){
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'md', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  logout(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      //this.router.navigate(['.'], { queryParams: { reload: true } });

      window.location.reload()
    }, 100);

  }
  goToCSHome(){
    if(localStorage.getItem('previousURL')!=undefined)
    {
      this.router.navigate([localStorage.getItem('previousURL')]);
      localStorage.removeItem('previousURL');
    }
    else
    {
      this.router.navigate(['/cs']);
    }

  }
  goToDEHome(){
    this.ApiService.setDE(true);
    this.router.navigate(['/design']);
  }
  get isShowCSHomeBtn(){
    return this.ApiService.getCSEmpCode();

  }
  editProfile(type:string){
    const modalRef = this.modalService.open(EditProfileChangePwdComponent, {
      size: 'md', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {

        console.log('Modal closed with:', result);
      },
      (reason) => {
        //this.setprofile();
        console.log('Modal dismissed with:', reason);
      }
    );
  }
  isLoggedIn(){
    return this.ApiService.getUserId();
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

  // get profile(){
  //   return JSON.parse(localStorage.getItem("profile") || "");
  // }

  get cart(){
    return this.CartService.cartTotalItems();
    //return this.CommonService.getCart();
  }

  checkRouteChanges(){
    this.router.events.forEach((event) => {

      if(event instanceof NavigationStart) {
        console.log(event);
        if(event.url == "/" || event.url == ""){
          this.isHomePage = true;
        }else{
          this.isHomePage = false;
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navigationStart = true;
      }
    });
  }

  backClicked() {
    
   
    if(window.history.length>2){
      this._location.back();
    }else{
      this.router.navigateByUrl("/")
    }
   
  }

  public getChildren(event: any) {
    const currentUrl = this.location.path();
    if(currentUrl.includes('/products')){
     setTimeout(() => {

       window.location.reload();
     }, 500);
    }
    localStorage.removeItem('filterProduct');
    this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId}});


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

  public goSearchNew(){
    

    if(this.searchInput.length>2){
      try{  var x = (document.getElementById("sayt")) as HTMLElement;
        x.style.display = "none";
      }catch(e){}
       
       

        this.ApiService.setSearchHeader(this.searchInput);
       this.searchProductList = [];
     this.router.navigate(['./search-product'], { queryParams: {  searchContent: this.searchInput } });
        setTimeout(() => {
          window.location.reload()
        }, 500);
    }
   
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

  onKey(event:any){
    let value= event.target.value;
    value =  value.trim('');
    if(value){
 
     if(value.length>2){
       let se = value;
       let userName = "";
     
       let Q ='&searchContent='+value
       this.ApiService.httpgetMaster(Q, "/Product/Gettop10ProductsBySearch").subscribe((res:any) => {
      
       if (res != null) {
         
         this.searchProductList = res.data;
         var x = (document.getElementById("sayt")) as HTMLElement;
         x.style.display = "block";
     
       }
       });
     
      
     }
 
    }
 
   }

  public getProductFirstImageContent(contents: Content[]): string {
		const images = contents.filter(function (content: Content) {
			return content.contentTypeId === ContentType.Image && content.isMain == true;
		});

		if (images.length > 0) {
			this._productFirstImage = images[0].link;
		}
		else {
			this._productFirstImage = this._noProductImage;
		}

		return this._productFirstImage;
	}
  public GoFireExtinguisherDetail(product: any) {
    try{  var x = (document.getElementById("sayt")) as HTMLElement;
      x.style.display = "none";
    }catch(e){}
    let nc = (product.name.replaceAll(" ", "-")) +"_"+product.code
    this.router.navigate(['/product-detail',nc], { queryParams: { prodId: product.id, catId: btoa('0') } });
   
  }

  getMenu() {
    this.ApiService.httpgetMaster("", "/MenuMaster/getAll").subscribe(
      (response: any) => {
        this.menus = response.data;

        this.getCategories();
        this.getArea();
        this.getSegments();
      },
      (err) => {
      }
    );
  }

  getCategories() {
    this.ApiService.httpgetMaster("", CSRestAPIPath.GetCollectionForMenu).subscribe(
      (response: any) => {
        this.collectins = response.data
      },
      (err) => {
      }
    );
  }

  getArea() {
    this.ApiService.httpgetMaster("", "/AreaMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.map((e:any) => ({ ...e, name: e.title }))
        this.areas = response.data;
      },
      (err) => {
      }
    );
  }

  getSegments() {

    this.ApiService.httpgetMaster("", "/SegmentMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.map((e:any) => ({ ...e, name: e.title }))
        this.segments = response.data;


      },
      (err) => {
      }
    );
  }


  // ngOnDestroy() {
  //   this.routedata.unsubscribe();
  // }

  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3'];
  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.appNotification.getNotification(); // Call your function here
    }
  }

  get notificationtotal(){
    return this.notificationService.totalNotification();
    //return this.CommonService.getCart();
  }



  navigateToAbout() {
    this.router.navigate(['Enquiry']);
  }
}
