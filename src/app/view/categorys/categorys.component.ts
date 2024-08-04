import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {

  category:any = null;
  subcategories:any = [];
  categorySubscriber:any = null;

  constructor(private ApiService: ApiService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkIfParamChanges();
    
  }

  checkIfParamChanges(){
    this.categorySubscriber = this.route.params.subscribe((data) => {
      this.getCategories();
    });
  }

  getCategories() {
    
    const catid = Number(this.route.snapshot.paramMap.get('id'));

    if(catid>0){
      this.getCategoriesL2();
    }else{
      this.getCategoriesAll();
    }

  }

  getCategoriesL2() {

    const catname = this.route.snapshot.paramMap.get('categoryname');
    const catid = Number(this.route.snapshot.paramMap.get('id'));
    //this.category = response.data.find(e=> ApiService.toSnakeCase(e.name) == catname);
    this.ApiService.httpgetMaster("CategoryId3="+catid, "/Categories/getAllCategories3").subscribe(
      (response: any) => {

          response.data = response.data.map((e:any)=>({...e,subcat:{name:catname}}))

          this.subcategories = response.data;
          this.subcategories.reverse();
          this.subcategories = [...new Map(this.subcategories.map((item:any) => [item["name"], item])).values()];
          this.subcategories.reverse();
          console.log('this.subcategories',this.subcategories)
        
      },
      (err) => {
      }
    );
  }

  getCategoriesAll() {

    const catname = this.route.snapshot.paramMap.get('categoryname');
    const catid = Number(this.route.snapshot.paramMap.get('id'));

    this.ApiService.httpgetMaster("", "/Categories/getAll").subscribe(
      (response: any) => {
        this.category = response.data.find((e:any)=> ApiService.toSnakeCase(e.name) == catname);
        if(this.category){
          const categoriesL2 = response.data.filter((e:any)=> e.parentId === this.category.id);

          this.subcategories = response.data.filter((e:any)=> {
            const subcat = categoriesL2.find((f:any)=>f.id === e.parentId);
            if(subcat){
              return e.subcat = subcat;
            } 
          });

          this.subcategories.reverse();
          this.subcategories = [...new Map(this.subcategories.map((item:any) => [item["name"], item])).values()];
          this.subcategories.reverse();
          console.log('this.subcategories',this.subcategories)
        }
      },
      (err) => {
      }
    );
  }

  ngOnDestroy() { 
    this.categorySubscriber.unsubscribe()
  }
}
