import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart:any = [];

  constructor(private CommonService: CommonService,private ApiService:ApiService) { }

  ngOnInit(): void {
    this.getCart();
  }

  removeFromCat(i:any){
    this.CommonService.removeFromCat(this.cart[i]);
    this.getCart();
  }

  inc(i:any) {
    this.cart[i].qty = (this.cart[i].qty) ? ++this.cart[i].qty : 1;
    if(this.cart[i].qty>=0){
      this.CommonService.addToCat(this.cart[i]);
    }else{
      this.removeFromCat(i);
    }
  }

  dec(i:any) {
    this.cart[i].qty = (this.cart[i].qty && this.cart[i].qty > 1) ? --this.cart[i].qty : 0;
    
    if(this.cart[i].qty>0){
      this.CommonService.addToCat(this.cart[i]);
    }else{
      this.removeFromCat(i);
    }
  }

  getCart() {
    this.cart = this.CommonService.getCart();
  }

  getTotalAmount() {
    return this.cart.reduce((total:any, obj: any) => obj.price * obj.qty + total, 0)
  }

  proceedToCheckout(){
    ///user/shipping-address

    if(this.ApiService.getUserId()!=null){
      this.ApiService.gotoURL(`/user/shipping-address`);
    }else{
      alert('Please login to continue');
    }
  }
}
