import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss']
})
export class ManufacturingComponent {

  Products: any[] = [];
  constructor(private ApiService: ApiService, private router:Router,
    private CommonService:CommonService) { }

  ngOnInit(): void {
    this.getProductMaster();
  }


  getProductMaster() {
    var query1 = '&ApplicationAreaId=16';
    this.ApiService.httpget(query1, '/Product/getAllProductMasterByApplicationArea').subscribe((data:any) => {
      console.log(data);
      if (data.isSuccess === true) {
        this.Products = data.data;
      console.log(this.Products);

      }
    });
  }

}
