import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  cart:any = [];
  discountPrices:any = 0.00;
  shipAdd:any = null;

  constructor(
    private ApiService: ApiService,
    private CommonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getCart();
    this.getShipAdd();
  }

  inc(i:any) {
    this.cart[i].qty = (this.cart[i].qty) ? ++this.cart[i].qty : 1;
    
    if(this.cart[i].qty>=0){
      this.CommonService.addToCat(this.cart[i]);
    }else{
      this.removeFromCat(i);
    }
    
    this.getCart();
  }

  dec(i:any) {
    this.cart[i].qty = (this.cart[i].qty && this.cart[i].qty > 1) ? --this.cart[i].qty : 0;
    if(this.cart[i].qty>0){
      this.CommonService.addToCat(this.cart[i]);
    }else{
      this.removeFromCat(i);
    }
    this.getCart();
  }

  removeFromCat(i:any) {
    this.CommonService.removeFromCat(this.cart[i]);
    this.getCart();
  }

  getShipAdd() {
    this.shipAdd = this.CommonService.getShipAdd();
  }

  getCart() {
    this.cart = this.CommonService.getCart();
    this.getProductDiscount();
  }

  getTotalAmount() {
    return this.cart.reduce((total:any, obj: any) => obj.price * obj.qty + total, 0);
  }

  getPayTotalAmount() {
    return this.cart.reduce((total:any, obj: any) => obj.price * obj.qty + total, 0) - this.discountPrices;
  }

  getProductDiscount() {
    this.discountPrices = 0.00;
    this.ApiService.httpgetMaster("", "/ProductDiscount/getAll").subscribe(
      (response: any) => {
        this.cart.forEach((e:any) => {
          const discountdata = response.data.find((f:any) => f.productId === e.id && f.isActive === true && e.qty >= f.noOfQty);
          console.log(discountdata);
          if (discountdata) {
            this.discountPrices += ((e.price * e.qty) * discountdata.discountPercentage) / 100;
          }

        })
      },
      (err) => {
      }
    );
  }
}
