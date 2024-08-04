import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import SwiperCore from 'swiper';
import { Navigation, Pagination,Scrollbar,A11y } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import Swiper from 'swiper';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-mobile-home',
  templateUrl: './app-mobile-home.component.html',
  styleUrls: ['./app-mobile-home.component.scss']
})
export class AppMobileHomeComponent implements AfterViewInit ,OnDestroy{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input('collectins') collectins :any[]=[] 
  @Input('imtUrl') imtUrl :string='' 
  @Input('rightsideImgTitlt') rightsideImgTitlt :string='' 
  @Input('rightsideImge') rightsideImge :string='' 
  @Input('rightsideImgDes') rightsideImgDes :string='' 
  @Input('BannerLinkData') BannerLinkData :any=[] 
  @Input('bannerBottom') bannerBottom :any=[] 
  private scrollInterval: any;
  constructor(private ApiService: ApiService, private router: Router,
  
    
      ) { }
  ngAfterViewInit(): void {
    this.startAutoScroll();
    const mySwiper = new Swiper('.swiper-container', {
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  startAutoScroll() {
    
    const container = this.scrollContainer.nativeElement;
    let scrollPosition = 0;
    let scrollAmount = container.firstChild.clientWidth; // Width of one scroll item
    if(!scrollAmount){
      let el = document.getElementById('collectins-div');
      if(el){
        scrollAmount= el.clientWidth
      }
     
    }
    this.scrollInterval = setInterval(() => {
      if(!scrollAmount){
        let el = document.getElementById('collectins-div');
        if(el){
          scrollAmount= el.clientWidth
        }
       
      }
      scrollPosition += scrollAmount;
      if (scrollPosition >= container.scrollWidth) {
        scrollPosition = 0;
      }
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }, 7000); // 4 seconds
  }

  public getChildren(event: any) {

    localStorage.removeItem('filterProduct');
    this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId } });
  }
  ngOnDestroy() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
}
