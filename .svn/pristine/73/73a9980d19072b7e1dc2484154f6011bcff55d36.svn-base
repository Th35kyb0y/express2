import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-segment-detail',
  templateUrl: './segment-detail.component.html',
  styleUrls: ['./segment-detail.component.scss']
})
export class SegmentDetailComponent implements OnInit {

  category:any = null;
  subcategories:any = [];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {

    // const catname = this.ApiService.getParam('categoryname');
    // console.log(catname);
    // this.ApiService.httpgetMaster("", "/Categories/getAll").subscribe(
    //   (response: any) => {
    //     this.category = response.data.find(e=> ApiService.toSnakeCase(e.name) == catname);
    //     console.log(this.category);
    //     if(this.category){
    //       this.subcategories = response.data.filter(e=> e.parentId === this.category.id);
    //     }
    //   },
    //   (err) => {
    //   }
    // );
  }
}

