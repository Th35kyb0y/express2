import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-i-need-to-protect-a-risk',
  templateUrl: './i-need-to-protect-a-risk.component.html',
  styleUrls: ['./i-need-to-protect-a-risk.component.scss']
})
export class INeedToProtectARiskComponent implements OnInit {

  urlType:any = "";
  category:any = [];
  categorys:any = [];
  area:any = null;
  areaPivot = [];
  categorySubscriber:any = null;

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { 
    this.checkIfParamChanges();
  }

  ngOnInit(): void {
    this.checkIfParamChanges();
  }

  checkIfParamChanges() {
    debugger;
    this.categorySubscriber = this.route.params.subscribe((data) => {
      this.urlType = this.route.snapshot.paramMap.get('itemname');
      this.getCategories();
    });
  }

  getArea() {
    this.ApiService.httpgetMaster("", "/AreaMaster/getAll").subscribe(
      (response: any) => {
        response.data = response.data.find((e:any) => ApiService.toSnakeCase(e.title) == this.urlType);
        this.area = response.data;
        console.log(this.area);
        this.getAreaPivot();
      },
      (err) => {
      }
    );
  }

  getCategories() {
    this.ApiService.httpgetMaster("", "/Categories/getAll").subscribe(
      (response: any) => {
        this.categorys = response.data;
        this.getArea();
      },
      (err) => {
      }
    );
  }
  getAreaPivot() {
    this.ApiService.httpgetMaster("", "/AreaProductPivot/getAll").subscribe(
      (response: any) => {
        this.areaPivot = response.data.filter((e:any) => e.areaID == this.area.id);
        console.log(this.areaPivot);
        this.getProducts();
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
        console.log(this.categorys)
      });
  }
}

