// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDetails } from '../models/product/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    readonly cartStorageName = "cfx_app_cart";
public cartProducts:ProductDetails[] = [];
public cartquantity = 0;
  private cartItemsSubject = new BehaviorSubject<ProductDetails[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  constructor(private ApiService : ApiService){
    this.cartProducts= this.getItem(this.cartStorageName);
    this.cartTotalItems();
  }

  cartTotalItems() {
    let total = 0;
    for (let value of this.cartProducts) {
      total += parseInt(value.quantity+'');
    }
    this.cartquantity = total;
    //console.log("updated", this.cartquantity);
    return total;
  };
  cartSubTotal() {
    let total = 0;
    for (let value of this.cartProducts) {
      total += parseFloat(value.subtotal+'');
    }
  
    //console.log("updated", this.cartquantity);
    return total;
  };
  cartTotal() {
    let total = 0;
    for (let value of this.cartProducts) {
      total += parseFloat(value.total+'');
    }
   
    //console.log("updated", this.cartquantity);
    return total;
  };
  cartDiscount() {
    let total = 0;
    for (let value of this.cartProducts) {
      total += (parseFloat(value.discount.discountAmount+'')) * value.quantity;
    }
   
    //console.log("updated", this.cartquantity);
    return total;
  };

  AddToCardByApi(): Promise<boolean>{
    
    return new Promise<boolean>((resolve, reject) => {
    var items  =  this.getItem(this.cartStorageName);
    let isLogind =  this.ApiService.getUserId();
    if(isLogind && items.length>0){
      let body:any[]=[];
      items.forEach((e:any) => {
        e.cart_id = e.cart_id+''
        let Cart_Id = ''
        if (e.cart_id.includes(e.id)) {
          Cart_Id = "";
        } else {
          Cart_Id =  e.cart_id
        }
        body.push({
          cart_id:Cart_Id,
          id:0,
          userId:isLogind,
          productId:e.id,
          isActive:1,
          createdOn:new Date(),
          quantity:e.quantity,
        })
      });
      
      this.ApiService.httpost(body,'/ProductCart/saveNew')
      .subscribe((res:any)=>{
        
        let data = this.getItem(this.cartStorageName);
        data.forEach((e:any) => {
          let f  = res.filter((x:any)=>x.productID==e.id);
          if(f.length>0){
            e.cart_id =  f[0].cart_id;
          }
        });
        this.setItem2(this.cartStorageName,data)
        resolve(true);
      },(error=>{
        resolve(false);
      }))
    }
    else{
      resolve(false)
    }
  })
  }

 async  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    await this.AddToCardByApi();
  }
 async  setItem2(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));

  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }


  addToCarts(product:ProductDetails) {
    
      
      let added = false;
        for (let p of this.cartProducts) {
          if (p.id === product.id) {
        let cartQuantiyToReAdd = 1;
        if (product.quantity)
        cartQuantiyToReAdd = product.quantity;
            p.customers_basket_quantity = p.customers_basket_quantity ??0;
            p.discount.price = p.discount.price ??0;
            p.discount.discountedPrice = p.discount.discountedPrice ??0;
        p.customers_basket_quantity += cartQuantiyToReAdd;
        p.quantity = product.quantity;
        p.subtotal = p.discount.price * p.customers_basket_quantity;
        p.total = p.discount.discountedPrice * p.customers_basket_quantity;
        
        if (p.customers_basket_quantity > p.quantity && p.quantity!=null) {
          p.customers_basket_quantity--;
          p.subtotal = p.discount.price * p.customers_basket_quantity;
          p.total = p.discount.discountedPrice * p.customers_basket_quantity;;
        }
            added = true;
            break;
          }
        }
        if (added) {
            this.setItem2(this.cartStorageName,this.cartProducts)
      
          this.cartTotalItems();
        }else{
        
    
        let pprice = product.price;
        let psubprice = product.price;
        let on_sale = false;
        if (product.discount.price != null && product.discount.price != 0) {
            psubprice =product.discount.price;
          pprice =product.discount.discountedPrice;
          on_sale = true;
        }
       
        let subfinalPrice = this.calculateFinalPriceService([]) + parseFloat(psubprice+'');
        let finalPrice = this.calculateFinalPriceService([]) + parseFloat(pprice+'');
        
        let cartQuantiyToAdd = 1;
        if (product.quantity)
          cartQuantiyToAdd = product.quantity;
            let obj:ProductDetails = product;
            obj.cart_id = product.cart_id;
         
            obj.subtotal= cartQuantiyToAdd * subfinalPrice,
            obj.total= cartQuantiyToAdd * finalPrice
      
        this.cartProducts.push(obj);
            this.setItem2(this.cartStorageName,this.cartProducts)
        this.cartTotalItems();
      
      }
    
    
        
      }

  addToCart(product:ProductDetails, attArray:any) {debugger

	
	let added = false;
    for (let p of this.cartProducts) {
      if (p.id === product.id) {
		let cartQuantiyToReAdd = 1;
		if (product.quantity)
		cartQuantiyToReAdd = product.quantity;
        p.customers_basket_quantity = p.customers_basket_quantity ??0;
        p.discount.price = p.discount.price ??0;
        p.discount.discountedPrice = parseFloat(p.discount.discountedPrice+"") ??0;
		p.customers_basket_quantity = cartQuantiyToReAdd;
		//p.customers_basket_quantity += cartQuantiyToReAdd;
		p.quantity = product.quantity;
		p.subtotal = parseFloat(p.discount.price+"") * p.customers_basket_quantity;
		p.total = parseFloat(p.discount.discountedPrice+"") * p.customers_basket_quantity;
		
		if (p.customers_basket_quantity > p.quantity && p.quantity!=null) {
			p.customers_basket_quantity--;
			p.subtotal = parseFloat(p.discount.price+"") * p.customers_basket_quantity;
			p.total = parseFloat(p.discount.discountedPrice+"") * p.customers_basket_quantity;;
		}
        added = true;
        break;
      }
    }
    if (added) {
        this.setItem(this.cartStorageName,this.cartProducts)
	
		  this.cartTotalItems();
  	}else{
    

    let pprice = parseFloat(product.price+"");
    let psubprice = parseFloat(product.price+"");
    let on_sale = false;
    if (product.discount.price != null && product.discount.price != 0) {
        psubprice = parseFloat(product.discount.price+"");
      pprice  =     parseFloat(product.discount.discountedPrice+"");
      on_sale = true;
    }
   
    let subfinalPrice = this.calculateFinalPriceService([]) + parseFloat(psubprice+'');
    let finalPrice = this.calculateFinalPriceService([]) + parseFloat(pprice+'');
    
		let cartQuantiyToAdd = 1;
		if (product.quantity)
		  cartQuantiyToAdd = product.quantity;
        let obj:ProductDetails = product;
        obj.cart_id = product.id +'-'+ this.cartProducts.length;
     
        obj.subtotal= cartQuantiyToAdd * subfinalPrice,
        obj.total= cartQuantiyToAdd * finalPrice
	
		this.cartProducts.push(obj);
        this.setItem(this.cartStorageName,this.cartProducts)
		this.cartTotalItems();
	
	}


    
  }

removeCart(p:ProductDetails) {


if(this.ApiService.getUserId()){
  let q =  '&ProductID='+p.id+'&userId='+this.ApiService.getUserId()
  this.ApiService.httpget(q,'/ProductCart/removeCartItem')
  .subscribe((res:any)=>{
    
    
    //this.removeItem(this.cartStorageName)
  })
}
    this.cartProducts.forEach((value, index) => {
      if (value.cart_id == p.cart_id) {
        this.cartProducts.splice(index, 1);
        this.setItem(this.cartStorageName,this.cartProducts)
    
      }
    });
    this.cartTotalItems();
   
   
  }
  emptyCart() {

    this.cartProducts = [];
 
    this.setItem(this.cartStorageName,this.cartProducts)
    this.cartTotalItems();
  }

calculateFinalPriceService(attArray:any[]) {
    let total = 0;
    attArray.forEach((value, index) => {
      let attPrice = parseFloat(value.options_values_price);
      if (value.price_prefix == '+') {
        //  console.log('+');
        total += attPrice;
      }
      else {
        //  console.log('-');
        total -= attPrice;
      }
    });
    // console.log("max "+total);
    return total;
  }

   getUserCartsByAPI(userId:any,proposalcode:string) : Promise<string>{
    
    return new Promise((resolve, reject) => {
     let q =  '&UserId='+userId+'&proposalcode='+proposalcode
     //let q =  '&UserId='+userId
    //this.ApiService.httpget(q,'/Product/getCartProductsByUserIdNew')
    this.ApiService.httpget(q,'/Product/getCartProductsByUserId')
    .subscribe((res:any)=>{
      
      if(res.isSuccess){
        res.data.forEach((element:any) => {
          this.addToCarts(element)
        });
        resolve("Operation succeeded!");
      }
      //this.removeItem(this.cartStorageName)
    })
    });
  }



}
