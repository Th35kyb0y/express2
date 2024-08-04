import { HostListener, OnInit } from '@angular/core';
import { Component, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';
import { MetatagsService } from 'src/app/services/metatags.service';
import { restapiURL } from 'src/app/services/restapi-url';
import { ONResize_PlatformService } from 'src/app/services/onResize-platform.service';
@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {
  width: number = 0;
  recentlyViewed: any[] = [];
  product: any[] = [];
  collectins: any = [];
  bannerBottom: any = [];
	imtUrl = ""
  isMobile: boolean =  false;
  constructor(private ApiService: ApiService, private router: Router,
private meta :MetatagsService,
public onResize_PlatformService:ONResize_PlatformService
  ) { }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    
    this.width = event.target.innerWidth;
    this.isMobile = this.width < 992;
  }

  gotoPayment(){
    var paymentId =  "ABCD"
    this.router.navigate(['/user/payment-init'], { queryParams: { paymentId: paymentId } });
  }
 
  ngOnInit(): void {
    try{

      this.width = window.innerWidth;
      this.isMobile = this.width < 992;

    }catch(e){}
// this.meta.AddMetatagDescription("Online Shopping in India,online Shopping store,Online Shopping Site,Buy Online,Shop Online,Online Shopping,Ceasefire Express")
// this.meta.AddMetatagKeywords("Online Shopping in India,online Shopping store,Online Shopping Site,Buy Online,Shop Online,Online Shopping,Ceasefire Express")
   
sessionStorage.setItem("Design", 'true');
restapiURL.liveURL
    this.imtUrl =  restapiURL.liveURL.replace('/api','/');//this.ApiService.getbaseURLEXP().replace('/api','/')
    //this.imtUrl =  this.ApiService.getbaseURLEXP().replace('/api','/')
    this.getCollection();
    this.getBannerBottom();
    this.getTableData()
    this.getRightsideImageData()
    this.getBottomLink()
  }

  public getChildren(event: any) {

    localStorage.removeItem('filterProduct');
    this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId } });
  }
  getCollection() {

    this.ApiService.httpgetMaster("", CSRestAPIPath.GetCollectionForDashBoard).subscribe(
      (response: any) => {
        this.collectins = response.data;
        console.log('===========> Collection List',this.collectins)
      },
      (err) => {
      }
    );
  }

  collectinsImg:any[]=[]
  getTableData() {
    const query = '';
    const endPointUrl = '';
    this.ApiService
        .httpgetMaster(query,'/Collection/getHomePageMenu')
        .subscribe({
            next: (res:any) => {
                console.log(res);
                if (res.statusCode == 200) {
                    this.collectinsImg = res?.data;
                    console.log('Succefull--------->',res?.data);
                } else {
                    console.log('Failed', res);
                }
            },
            error: (err) => console.log('Something Wrong', err),
        });
}

  getBannerBottom() {
    this.ApiService.httpgetMaster("", "/BannerBottom/getAll").subscribe(
      (response: any) => {
        this.bannerBottom = response.data;

        console.log("*********",this.bannerBottom)
      },
      (err) => {
      }
    );
  }




  rightsideImge:string=''
  rightsideImgTitlt:string=''
  rightsideImgDes:string=''

  getRightsideImageData() {
    this.ApiService.httpgetMaster('','/RightsideImage/getAll').subscribe({
      next: (res: any) => {
        console.log("TTTTT", res)
        if (res.statusCode == 200) {
          const data= res?.data
          this.rightsideImgTitlt=data[0]?.title
          this.rightsideImge=data[0]?.fileName
          this.rightsideImgDes=data[0]?.content

          // this.rightiseImage.title=  this.bannersData[0]?.title
          // // this.rightiseImage.title=  this.bannersData[0]?.title
          // this.rightiseImage.id= this.bannersData[0]?.id
          // this.rightiseImage.content=  this.bannersData[0]?.content
          // this.rightiseImage.fileName=  this.bannersData[0]?.fileName
          // this.bannerImage=  this.bannersData[0]?.fileName
          // this.rightiseImage.title=  this.bannersData[0]?.title
        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error")
      }
    })
  }




  BannerLinkData:any[]=[]
  getBottomLink() {
    
    this.ApiService.httpgetMaster('','/RightsideCategoryButton/AllGet').subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.BannerLinkData = res?.data
          console.log("BannerLinkDatavBannerLinkData",this.BannerLinkData)
        } else {
          console.log("Something Wrong")
        }
      },
      error: (err: any) => {
        console.log("Server Error")
      }
    })
  }
}

