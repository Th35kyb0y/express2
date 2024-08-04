import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreFetchService {

  categories = [];

  constructor(private ApiService: ApiService, private Router: Router) { }

  init(): Promise<any> {
    return new Promise<void>(resolve => {
      this._call_master_apis();
      resolve();
    });
  }

  _call_master_apis() {

    //this.ApiService.httpget("", "/Categories/getAll");
    //this.ApiService.httpgetMaster("", "/BannerCats/getAll");
    //this.ApiService.httpgetMaster("", "/BannerSliders/getAll");
    //this.ApiService.httpget("", "/ProductRecommended/getAll");
    //this.ApiService.httpget("", "/ProductRecentlyViewed/getAll");
    //this.ApiService.httpget("", "/SegmentMaster/getAll");
    //this.ApiService.httpget("", "/ExpTypes/getAll");
    // this.ApiService.httpgetMaster("", "/AreaMaster/getAll");
    // this.ApiService.httpgetMaster("", "/AreaProductPivot/getAll");
    // this.ApiService.httpgetMaster("", "/AreaSegmentPivot/getAll");
    // this.ApiService.httpgetMaster("&contentTypeId=5", "/ProductContents/getAll");
    // this.ApiService.httpgetMaster("", "/ProductCategories/getAll");
    // this.ApiService.httpgetMaster("", "/Product/getAll");
    // this.ApiService.httpgetMaster("", "/ProductDiscount/getAll");
  }
}
