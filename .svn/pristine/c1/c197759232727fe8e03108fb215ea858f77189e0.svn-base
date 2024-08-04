import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import SwiperCore from 'swiper';

// install Swiper modules
//SwiperCore.use();

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class OurStoryComponent implements  AfterViewInit  {
  productContent:any[]=['A','B','c','A','B','c','A','B','c']



  Ajay:any[]=['A','b','c','A','b','c','A','b','c']

  onSwiper() {
    // alert("gg ")
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.storySwiper', {
      direction: "horizontal",
      loop: true,
      a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },

      slidesPerView: 1,
      spaceBetween: 10,
      centeredSlides: true,
   
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    // element?.style.display="none"
  }
}


