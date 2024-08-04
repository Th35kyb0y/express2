import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-i-need-to-protect-my-premises-aarea',
  templateUrl: './i-need-to-protect-my-premises-aarea.component.html',
  styleUrls: ['./i-need-to-protect-my-premises-aarea.component.scss']
})
export class INeedToProtectMyPremisesAareaComponent {
  urlType: any = "";
  segment: any = null;
  category: any = [];
  categorys: any = [];
  areaPivot: any = [];
  areaSegmentPivot: any = [];
  categorySubscriber: any = null;
  // category:any = null;
  // areaPivot:any = null;
  expTypesList: any = [];
  expTypesObj: any = null;
  typeObj: any = null;
  //urlType:any = "";
  urlTypes: any = {
    
    "i-need-to-protect-my-premises-Details": {
      id: 2,
      select_txt1: "Area",
      select_txt2: "to protect"
    }
  }

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.checkIfParamChanges();
    this.getExpTypes();

  }
  getExpTypes() {
    debugger;

    var query1 = '';
    this.ApiService.httpget(query1, '/ExpTypes/GetAll').subscribe((response: any) => {
      debugger;

      if (response.isSuccess === true) {
        this.expTypesList = response.data.map((e: any) => ({ ...e }));
        this.typeObj = this.urlTypes[this.urlType];
        this.expTypesObj = this.expTypesList.filter((e: any) => e.typeId == 2);
        this.getCategories();
        // if (!this.expTypesObj) {
        //   this.ApiService.gotoURL('/');
        // }
      }
    });


  }

  gotoCategoryDetail(item: any) {
    let catName = '';
    catName = `/exp-type/i-need-to-protect-my-premises-Details/${ApiService.toSnakeCase(item.name)}/shop`;
    return catName;
  }
  checkIfParamChanges() {
    this.categorySubscriber = this.route.params.subscribe((data) => {
      this.urlType = this.route.snapshot.paramMap.get('itemname');
    });
  }

  getSegment() {
    this.ApiService.httpgetMaster("", "/SegmentMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.find((e: any) => ApiService.toSnakeCase(e.title) == this.urlType);
        this.segment = response.data;
        console.log('this.segment ', this.segment);
      },
      (err) => {
      }
    );
  }

  getCategories() {
    debugger;
    this.categorys = [];
    var query1 = '&SegmentName=' + this.urlType;
    this.ApiService.httpget(query1, '/AreaMaster/GetAllAreaSegmentPivotAsync').subscribe((data: any) => {
      console.log(data);
      if (data.isSuccess === true) {
        this.categorys = data.data;
      }
      this.getSegment();
    });

  }


}
