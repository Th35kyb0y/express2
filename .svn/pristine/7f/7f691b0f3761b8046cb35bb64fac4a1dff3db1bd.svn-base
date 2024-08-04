import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    readonly cartSessionName = "cf_app_cart";

    constructor() { }

    getQty(pid:any){
        let cart:any = window.sessionStorage.getItem(this.cartSessionName) || "[]";
        cart  = JSON.parse(cart);
        if(!cart){
            return 1;
        }
        const product = cart.find((e:any)=>e.id == pid);
        return (product)?product.qty:0;
    }

    getCart(){
        let cart:any = window.sessionStorage.getItem(this.cartSessionName) || "[]";
        cart  = JSON.parse(cart);
        return cart;
    }

    checkAddToCart(product:any){
        let cart:any = window.sessionStorage.getItem(this.cartSessionName) || "[]";
        cart  = JSON.parse(cart);
        let cartFind = cart.find((e:any)=>e.id==product.id);
        if(cartFind){
            return true;
        }

        return false;
    }

    addToCat(product:any) {
        let cart:any = window.sessionStorage.getItem(this.cartSessionName) || "[]";
        cart  = JSON.parse(cart);

        let cartFind = cart.findIndex((e:any)=>e.id==product.id);
        if(cartFind ==-1){
            cart.push(product);
            window.sessionStorage.setItem(this.cartSessionName,JSON.stringify(cart));
            return true;
        }else{
            cart[cartFind] = product;
            window.sessionStorage.setItem(this.cartSessionName,JSON.stringify(cart));
            return false;
        }
    }

    removeFromCat(product:any) {
        let cart:any = window.sessionStorage.getItem(this.cartSessionName) || "[]";
        cart  = JSON.parse(cart);

        let cartFind = cart.findIndex((e:any)=>e.id==product.id);
        cart.splice(cartFind,1)
        window.sessionStorage.setItem(this.cartSessionName,JSON.stringify(cart));
    }

    saveShipAdd(item:any){
        window.sessionStorage.setItem("_cf_ship_add",JSON.stringify(item));
    }

    saveBillAdd(item:any){
        window.sessionStorage.setItem("_cf_bill_add",JSON.stringify(item));
    }

    getShipAdd(){
        let address = window.sessionStorage.getItem("_cf_ship_add");
        if(!address){return null}
        return JSON.parse(address);
    }

    getBillAdd(){
        let address = window.sessionStorage.getItem("_cf_bill_add");
        if(!address){return null}
        return JSON.parse(address);
    }
}
