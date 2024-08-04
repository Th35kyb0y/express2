import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent {

  SegmentId:any
  pageTitle:string=''
  pageDescription:string=''
  pageVideo:string=''
  pageImage:string=''
  pageImage2:string=''
  constructor(private route:ActivatedRoute){
this.route.queryParams.subscribe((query:any)=>{
   this.SegmentId=query.SegmentId
   if(this.SegmentId==1){
this.pageTitle='Apartments'
this.pageDescription=`Find fool-proof fire safety for your Apartment with Ceasefire. From the living room, Bedrooms to the the
kitchen, learn about fire safety products for every space ensuring your home is secured for your loved
ones against fire.
`
this.pageVideo=`https://cfx.ceasefire.biz/assets/images/profile/apartment.mp4`
this.pageImage=`https://cfx.ceasefire.biz/assets/images/profile/explore_btn.jpg`
this.pageImage2=`https://cfx.ceasefire.biz/assets/images/profile/apartment_in.jpg`
   }else if(this.SegmentId==2){
    this.pageTitle='Villas'
    this.pageDescription=`Explore the art of fire safety in spacious villas with Ceasefire. From the grand living room to the heart of the kitchen, discover strategic placements of fire safety products ensuring your home is a haven of security. Join us in transforming every corner into a safeguarded masterpiece, prioritising your family's safety and well-being.
    `
    this.pageVideo=`https://cfx.ceasefire.biz/assets/images/profile/apartment.mp4`
    this.pageImage=`https://cfx.ceasefire.biz/assets/images/profile/explore_btn.jpg`
    this.pageImage2=`https://cfx.ceasefire.biz/assets/images/profile/villas_top.webp`
   }
})
  }


  cardList:any[]=[
    {SegmentId:1,id:1,buttonName:'Living Room',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/living_room.jpg'},
    {SegmentId:1,id:2,buttonName:'Coridoor',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/corridor.jpg'},
    {SegmentId:1,id:3,buttonName:'Kitchen',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/kitchen.jpg'},
    {SegmentId:1,id:4,buttonName:'Stairway',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/stairway1.jpg'},
    {SegmentId:1,id:5,buttonName:'Bedroom',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/bedroom_color.jpg'},
    {SegmentId:1,id:6,buttonName:'Home Office',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/Home_Office.jpg'},
    {SegmentId:1,id:7,buttonName:'Temple',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/temple.jpg'},
    {SegmentId:1,id:8,buttonName:'Gym',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/gym.jpg'},
    {SegmentId:1,id:9,buttonName:'Garage',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/garaze.jpg'},
    {SegmentId:1,id:10,buttonName:'Gensets',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/genset1.jpg'},
    {SegmentId:1,id:11,buttonName:'Cars',link:'../livingRoom',img:'https://cfx.ceasefire.biz/assets/main_segments/apartments/car.png'},
  ]


  scrollView(element:any){
    document.querySelector(element).scrollIntoView({behavior:'smooth', block:'start'})
  }



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


