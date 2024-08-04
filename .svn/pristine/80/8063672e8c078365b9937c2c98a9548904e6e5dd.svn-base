import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartOrderSummeryByProductComponent } from 'src/app/model-popups/cart-order-summery-by-product/cart-order-summery-by-product.component';

import { Content, ContentType, ProductDetails } from 'src/app/models/product/product';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent  implements OnInit {
  _shipingAddress:any={};
  _billingAddress:any={};
  _productFirstImage:any=[];
  PayObject:any= {
    UserId:this.ApiService.getUserId(),
    PurchaseOrderNumber:'',
    Remark:'',
    BillingId:'',
    ShippingId:'',
    AddressInstructions:'',
    isSingleCardOrder:false,
    CartId:''
  }
  _orderId:string='';
  _products:any=[];
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  DeliveryCharges:any;
  private _OrderSummary:any;
constructor(
  private CommonService: CommonService,
   public cartService: CartService,
   private ApiService: ApiService,
   private modalService: NgbModal,
   private router :Router,
   private _router: Router,
   private _activatedroute: ActivatedRoute,
   ){
    const sub = this._activatedroute.queryParams
    .subscribe(params => {
      this._orderId = params['orderId'];
      if(!this._orderId){
        this._router.navigate(['']);
      }
      
    });
}
public styleForeColor(foreColor: string): string {
  return `color: ${foreColor};`
}
public editOrder(order: any) {
  // this.IsLoader = true;
  // this._orderService.editOrder(order.orderId).subscribe((response) => {
  //   this._cartService.updateHeaderCart();
  //   this._router.navigate(['./MyCart']);
  // });
}

get OrderSummary(){

  return this._OrderSummary|| {};
}
ngOnInit(): void {
  this.getOrderSummary();
  // this._shipingAddress = this.CommonService.getShipAdd();
  // this._billingAddress = this.CommonService.getBillAdd();
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
  modalRef.componentInstance.orderId = this._orderId;
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
        
        
        this._OrderSummary = response.data;
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
  });
}
PayNow(){
  if(this.ApiService.getUserId()){
    this.PayObject.orderId =  this._orderId
    this.ApiService.httpost(this.PayObject,'/OrderMaster/OrderSave')
    .subscribe((res:any)=>{
      if(res.isSuccess){
        if(!res.data.paymentId){
          //res.data.paymentId =  '123456';
          res.data.paymentId =  res.data.orderNumber;
        }
        this.router.navigate(['/user/payment-init'], { queryParams: { paymentId: res.data.orderNumber, orderId: res.data.orderNumber } });
        //this.handlePaymentSuccess(res.data)
      }
    })
  }
}

getOrderSummary(){
  if(this.ApiService.getUserId()){
    
    let q =  '&userId='+this.ApiService.getUserId()+'&cart_id='+this._orderId+'&Flag=Product datails one row'
    this.ApiService.httpget(q,'/OrderMaster/getOrderDetails')
    .subscribe((res:any)=>{
      
      if(res.length>0){
debugger
        this._OrderSummary= res[0];
        let getShipAdd =   this._OrderSummary.orderresponse.orderAddresses.filter((x:any)=>x.addressId==this._OrderSummary.billingId)[0];
        let getBillAdd =   this._OrderSummary.orderresponse.orderAddresses.filter((x:any)=>x.addressId==this._OrderSummary.shippingId)[0];
        this._shipingAddress = getShipAdd;
        this._billingAddress = getBillAdd;
        this.PayObject.AddressInstructions= this._OrderSummary.addressInstructions;
        this.PayObject.PurchaseOrderNumber= this._OrderSummary.purchaseOrderNumber;
        this.PayObject.Remark= this._OrderSummary.remark;
        this._products =  this._OrderSummary.orderresponse.orderItems
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
  // console.log("_shipingAddress"+JSON.stringify(this._shipingAddress))
  return this._shipingAddress ;
}
get billingAddress(){
  console.log("_billingAddress"+JSON.stringify(this._billingAddress))
  return this._billingAddress;
}
get products(): any[] {
  return  this._products;
}
}
