import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Content, ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.scss']
})
export class RecommendProductComponent implements OnChanges,OnInit {
  @Input('Id') Id: any;
  collectins: any ;
  bannerBottom: any = [];
  product: any[] = [];

	imtUrl = ""
  constructor(private ApiService: ApiService, private router: Router,) { }

ngOnChanges(changes: SimpleChanges): void {
  this.imtUrl =  this.ApiService.getbaseURLEXP().replace('/api','/')
  if(this.Id){
    this.getRecommendData();
  }
}

public getChildren(event: any) {

  localStorage.removeItem('filterProduct');
  this.router.navigate(['./products',event.collectionName.replaceAll(" ", "-")], { queryParams: { catId: event.collectionId } });
}
ngOnInit(): void {

}

public GoFireExtinguisherDetail(product: any) {
  let nc = (product.name.replaceAll(" ", "-"))+"_"+product.code
  this.router.navigate(['/product-detail',nc], { queryParams: { prodId: product.collectionId, catId: btoa(product.collectionId) } });
  setTimeout(() => {
    window.location.reload();
  }, 100);

 
} 

  getRecommendData() {
    let Q = "&collectionId="+this.Id
    this.ApiService.httpgetMaster(Q, '/Collection/GetCollectionForRecommend').subscribe(
      (response: any) => {
        this.collectins = response.data;
        this.product = response.data; 


        console.log("TTTTTTTTTTTTTTT",this.product)

      },
      (err) => {
      }
    );
  }
}
