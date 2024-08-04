import { Component, Input } from '@angular/core';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import SwiperCore from 'swiper';
import { Navigation, Pagination,Scrollbar,A11y } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent  implements AfterViewInit{
  @Input('images') images :string[]=[] 
 

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      
      // Add Swiper configuration options here
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
}
