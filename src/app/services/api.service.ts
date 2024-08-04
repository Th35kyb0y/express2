import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { restapiURL } from './restapi-url';
import { Location } from '@angular/common';
import { ToastService } from './toast.service';
import { CartService } from './CartService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public SearchHeader: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headerObj: any;
  private profile = ApiService.getProfile();
  public contentTypes = {
    VideoLinks: 1,
    Brochure: 2,
    DataSheet: 3,
    Presentation: 4,
    Image: 5,
  }

  constructor(
    public _router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    private location: Location,
    private ToastService:ToastService,
   
  ) {


  }

  setSearchHeader(param: any) {
  
    this.SearchHeader.next(param);
  }
  
  getSearchHeader() {
  
    return this.SearchHeader.asObservable();
  }
  
 AddToProposalCart(proposalCode:string){


    let query = '&userId='+(this.getUserId())+'&proposalCode='+proposalCode
    // this.headerObj = {
    //   headers: new Headers(this.callSessionHeaders()),
    // };

    //  this.http.get(this.getbaseURLEXP() + "/ProductCart/AddItemByProposal" + "?" + restapiURL.token + query, this.headerObj)
    //   .pipe(retry(3)).pipe(shareReplay(1)).subscribe((res=>{
    //     debugger
    //   }));

    

    this.httpget(query,'/ProductCart/AddItemByProposal').subscribe((res:any)=>{
      //this.cartService.getUserCartsByAPI(localStorage.getItem("userid"),'')
      this._router.navigate(['./products/MyCart'], { queryParams: { proposalCode: proposalCode } });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
 }

  async routeToOrder(item:any){
    
    const cartitem = localStorage.getItem('cfx_app_cart');
    var resItems=  cartitem ? JSON.parse(cartitem) : [];
    if(resItems.length>0){
      var res =  await this.ToastService.ConfirmAlert("To remove the existing products in the Cart press OK, else click on cancel to retain the existing Cart products.");
      if(res=="OK"){
        this.httpget('&userId='+(this.getUserId()),'/ProductCart/removeUserCartItems').subscribe((res:any)=>{
          //this.cartService.emptyCart();
          localStorage.removeItem('cfx_app_cart');
          this.AddToProposalCart(item.proposalCode)
        })

      }
      else if(res=="Cancel"){
        this.AddToProposalCart(item.proposalCode)
      }
    }else{
      this.AddToProposalCart(item.proposalCode)
    }
   
  }

  getUrl(){
    const isLocalhost = window.location.hostname.includes('localhost');
    let apiUrl = isLocalhost ? restapiURL.localbaseURLCCRM  : restapiURL.baseURLCCRM ;
    return apiUrl
  }
  getbaseURLEXP(){
    const isLocalhost = window.location.hostname.includes('localhost');
    let apiUrl = isLocalhost ? restapiURL.localbaseURLEXP  : restapiURL.baseURLEXP ;
    return apiUrl
  }
 get isCS(){
  const currentUrl = this.location.path();
  return currentUrl.includes('/cs');
 // return this.getCS();
 }

 get AdminName(){
  let getProfile:any = this.getCSProfile();
  if(getProfile){
return getProfile.firstName+" "+getProfile.lastName
  }
  return ""
 // return this.getCS();
 }

 get IsAdMin(){
  let department = this.getDepartment();
  let isAdMin:boolean = false;
  if(department=='Admin'){
    isAdMin = true;
  }
  return isAdMin;
 }
 get isPaymentLink(){
  const currentUrl = this.location.path();
  return currentUrl.includes('/Payment-link') || currentUrl.includes('/Reset-Password') ||  currentUrl.includes('/payment-init') ||  currentUrl.includes('/user/pay') ||  currentUrl.includes('/user/payment-failure') ||  currentUrl.includes('payment-response') ||  currentUrl.includes('payment-failure');
 // return this.getCS();
 }

 get isOrderPage(){
  const currentUrl = this.location.path();
  return currentUrl.includes('/products') ;
 // return this.getCS();
 }


 setDepartment(value:string) {
  window.localStorage.setItem("Department", JSON.stringify(value));
}
getDepartment() {
  var retrievedValue:any = localStorage.getItem('Department');
  if (retrievedValue !== null) {
    retrievedValue = JSON.parse(retrievedValue);
    return retrievedValue;
  }
  return "";

}
  getUserId() {
    return localStorage.getItem("userid");
  }

  savetoken(token:any) {
    window.localStorage.setItem("token", token);
  }
  setCS(value:boolean) {
    window.localStorage.setItem("isCS", JSON.stringify(value));
  }
  getCS() {
    var retrievedValue:any = localStorage.getItem('isCS');
    if (retrievedValue !== null) {
      retrievedValue = JSON.parse(retrievedValue);
      return retrievedValue;
    } else {
    return false;
    }
  }

  RemoveCS() {
    localStorage.removeItem('isCS');
  }

  setCSEmpCode(value:boolean) {
    window.localStorage.setItem("CSEmpCode", JSON.stringify(value));
  }
  getCSEmpCode() {
    var retrievedValue:any = localStorage.getItem('CSEmpCode');
    if (retrievedValue !== null) {
      retrievedValue = JSON.parse(retrievedValue);
      return retrievedValue;
    } else {
    return null;
    }
  }

  saveCSProfile(profile:any) {
    window.localStorage.setItem("CSProfile", JSON.stringify(profile));
  }

   getCSProfile() {
    let profle = window.localStorage.getItem("CSProfile");
    if (profle) {
      profle = JSON.parse(profle);
      return profle;
    }
    return null;
  }

  RemoveCSUserId() {
    localStorage.removeItem('isCS');
  }

  saveProfile(profile:any) {
    window.localStorage.setItem("token", JSON.stringify(profile));
  }
  getQueryStringValue (key:any) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
   isUserLogin() {
    let profle = window.localStorage.getItem("profile");
    if (profle) {
      profle = JSON.parse(profle);
      return profle;
    }
    return null;
  }
  static getProfile() {
    let profle = window.localStorage.getItem("profile");
    if (profle) {
      profle = JSON.parse(profle);
      return profle;
    }
    return null;
  }


  gotoURL(url: string) {
    this._router.navigate([url]);
  }
  gotoURLWithQuery(url: string, queryParams: object) {
    this._router.navigate([url], { queryParams: { ...queryParams } });
  }

  getCurrentUrl() {
    return this._router.url;
  }

  callSessionHeaders() {

    return {
      'Content-Type': 'application/json',
    }
  }

  static toSnakeCase(name:any) {
    return name && name.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((s:any) => s.toLowerCase())
      .join('-');
  }

  httpgetCCRM(query: any, scriptName: any) {
    console.log('Get Api Called');
    this.headerObj = {
      headers: new Headers(this.callSessionHeaders()),
    };

    return this.http.get(this.getUrl() + scriptName + "?" + restapiURL.token + query, this.headerObj)
      .pipe(retry(3));
  };

  httpgetMaster(query: any, scriptName: any, storageName: string = "") {

    // if (!storageName) {
    //   storageName = scriptName;
    // }

    // const _storageData = window.sessionStorage.getItem(storageName);
    // if (_storageData) {
    //   const _storageDataObs = Observable.create((observer: Observer<any>) => {
    //     observer.next(JSON.parse((_storageData)));
    //     observer.complete();
    //   })
    //   return _storageDataObs;
    // }

    console.log('Get Api Called');
    this.headerObj = {
      headers: new Headers(this.callSessionHeaders()),
    };

    const _observable = this.http.get(this.getbaseURLEXP() + scriptName + "?" + restapiURL.token + query, this.headerObj)
      .pipe(retry(3)).pipe(shareReplay(1));

    _observable.subscribe((response) => {
      try {
        //window.sessionStorage.setItem(storageName, (JSON.stringify(response)));
      } catch (err) {
        console.warn(err);
      }
    })

    return _observable;
  };

  httpget(query: any, scriptName: any) {
    console.log('Get Api Called');
    this.headerObj = {
      headers: new Headers(this.callSessionHeaders()),
    };

    return this.http.get(this.getbaseURLEXP() + scriptName + "?" + restapiURL.token + query, this.headerObj)
      .pipe(retry(3)).pipe(shareReplay(1));
  };

  httpost(body: any, scriptName: any) {

    this.headerObj = {
      headers: new Headers(this.callSessionHeaders()),
    };

    return this.http.post(this.getbaseURLEXP() + scriptName + "?" + restapiURL.token, body, this.headerObj).pipe(retry(3));
  };

  httpostForm(body: any, scriptName: any, query: any) {

    let headerObj = {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post(this.getUrl() + scriptName + "?" + restapiURL.token + query, body).
      pipe(retry(3)).pipe(shareReplay(1));
  }




  // getProduct(): Observable<any>{
  //   return this.http.get<any>(this.ApiProduct)
  // }

  httpostForm1( scriptName: any, formData: FormData) {
    const httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Adjust content type as needed
      }),
    }


    return this.http.post(this.getbaseURLEXP()  + scriptName + "?" + restapiURL.token, formData)
  }
  downloadFile(query: any,scriptName: any) {
    return this.http.get(this.getbaseURLEXP()  + scriptName + "?" + restapiURL.token + query, {
      responseType: 'blob' as 'json'
    });
  }

  setDE(value:boolean) {
    window.localStorage.setItem("isDE", JSON.stringify(value));
  }
  getDE() {
    var retrievedValue:any = localStorage.getItem('isDE');
    if (retrievedValue !== null) {
      retrievedValue = JSON.parse(retrievedValue);
      return retrievedValue;
    } else {
    return false;
    }
  }


  RemoveDE() {
    localStorage.removeItem('isDE');
  }

  setDEEmpCode(value:boolean) {
    window.localStorage.setItem("DEEmpCode", JSON.stringify(value));
  }
  getDEEmpCode() {
    var retrievedValue:any = localStorage.getItem('DEEmpCode');
    if (retrievedValue !== null) {
      retrievedValue = JSON.parse(retrievedValue);
      return retrievedValue;
    } else {
    return null;
    }
  }
  saveDEProfile(profile:any) {
    window.localStorage.setItem("DEProfile", JSON.stringify(profile));
  }

   getDEProfile() {
    let profle = window.localStorage.getItem("DEProfile");
    if (profle) {
      profle = JSON.parse(profle);
      return profle;
    }
    return null;
  }

  RemoveDEUserId() {
    localStorage.removeItem('isDE');
  }

  get isDE(){
    const currentUrl = this.location.path();
    this.getDE();
    return currentUrl.includes('/design');
   // return this.getCS();
   }
   goBack(){
    this.location.back();
   }
   goCSDashBoard(){
    debugger
    this._router.navigateByUrl('/cs')
   }


   fetchCities(): Observable<any> {
    const url = "https://countriesnow.space/api/v0.1/countries/cities";
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ "country": "india" });

    return this.http.post(url, body, { headers });
  }

}
