import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content, ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-cs-order-details-pop-up',
  templateUrl: './cs-order-details-pop-up.component.html',
  styleUrls: ['./cs-order-details-pop-up.component.scss']
})
export class CsOrderDetailsPopUpComponent implements OnInit {

@Input() item: any;
@Input() orderId: string='';
@Output() passEntry: EventEmitter<any> = new EventEmitter();
_orderId:string='';
private _OrderSummary:any;
_shipingAddress:any=[];
_billingAddress:any=[];
_productFirstImage:any=[];
_products:any=[];
private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
constructor(private modalService: NgbModal,
  public activeModal: NgbActiveModal,
  private ApiService:ApiService,
  private router:Router,) {

   

  }
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  }
  ngOnInit(): void {
    this._orderId = this.orderId
    this.getOrderSummary();
  }

  registrationEvent(ev:any){
    
      //this.passEntry.emit({UserId:this.UserId});
      this.closeModal("")
   
  }

  getOrderSummary(){
   debugger
      
      let q =  '&userId='+this.item.userId+'&cart_id='+this._orderId+'&Flag=Product datails one row'
      this.ApiService.httpget(q,'/OrderMaster/getOrderDetails')
      .subscribe((res:any)=>{
        
        if(res.length>0){
  
          this._OrderSummary= res[0];
          let getShipAdd =   this._OrderSummary.orderresponse.orderAddresses.filter((x:any)=>x.addressId==this._OrderSummary.billingId)[0];
          let getBillAdd =   this._OrderSummary.orderresponse.orderAddresses.filter((x:any)=>x.addressId==this._OrderSummary.shippingId)[0];
          this._shipingAddress = getShipAdd;
          this._billingAddress = getBillAdd;
          // this.PayObject.AddressInstructions= this._OrderSummary.addressInstructions;
          // this.PayObject.PurchaseOrderNumber= this._OrderSummary.purchaseOrderNumber;
          // this.PayObject.Remark= this._OrderSummary.remark;
          this._products =  this._OrderSummary.orderresponse.orderItems
        }
      })
    
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
  get products(): any[] {
    return  this._products;
  }
  get OrderSummary(){
    return this._OrderSummary;
  }
}
