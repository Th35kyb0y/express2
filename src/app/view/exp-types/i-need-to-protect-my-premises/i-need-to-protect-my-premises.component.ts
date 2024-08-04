import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-i-need-to-protect-my-premises',
  templateUrl: './i-need-to-protect-my-premises.component.html',
  styleUrls: ['./i-need-to-protect-my-premises.component.scss']
})
export class INeedToProtectMyPremisesComponent implements OnInit {

  urlType:any = "";
  segment:any = null;
  category:any = [];
  categorys:any = [];
  areaPivot:any = [];
  areaSegmentPivot:any = [];
  categorySubscriber:any = null;

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.checkIfParamChanges();
    
  }

  checkIfParamChanges() {
    this.categorySubscriber = this.route.params.subscribe((data) => {
      this.urlType = this.route.snapshot.paramMap.get('itemname');
      this.getCategories();
    });
  }

  getSegment() {
    debugger;
    this.ApiService.httpgetMaster("", "/SegmentMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.find((e:any) => ApiService.toSnakeCase(e.title) == this.urlType);
        this.segment = response.data;
        console.log('this.segment ',this.segment);
        this.getAreaSegmentPivot();
      },
      (err) => {
      }
    );
  }

  getCategories() {
    debugger;
    this.categorys = [];
    var query1 = '&SegmentName=' + this.urlType;
    this.ApiService.httpget(query1, '/AreaMaster/GetAllAreaSegmentPivotAsync').subscribe((data:any) => {
      console.log(data);
      if (data.isSuccess === true) {
        this.categorys = data.data;
      }
    });

    // this.ApiService.httpgetMaster("", "/AreaMaster/getAll").subscribe(
    //   (response: any) => {

    //     this.categorys = [];
    //     response.data.forEach((e:any) => {
    //       if (e.showInMenu) {
    //         this.categorys.push(e);
    //       }
    //     })
    //    // this.getSegment();
    //   },
    //   (err) => {
    //   }
    // );
  }
  getAreaPivot() {
    this.ApiService.httpgetMaster("", "/AreaProductPivot/getAll").subscribe(
      (response: any) => {
        this.areaPivot = [];
        response.data.forEach((e:any) => {
          if (this.areaSegmentPivot.find((f:any) => f.areaID == e.areaID)) {
            this.areaPivot.push(e);
          }
        })
        console.log('this.areaPivot ',this.areaPivot);
        this.getProducts();
      },
      (err) => {
      }
    );
  }

  getAreaSegmentPivot() {
    this.ApiService.httpgetMaster("", "/AreaSegmentPivot/getAll").subscribe(
      (response: any) => {
        this.areaSegmentPivot = response.data.filter((e:any) => e.segmentID == this.segment.id && e.areaID!=0);
        console.log('this.areaSegmentPivot ',this.areaSegmentPivot);
        this.getAreaPivot();
      },
      (err) => {
      }
    );
  }

  getProducts() {

    this.ApiService.httpgetMaster("", "/ProductCategories/getAll").subscribe(
      (response: any) => {
        this.category = [...new Set(response.data.filter((el:any) => {
          if (this.areaPivot.find((f:any) => f.productID == el.productId)) {
            return el;
          }
        }).map((e:any) => e.categoryId))];
        this.categorys = this.categorys.filter((e:any) => this.category.find((f:any) => f == e.id));
        console.log(this.categorys);
      });
  }

}
