import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';
import { restapiURL } from 'src/app/services/restapi-url';
@Component({
  selector: 'app-exp-types',
  templateUrl: './exp-types.component.html',
  styleUrls: ['./exp-types.component.scss']
})
export class ExpTypesComponent implements OnInit {

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

  public getChildren(event: any) {

    localStorage.removeItem('filterProduct');
    this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId } });
  }
  // public getChildren(event: any) {
    
  //   localStorage.removeItem('filterProduct');
  //   this.router.navigate(['./products'], { queryParams: { catId: event.id}});
  // }
  constructor(private route: ActivatedRoute, private ApiService: ApiService,private router:Router,) { }

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
    debugger;
    this.ApiService.httpgetMaster("", "/ExpTypes/getAll").subscribe(
      (response: any) => {
        this.expTypesList = response.data.map((e:any) => ({ ...e }));
        this.typeObj = this.urlTypes[this.urlType];
        this.expTypesObj = this.expTypesList.filter((e:any) => e.typeId == this.typeObj.id);
        console.log(this.typeObj);
        if (this.typeObj.id == 1) {
          //this.getCategories();
          this.getCollection();
        } else if (this.typeObj.id == 2) {
          this.getAreaPivot();
        } else if (this.typeObj.id == 3) {
          this.getSegments();
        }

        if (!this.expTypesObj) {
          this.ApiService.gotoURL('/');
        }
      },
      (err) => {
      }
    );
  }

  getCollection() {

    this.ApiService.httpgetMaster("", CSRestAPIPath.GetCollectionForDashBoard).subscribe(
      (response: any) => {

        response.data.forEach((e:any) => {
          if(!e.name){
            e.name =  e.collectionName;
          }
          if(e.imagePath){
            e.imagePath =  this.ApiService.getbaseURLEXP().replace('/api','/')+""+e.imagePath
          }
          
        });
        this.category =  response.data;
      },
      (err) => {
      }
    );
  }
  getCategories() {
    debugger;
    // const typeId = this.urlTypes[this.urlType];
    // this.ApiService.httpgetMaster("", "/Categories/getAll").subscribe(
    //   (response: any) => {
    //     this.category = response.data.filter((e:any) => e.parentId == 0);
    //   },
    //   (err) => {
    //   }
    // );

  }
  getSegments() {
    debugger;
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
    debugger;
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
  getAreaPivot() {
    const typeId = this.urlTypes[this.urlType];
    this.ApiService.httpgetMaster("", "/AreaProductPivot/getAll").subscribe(
      (response: any) => {
        this.areaPivot = response.data;
        console.log('this.areaPivot',this.areaPivot)
        this.getArea();
      },
      (err) => {
      }
    );
  }
}
