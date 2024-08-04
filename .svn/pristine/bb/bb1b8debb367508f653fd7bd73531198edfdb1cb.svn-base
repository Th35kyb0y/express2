import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { max } from 'lodash';
import { LoginSignUoModelComponent } from 'src/app/model-popups/login-sign-uo-model/login-sign-uo-model.component';
import { Content, ContentType, ProductDetails } from 'src/app/models/product/product';
import { CartService } from 'src/app/services/CartService';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  _productFirstImage:any=[];
  public pageList: any[] = [];
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  constructor( private _router: Router,
    public cartService: CartService,
    private modalService: NgbModal,
    private ApiService: ApiService
    ,) { this.getPages(); }

  ngOnInit(): void {
  
    sessionStorage.removeItem('_orderAddresses');
    sessionStorage.removeItem('_editCart');
    localStorage.removeItem('filterProduct');
  }

  handleInputChangeQty(product:any,event: Event): void {
    // Access the input value using event.target
    let inputValue:any = (event.target as HTMLInputElement).value;
    if(inputValue){
      if(inputValue>0){
        if (product != null) {
          product.quantity = parseInt(inputValue);
          product.addToCartText = "View Cart";
          product.goToCart = false;
          this.addToCart(product);
        }
      }else{
       product.quantity =  1;
        this.subQuantity(product);
      }
    }
   
  }
  numberOnly(event:any, MaxNo:number): boolean {
    console.log(MaxNo)
		const charCode = (event.which) ? event.which : event.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		if (event.currentTarget.value.length >= MaxNo) {
			return false;
		}
		return true;

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
  get cartDetail(): ProductDetails[] {
    return this.cartService.cartProducts;
  }
  public goBillingAddress() {
   
    if(this.isLoggedIn()){
      this.getOrderByCartId();
    }
    else{
      this.logIn('Log in')
    }
    
   
  }

  isLoggedIn(){
    return this.ApiService.getUserId();
  }
  logIn(type:string){
    const modalRef = this.modalService.open(LoginSignUoModelComponent, {
      size: 'lg', // You can specify the size of the modal
      centered: true,
    });
    modalRef.componentInstance.type = type;
     // Subscribe to modal close event if needed
     modalRef.result.then(
      (result) => {
        if(this.isLoggedIn()){
          this.getOrderByCartId();
        }
        console.log('Modal closed with:', result);
      },
      (reason) => {
        if(this.isLoggedIn()){
          this.getOrderByCartId();
        }
        console.log('Modal dismissed with:', reason);
      }
    );
  }

  private getOrderByCartId() {
   
    this._router.navigate(['/user/shipping-address']);
  }
 
  public deleteItemFromCart(product: ProductDetails) {
    
    this.cartService.removeCart(product);
   
  }

  public addQuantity(product: any) {
    if (product != null) {
      product.quantity = product.quantity + 1;
      product.addToCartText = "View Cart";
      product.goToCart = false;
      this.addToCart(product);
    }
  }
  public subQuantity(product: any) {
    if (product != null) {
      product.goToCart = false;
      if (product.quantity > 0) {
        product.quantity = product.quantity - 1;
      }
      if (product.quantity == 0) {
        product.addToCartText = "Add To Cart";
        this.deleteItemFromCart(product)
      } else {
        this.addToCart(product);
      }
    }
  }

  addToCart(product:ProductDetails): void {
    
    
    this.cartService.addToCart(product, []);
  
}
  public goContinueShopping() {
    this._router.navigate(['./home']);
  }

 
  getPages() {
    this.pageList = [];
    this.pageList.push({pageName:'Home'});
    this.pageList.push({pageName:'My Cart'});
  }
}
