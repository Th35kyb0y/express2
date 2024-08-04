import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { restapiURL } from 'src/app/services/restapi-url';
@Component({
  selector: 'app-riskareaproduction',
  templateUrl: './riskareaproduction.component.html',
  styleUrls: ['./riskareaproduction.component.scss']
})
export class RiskareaproductionComponent {

  category:any = null;
  areaPivot:any = null;
  expTypesList:any = [];
  expTypesObj:any = null;
  typeObj:any = null;
  urlType:any = "";
  urlTypes:any = {
    "i-am-clear-what-i-need": {
      id: 1,
      select_txt1: "Product Category",
      select_txt2: "for"
    },
    "i-need-to-protect-a-risk": {
      id: 2,
      select_txt1: "Area",
      select_txt2: "to protect"
    },
    "i-need-to-protect-my-premises": {
      id: 3,
      select_txt1: "Premises",
      select_txt2: "to protect"
    },
  }

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.urlType = this.route.snapshot.paramMap.get('urlType');
    this.getExpTypes();
  }

  gotoCategoryDetail(item:any) {
    let catName = '';
    if (this.typeObj.id == 1) {
      catName = `/category/` + ApiService.toSnakeCase(item.name);
    } else if (this.typeObj.id == 2) {
      catName = `/exp-type/i-need-to-protect-a-risk/${ApiService.toSnakeCase(item.name)}/shop`;
      //catName = ApiService.toSnakeCase(item.name);
    } else if (this.typeObj.id == 3) {
      //catName = ApiService.toSnakeCase(item.name);
      catName = `/exp-type/i-need-to-protect-my-premises-Details/${ApiService.toSnakeCase(item.name)}/shop`;
    }

    return catName;//this.ApiService.gotoURL(`/category/${catName}`)
  }

  getExpTypes() {
    this.ApiService.httpgetMaster("", "/ExpTypes/getAll").subscribe(
      (response: any) => {
        this.expTypesList = response.data.map((e:any) => ({ ...e }));
        this.typeObj = this.urlTypes[this.urlType];
        this.expTypesObj = this.expTypesList.filter((e:any) => e.typeId == this.typeObj.id);
        console.log(this.typeObj);
      }
    );
  }


  getSegments() {
    const typeId = this.urlTypes[this.urlType];
    this.ApiService.httpgetMaster("", "/SegmentMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.map((e:any) => ({ ...e, name: e.title }))
        this.category = response.data;
      },
      (err) => {
      }
    );
  }
  getArea() {
    const typeId = this.urlTypes[this.urlType];
    this.ApiService.httpgetMaster("", "/AreaMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.map((e:any) => ({ ...e, name: e.title }))
        this.category = response.data;
        console.log('this.category',this.category)
      },
      (err) => {
      }
    );
  }
 

}
