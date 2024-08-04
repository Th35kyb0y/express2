import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { ProdutContent } from '../product-detail/productContentModel';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

import { SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-product-deail-new',
  templateUrl: './product-deail-new.component.html',
  styleUrls: ['./product-deail-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDeailNewComponent {

  images :any=['https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png'
,'https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png',
'https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png',
,'https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png',
'https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png',
'https://www.freshbooks.com/wp-content/uploads/2019/03/image1-37.png'] 

  prodId: string = '';
  productImages: any = [];
  objProdutContent: ProdutContent[] = [];
  productContent: any = {
    VideoLinks: [],
    Brochure: null,
    DataSheet: null,
    Presentation: null,
    Image: [],
    ImageFirst: null,
    TechnicalSpecifications: [],
    ProdcutOverview: [],
    Features: []
  };
  productContents: any = [];
  products: any = [];
  product: any = null;
  public safeVideoUrl!: SafeResourceUrl;
  @ViewChild('myCarousel', { static: false }) public myCarousel: NguCarousel<any> | undefined;
  public carouselConfig: NguCarouselConfig = {
    grid: { xs: 4, sm: 4, md: 4, lg: 4, all: 0 },
    load: 4,
    slide: 1,
    interval: undefined,
    loop: true,
    touch: true,
    velocity: 0.2,
    vertical: {
      enabled: true,
      height: 260
    }
  }
  public carouselItems: any[any] = [];
  public mainItems: any[] = [...this.carouselItems]


  constructor(private sanitizer: DomSanitizer, private ApiService: ApiService, public route: ActivatedRoute, private CommonService: CommonService) {
  }
  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.mySwiper', {
      direction: "vertical",
      loop: true, 
    
	  slidesPerView: 3,
    spaceBetween:10,
	  //centeredSlides: true,
	  // slidesPerView: 'auto',
	  // centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  ngOnInit(): void {
    this.objProdutContent = [];
    this.prodId = this.ApiService.getQueryStringValue('prodId');
    if (this.prodId == '') {
      this.getProducts();
    }
    else {
      this.getProductsbYid();
    }
    //if(this.prodId )
  }

  getVideoUrl(): SafeResourceUrl {

    return this.safeVideoUrl;
  }

  removeFromCat() {
    this.CommonService.removeFromCat(this.product);
  }

  inc() {
    this.product = { ...this.product, qty: (this.product.qty) ? ++this.product.qty : 1 }
    if (this.product.qty >= 0) {
      this.CommonService.addToCat(this.product)
    } else {
      this.removeFromCat();
    }
  }

  dec() {
    this.product = { ...this.product, qty: (this.product.qty && this.product.qty > 1) ? --this.product.qty : 0 }
    if (this.product.qty > 0) {
      this.CommonService.addToCat(this.product);
    } else {
      this.removeFromCat();
    }
  }

  addToCart() {
    if (!this.CommonService.addToCat(this.product)) {
      this.ApiService.gotoURL('/user/checkout')
    }
  }

  checkAddToCart(obj: any) {
    if (this.CommonService.checkAddToCart(obj)) {
      return "Added";
    }
    return "Add To Cart";
  }

  activeTab(tabname: any) {
    document.querySelectorAll('#pills-tabContent .tab-pane').forEach(e => {
      e.classList.remove('show', 'active');
      //.classList.add('fade')
    });
    (document.getElementById(tabname) as HTMLElement).classList.add('show', 'active');
  }

  getProductContents() {
    debugger;
    this.ApiService.httpget(`&productId=${this.product.id}`, "/ProductContents/getAll").subscribe(
      (response: any) => {
        if (this.product) {
          console.log(response.data);
          this.productContents = response.data.filter((e: any) => e.productId == this.product.id);
          this.objProdutContent = response.data.filter((e: any) => e.productId == this.product.id);
          console.log(this.objProdutContent);
          this.objProdutContent.map(e => {
            if (e.contentTypeId == 1) {
              const vedeo = this.productContents.find((e: any) => e.contentTypeId === 1).link.split('/')?.pop();
              const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
              this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
            }

          });


          this.productContent = {
            //VideoLinks: this.productContents.filter((e: any) => e.contentTypeId === 1).split('/')?.pop(),

            Brochure: this.productContents.find((e: any) => e.contentTypeId === 2),
            DataSheet: this.productContents.find((e: any) => e.contentTypeId === 3),
            Presentation: this.productContents.filter((e: any) => e.contentTypeId === 4),
            Image: this.productContents.filter((e: any) => e.contentTypeId === 5),
            ImageFirst: this.productContents.find((e: any) => e.contentTypeId === 5),
            TechnicalSpecifications: this.productContents.filter((e: any) => e.contentTypeId === 6),
            ProdcutOverview: this.productContents.filter((e: any) => e.contentTypeId === 7),
            Features: this.productContents.filter((e: any) => e.contentTypeId === 8)
          }
        }
        console.log(this.productContent);
      },
      (err) => {
      }
    );
  }

  getProducts() {

    const productname = this.route.snapshot.paramMap.get('productname');

    this.ApiService.httpgetMaster("", "/Product/getAll").subscribe(
      (response: any) => {

        const pObj = response.data.find((e: any) => ApiService.toSnakeCase(e.name) == productname);
        this.product = pObj;
        if (!this.product.qty) {
          this.product.qty = this.CommonService.getQty(this.product.id);;
        }
console.log(this.product); 
        this.getProductContents();
      },
      (err) => {
      }
    );
  }

  getProductsbYid() {
    debugger;
    const PID = this.prodId

    this.ApiService.httpgetMaster("", "/Product/getAll").subscribe(
      (response: any) => {

        const pObj = response.data.find((e: any) => e.id == this.prodId);
        this.product = pObj;
        if (!this.product.qty) {
          this.product.qty = this.CommonService.getQty(this.product.id);;
        }

        this.getProductContents();
      },
      (err) => {
      }
    );
  }

  productContentObj(pc: any) {
    this.productContent = pc;
  }
  public mainImge = "";
  setImage(imgPath: string) {
    this.mainImge = imgPath;
  }
  public carouselTileLoad(data: any) {
  }

}
