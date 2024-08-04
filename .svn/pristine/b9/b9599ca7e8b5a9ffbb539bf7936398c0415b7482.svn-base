import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-living-room',
  templateUrl: './living-room.component.html',
  styleUrls: ['./living-room.component.scss']
})
export class LivingRoomComponent implements OnInit {




  modelTitle:string=''
  modelDescription:string=''
  ModelImg:string=''
  youtubeLink:string=''
  FileType:string=''
  public safeVideoUrl!: SafeResourceUrl ;

  getVideoUrl(): SafeResourceUrl {
    return this.safeVideoUrl;
  }

  openModel(data:any){
debugger
this.modelTitle=data.title
this.modelDescription=data.description
this.ModelImg=data.areaImageUrl
this.youtubeLink=data.videoLink
const vedeo = data.videoLink?.split('/')?.pop()

const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
this.FileType=data.fileType
  }

  SegmentAreaId:any
  buttonName:string=''
  constructor(private apiServices:ApiService, private route:ActivatedRoute,private sanitizer: DomSanitizer,private router:Router){
 this.route.queryParams.subscribe((query:any)=>{
  console.log("&&&&&&&&&&&&&&&&&&",query)
  this.SegmentAreaId=query?.Id
  this.buttonName=query?.buttonName
  this.SegmentId=query?.SegmentId
 })
  }

  ngOnInit(): void {
    this.getTermAndConditionData()
    this.GetQuickLinkData()
    this.getlist()
    this.showNextString()
  }


  SegmentAreaData:any[]=[]
  riskArea1:string=''
  riskArea2:string=''

  SegmentId:any=1
  BannerImgUrl:string=''
  couponCodeBannerImg:string=''
  couponCodeLink:string=''
  couponCodeLinkQuery:any
  getTermAndConditionData() {
    debugger
    const query=`&Id=${this.SegmentAreaId}&SegmentId=${this.SegmentId}`
    this.apiServices.httpget(query,'/SegmentMaster/GetHomeSegment').subscribe({
      next: (res: any) => {
        console.log("TTTTT  getTermAndConditionData getTermAndConditionData", res)
        if (res.statusCode == 200) {
          this.SegmentAreaData = res?.data
        this.riskArea1=this.SegmentAreaData[0]?.riskFactor1
        this.riskArea2=this.SegmentAreaData[0]?.riskFactor2
        this.BannerImgUrl=this.SegmentAreaData[0]?.bannerImage
        this.couponCodeBannerImg=this.SegmentAreaData[0]?.couponBannerImg
        this.couponCodeLink=this.SegmentAreaData[0]?.couponBannerLink?.split("?")?.shift() || ""
        this.couponCodeLinkQuery=this.SegmentAreaData[0]?.couponBannerLink?.split("=")?.pop() || 0
          console.log("PPPPPPPPppppp,thi",this.SegmentAreaData)
          // const vedeo = this.ProductData.find((e: any) => true).brochureLink.split('/')?.pop();
          // const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
          // this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error",err)
      }
    })
  }


  GetQuickLinkDataList:any

  GetQuickLinkData() {
    // const query=`&Id=${this.SegmentAreaId}`
    const query = `&Id=${this.SegmentAreaId}&SegmentId=${this.SegmentId }`
    this.apiServices.httpget(query,'/SegmentMaster/GetHomeSegmentQuickLink').subscribe({
      next: (res: any) => {
        console.log("TTTTT  getTermAndConditionData getTermAndConditionData", res)
        if (res.statusCode == 200) {
          this.GetQuickLinkDataList = res?.data

          console.log("PPPPPPPPppppp,thi",this.GetQuickLinkDataList)
          // const vedeo = this.ProductData.find((e: any) => true).brochureLink.split('/')?.pop();
          // const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
          // this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error",err)
      }
    })
  }

couponsList:any[]=[]
couponName:string=''
currentIndex:any
stringName:string[]=[`SPECIAL OFFER ON HOME FIRE EXTINGUISHERS!`,`LIMITED TIME OFFER!!!`,`BUY NOW !`,`USE COUPON CODE `]
  getlist() {
		this.apiServices.httpget('',"/Coupons/getAllCoupons").subscribe((res: any) => {

			this.couponsList = res.data?.map((obj:any) => obj.couponCode);
      if(this.couponsList.length >0){

        this.currentIndex = 0;

        setInterval(() => {
          const randomIndex = Math.floor(Math.random() * this.couponsList.length);
          this.couponName = this.couponsList[randomIndex];
          this.stringName[3]=`USE COUPON CODE ${this.couponName}`
        }, 5000); // 15 seconds interval


    }else{
      this.couponName='Not Coupans Available'
    }

		})
	}


  assistantList:string[]=[`https://cfx.ceasefire.biz/assets/right_banners/chat_us.jpg`,`https://cfx.ceasefire.biz/assets/right_banners/need_assistance.jpg`,`https://cfx.ceasefire.biz/assets/right_banners/we_are_here_to_help.jpg`,`https://cfx.ceasefire.biz/assets/right_banners/need_assistance.jpg`]


  showNextString() {
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.stringName.length) {
        this.currentIndex = 0; // Reset index if reached the end
      }
      this.showNextString();
    }, 5000); // Delay of 5 seconds (5000 milliseconds)
  }


  moveToProductList(item:any){
    console.log("JJJJJJJJJJJJJ",item)



    const query = `&Id=${item.id}&SegmentId=${this.SegmentId }`


    this.apiServices.httpget(query,"/SegmentMaster/GetProductCollectionList").subscribe((res: any) => {

     const data=res?.data?.map((item:any)=>item.collectionId)
     const data1=data?.toString()
		 console.log("YYYYYYYYYYYYYYYYYYY",data1)

     let collectionName = item.collectionName ? item.collectionName:'Living Room'
      // this.router.navigate(['products'])
      this.router.navigate(['./products',collectionName], { queryParams: { catId: data1?data1:0}});

		})
  }
}
