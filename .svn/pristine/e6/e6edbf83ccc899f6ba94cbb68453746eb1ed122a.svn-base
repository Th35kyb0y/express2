import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartOrderSummeryByProductComponent } from 'src/app/model-popups/cart-order-summery-by-product/cart-order-summery-by-product.component';
import { Content, ContentType, ProductDetails } from 'src/app/models/product/product';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-order-summar-by-cart',
  templateUrl: './order-summar-by-cart.component.html',
  styleUrls: ['./order-summar-by-cart.component.scss']
})
export class OrderSummarByCartComponent implements OnInit {
  proposalCode:string='';
  CouponCode:string=''
  _shipingAddress:any=[];
  _billingAddress:any=[];
  _productFirstImage:any=[];
  PayObject:any= {
    UserId:this.ApiService.getUserId(),
    PurchaseOrderNumber:'',
    Remark:'',
    BillingId:'',
    ShippingId:'',
    AddressInstructions:'',
    isSingleCardOrder:false,
    CartId:'',
    CreatedBy:'',
    CouponCode:'',
    CouponDiscountValue:'',
  }
  applyCoupon:any;
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  DeliveryCharges:any;
  private _OrderSummary:any;
constructor(
  private CommonService: CommonService,
   public cartService: CartService,
   private ApiService: ApiService,
   private modalService: NgbModal,
   private router :Router,
   private toast:ToastService,
   public route: ActivatedRoute,
   ){
    const sub = this.route.queryParams
    .subscribe(params => {
      this.proposalCode = params['proposalCode']
    })
}

resetCoupon(){
  this.PayObject.CouponCode='';
  this.PayObject.CouponDiscountValue = '';
  this.applyCoupon= undefined;
  this.getOrderSummary();
}
ApplyCouponCode(){
  
  this.PayObject.CouponCode='';
  this.PayObject.CouponDiscountValue = '';
  let q =  '&UserId='+this.ApiService.getUserId()+'&CouponCode='+encodeURIComponent(this.CouponCode)
  this.ApiService.httpget(q,'/Coupons/UserApplyCoupon')
  .subscribe((res:any)=>{
    
    this.applyCoupon= undefined
    if(res.isSuccess){
      this.applyCoupon =  res.data;
      this.PayObject.CouponCode =  this.CouponCode;
      
      if(this.applyCoupon.isInUsePercent){
        this.PayObject.CouponDiscountValue =   parseFloat(this._OrderSummary.totalTaxableValue) * parseFloat(this.applyCoupon.discount) /100 ;
      }else{
        this.PayObject.CouponDiscountValue = this.applyCoupon.discount;
      }
      this.getOrderSummary();
      
    }
    else{
      this.toast.showToast(res.message,ToastType.Error)
    }

  })
}
get OrderSummary(){
  return this._OrderSummary;
}
ngOnInit(): void {
  this.getOrderSummary();
  this._shipingAddress = this.CommonService.getShipAdd();
  this._billingAddress = this.CommonService.getBillAdd();
  this.PayObject= {
    UserId:this.ApiService.getUserId(),
    PurchaseOrderNumber:'',
    Remark:'',
    BillingId:this._billingAddress.id,
    ShippingId:this._shipingAddress.id,
    AddressInstructions:this._shipingAddress.deliveryInstruction,
    isSingleCardOrder:false,
    CartId:''
  }

}
getOrderDetails(){
  const modalRef = this.modalService.open(CartOrderSummeryByProductComponent, {
    size: "dialog-centered",
    centered: true,
    windowClass: 'xlModal-95'
  });
;

   modalRef.result.then(
    (result) => {
      console.log('Modal closed with:', result);
    },
    (reason) => {
      console.log('Modal dismissed with:', reason);
    }
  );
}
getDeliveryCharges(){

    let Q =  '';
    this.ApiService.httpget(Q, "/DeliveryCharges/getDeliveryCharges").subscribe(
      (response: any) => {
        
        
        //this._OrderSummary = response.data;
      },
      (err) => {
      }
    );
   
  
}

handlePaymentSuccess(response: any): void {
  let obj ={
    paymentId:response.paymentId,
    orderNumber:response.orderNumber,
    UserId:this.ApiService.getUserId()
  }
 
  window.localStorage.removeItem('cfx_app_cart');
  this.ApiService.httpost(obj, '/OrderMaster/payment-success').subscribe((data:any) => {
    console.log('Payment successful', data);

    // Navigate to the payment success component
    this.router.navigate(['/user/payment-success'], { queryParams: { paymentId: response.paymentId, orderId: response.orderNumber } });
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
  });
}

get isCustumerSupport(){
    let isYes  =  this.ApiService.getCSEmpCode();
    if(isYes){
      return true
    }else{
      return false;
    }
 
}

sendPaymentLink(){
  
  if(this.ApiService.getUserId()){
    this.PayObject.CreatedBy =  this.ApiService.getCSEmpCode()?this.ApiService.getCSEmpCode() :  this.ApiService.getUserId()
    this.ApiService.httpost(this.PayObject,'/OrderMaster/OrderSave')
    .subscribe((res:any)=>{
      
      if(res.isSuccess){
       let OrderNumber =  res.data.orderNumber;
       window.localStorage.removeItem('cfx_app_cart');
       this.ApiService.httpget('&userId='+(this.ApiService.getUserId()),'/ProductCart/removeUserCartItems').subscribe((res:any)=>{})
       let Q =  "&orderNumber="+OrderNumber+"&ToEmail="+this.shipingAddress.email;
       this.ApiService.httpget(Q,'/Email/sendPaymentLink').subscribe((res:any)=>{
        
        this.router.navigate(['/cs']);
        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.toast.showToast("Message Send Succesfully",ToastType.Success);
       })
     
      }
    })
  }
}
PayNow(type:string){
  if(this.ApiService.getUserId()){
    if(type=='Save'){
      this.PayObject.CouponDiscountValue=''
      this.PayObject.CouponCode=''
    }
    this.PayObject.CreatedBy =  this.ApiService.getCSEmpCode()?this.ApiService.getCSEmpCode() :  this.ApiService.getUserId()
    this.ApiService.httpost(this.PayObject,'/OrderMaster/OrderSave')
    .subscribe((res:any)=>{
      if(res.isSuccess){
        if(!res.data.paymentId){
          res.data.paymentId =  res.data.orderNumber;
        } 
        if(type!='Save'){
          this.router.navigate(['/user/payment-init'], { queryParams: { paymentId: res.data.orderNumber, orderId: res.data.orderNumber } });
         //this.handlePaymentSuccess(res.data)
        }if(type=='Save'){
          window.localStorage.removeItem('cfx_app_cart');
          this.ApiService.httpget('&userId='+(this.ApiService.getUserId()),'/ProductCart/removeUserCartItems').subscribe((res:any)=>{})
          setTimeout(() => {
            this.router.navigateByUrl('/user/order')
          }, 1000);
          
        }
        
      }
    })
  }
}

getOrderSummary(){
  if(this.ApiService.getUserId()){
    let q =  '&userId='+this.ApiService.getUserId()+'&cart_id=No&Flag=FullCart'
    let obj={
      userId:this.ApiService.getUserId(),
      cart_id:'No',
      Flag:'FullCart',
      CouponCode:this.PayObject.CouponCode
    }
    this.ApiService.httpost(obj,'/ProductCart/getCartOrderSummaryP')
    //this.ApiService.httpget(q,'/ProductCart/getCartOrderSummary')
    .subscribe((res:any)=>{
      
      if(res.length>0){
        this._OrderSummary= res[0];
      }
    })
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
get shipingAddress(){
  return this._shipingAddress;
}
get billingAddress(){
  return this._billingAddress;
}
get products(): ProductDetails[] {
  return  this.cartService.cartProducts;
}
}
