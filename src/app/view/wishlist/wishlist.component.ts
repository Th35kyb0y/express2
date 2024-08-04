import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private _productFirstImage: string = '';
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  product: any[] = [];
  constructor( private ApiService: ApiService,private router:Router,){

  }
  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(){
    let Q='&UserID='+this.ApiService.getUserId();
		this.ApiService.httpget(Q,'/Product/getProductsWishList')
		.subscribe((res:any)=>{
			
      res.data.forEach((item: any) => {
        item.addToCartText = 'Add To Cart'
        item.quantity = 0

      })
      this.product =  res.data;
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
  public GoFireExtinguisherDetail(product: any) {
    //window.location.href = './FireExtinguisherDetail';
    console.log(product);
    let nc = (product.name.replaceAll(" ", "-"))+"_"+product.code
    this.router.navigate(['/product-detail',nc], { queryParams: { prodId: product.id, catId: btoa(product.categoryId) } });
   
  } 
  remove(item:any,i:number){
    if(confirm('Are you sure?')){
      let Q='&UserID='+this.ApiService.getUserId()+'&wishListId='+item.wishListId
		this.ApiService.httpget(Q,'/ProductWishlist/UserRemoved')
		.subscribe((res:any)=>{
			debugger
    this.product.splice(i,1)
		})
    }
  }

}
