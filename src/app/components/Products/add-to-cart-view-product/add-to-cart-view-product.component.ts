import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetails } from 'src/app/models/product/product';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-add-to-cart-view-product',
  templateUrl: './add-to-cart-view-product.component.html',
  styleUrls: ['./add-to-cart-view-product.component.scss']
})
export class AddToCartViewProductComponent {
  @Input('product') product: ProductDetails={} as ProductDetails;
  @Input('isViewProduct') isViewProduct: boolean= true; 
 
  constructor(private cartService: CartService ,private router:Router, private CommonService: CommonService){

  }
  public GoFireExtinguisherDetail(product: any) {debugger
    //window.location.href = './FireExtinguisherDetail';
    console.log(product); 
    let nc = (product.name.replaceAll(" ", "-")) +"_"+product.code
    this.router.navigate(['/product-detail',nc], { queryParams: { prodId: product.id, catId: btoa(product.collectionId) } });
   
  } 
  numberOnly(event:any, MaxNo:number): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		if (event.currentTarget.value.length >= MaxNo) {
			return false;
		}
		return true;

	}
  handleInputChangeQty(event: Event): void {
    // Access the input value using event.target
    let inputValue:any = (event.target as HTMLInputElement).value;
    if(inputValue){
      if(inputValue>0){
        this.product.quantity =  parseInt(inputValue);
        this.product.addToCartText = "View Cart";
        this.product.goToCart = false;
        this.addToCart(this.product);
      }else{
        this.product.quantity =  1;
        this.decreaseQuantity(this.product);
      }
    }
   
  }
  isInCart() {
    let found = false;

    for (let value of this.cartService.cartProducts) {
      if (value.id == this.product.id) {
        this.product.quantity = value.quantity; 
        found = true; 
      }
    }

    if (found == true) return true;
    else return false;
  }

  isInCartQuantity() {
    let found = false;
    let quantity = ""
    for (let value of this.cartService.cartProducts) {
      if (value.id == this.product.id) { 
        quantity = value.quantity+''
        found = true;
       }
    }

    if (found == true) return quantity;
    else return "";
  }

 

  increaseQuantity(product: ProductDetails): void {
    product.quantity = parseInt(product.quantity+"") + 1;
    product.addToCartText = "View Cart";
    product.goToCart = false;
    this.addToCart(product);
  }

  decreaseQuantity(product: ProductDetails): void {
    product.goToCart = false;
    if (product.quantity > 0) {
      product.quantity = parseInt(product.quantity+"") - 1;
    }
    if (product.quantity == 0) {
      product.addToCartText = "Add To Cart";
      this.deleteItemFromCart(product)
    } else {
      this.addToCart(product);
    }
  }

  public deleteItemFromCart(product: ProductDetails) {
    this.cartService.removeCart(product);
   
  }

  addToCartByClick(product:ProductDetails): void {
    
    if(this.isInCart()){
      this.router.navigateByUrl('/products/MyCart')
    }else{
      if(product.quantity==0){
        product.quantity = product.quantity + 1;
      }
     
      this.cartService.addToCart(product, []);
    }
    
    //this.cartService.addToCart(product, product.quantity);
   
  }
 
 
  addToCart(product:ProductDetails): void {
    
    
      this.cartService.addToCart(product, []);
    
  }
}
