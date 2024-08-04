import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-subcategory-list',
  templateUrl: './product-subcategory-list.component.html',
  styleUrls: ['./product-subcategory-list.component.scss']
})
export class ProductSubcategoryListComponent implements OnInit {

  CollectionId:any
  ContentTypeId:any
  public safeVideoUrl!: SafeResourceUrl;

  isVideoShow:boolean=false
  constructor(private sanitizer: DomSanitizer, private router:Router, private route:ActivatedRoute, private apiServices:ApiService){
 this.route.queryParams.subscribe((params:any)=>{
  console.log("--------------------->",params)
  this.CollectionId=params?.CollectionId
  this.ContentTypeId=params?.ContentTypeId
 })
  }

  ngOnInit(): void {
    this.getTermAndConditionData()
  }

  share(){

  }
  get isShowCSHomeBtn(){
    return this.apiServices.getCSEmpCode();

  }
  ProductData:any
  getTermAndConditionData() {
    debugger
    const query=`&ContentTypeId=${this.ContentTypeId}&CollectionId=${this.CollectionId}`
    this.apiServices.httpget(query,'/Product/getProductContentsForMyLibrary').subscribe({
      next: (res: any) => {
        console.log("TTTTT  getTermAndConditionData getTermAndConditionData", res)
        if (res.statusCode == 200) {
          this.ProductData = res?.data
          const vedeo = this.ProductData.find((e: any) => true).brochureLink.split('/')?.pop();
          const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error",err)
      }
    })
  }

  getVideoUrl(): SafeResourceUrl {

    return this.safeVideoUrl;
  }




  showVideo(videoLink:string){
    debugger
    const vedeo = videoLink.split('/')?.pop()?videoLink.split('/')?.pop():'';
    const videoUrl = `https://www.youtube.com/embed/${vedeo}?autoplay=1&mute=1`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    this.isVideoShow=!this.isVideoShow
  }

  techSpect:any
isShowTechSpec:boolean=false
  showtechSepc(techSpec:any){
debugger
    console.log('&&&&&&&&&',techSpec)
this.isShowTechSpec=!this.isShowTechSpec
this.techSpect=techSpec
  }
}
