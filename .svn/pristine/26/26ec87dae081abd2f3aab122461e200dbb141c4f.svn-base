import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  cart: []=[];
  addresses:any = [];
  address :FormGroup = this.formBuilder.group({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    companyName: "",
    pincode: "",
    city: "",
    state: "",
    line1: "",
    line2: "",
    deliveryInstruction: "",
    addressType: "",
    isDefault: 0,
    isActive: 1,
    createdOn: (new Date()).toISOString()
  });

  constructor(private formBuilder: FormBuilder,private ApiService: ApiService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.getCart();
    this.getAddressMaster();
  }

  getCart() {
    this.cart = this.CommonService.getCart();
  }

  getTotalAmount() {
    return this.cart.reduce((total, obj: any) => obj.price * obj.qty + total, 0)
  }

  saveShipAdd(item:any){
    this.CommonService.saveShipAdd(item);
  }

  selShipAdd(item:any){
    const address = this.CommonService.getShipAdd();
    if(!address){return false}
    return ([address].find(e=>e.id == item.id))?true:false;
  }

  getAddressMaster() {
    this.ApiService.httpget(``, "/AddressMaster/getAll").subscribe(
      (response: any) => {
        this.addresses = response.data;
      },
      (err) => {
      }
    );
  }

  saveAddressMaster() {
    this.ApiService.httpost({
      id: 0,
      userID: this.ApiService.getUserId(),
      ...this.address.value
    }, "/AddressMaster/save").subscribe(
      (response: any) => {
        this.getAddressMaster();
        //this.ApiService.gotoURL('/user/billing-address')
      },
      (err) => {
      }
    );
  }

}
