import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { restapiURL } from 'src/app/services/restapi-url';

@Component({
  selector: 'app-product-recommended',
  templateUrl: './product-recommended.component.html',
  styleUrls: ['./product-recommended.component.scss']
})
export class ProductRecommendedComponent  implements OnInit {

  product: any[] = [];

  bannerSliders: any[] = [];
  bannerCat: any[] = [];
  rViewed: any[] = [];
  recommendations: any[] = [];
  productContents:any = [];
 
  constructor(private ApiService: ApiService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.getProductContents();
    this.getBannerSliders();
    this.getBannerCat();
    this.getRecentlyViewed();
    this.getRecommendations();
  }

  addToCart(obj:any){
    this.CommonService.addToCat(obj);
  }

  checkAddToCart(obj:any) {
    if (this.CommonService.checkAddToCart(obj)) {
      return "Added";
    }
    return "Add To Cart";
  }

  getBannerSliders() {
    // this.ApiService.httpgetMaster("", `/BannerSliders/getAll`).subscribe(
    //   (response: any) => {
    //     this.bannerSliders = response;
    //   },
    //   (err) => {
    //   }
    // );
  }

  getBannerCat() {
    // this.ApiService.httpgetMaster("", `/BannerCats/getAll`).subscribe(
    //   (response: any) => {
    //     this.bannerCat = response;
    //   },
    //   (err) => {
    //   }
    // );
  }

  getRecentlyViewed() {
    // this.ApiService.httpgetMaster("", `/ProductRecentlyViewed/getAll`).subscribe(
    //   (response: any) => {
    //     this.rViewed = response;
    //   },
    //   (err) => {
    //   }
    // );
  }

  getRecommendations() {
    // this.ApiService.httpgetMaster("", `/ProductRecommended/getAll`).subscribe(
    //   (response: any) => {
    //     this.recommendations = response;
    //   },
    //   (err) => {
    //   }
    // );
  }

  getProductContents() {
    // this.ApiService.httpgetMaster("&contentTypeId=5", "/ProductContents/getAll").subscribe(
    //   (response: any) => {
    //     this.productContents = response.data;
    //     this.getProduct();
    //   },
    //   (err) => {
    //   }
    // );
  }

  getProduct() {
    this.ApiService.httpgetMaster("", `/Product/getAllTop10`).subscribe(
      (response: any) => {
        this.product = response.data.filter((e:any) => {
          e.qty = (e.qty)?e.qty:0;
          e.imagePath = this.productContents.find((f:any) => f.productId === e.id && f.contentTypeId == this.ApiService.contentTypes.Image && f.isMain == 1)?.link;
          return e;
        });
      },
      (err) => {
      }
    );
  }

}
