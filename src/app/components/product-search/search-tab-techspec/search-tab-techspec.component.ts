import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductSearchAPIPath } from '../product-search-api-path';

@Component({
  selector: 'app-search-tab-techspec',
  templateUrl: './search-tab-techspec.component.html',
  styleUrls: ['./search-tab-techspec.component.scss']
})
export class SearchTabTechspecComponent implements OnInit,OnChanges {
  @Input() searchContent!: string;
  @Output() TechspecCount = new EventEmitter<number>();
  
  IsLoader:boolean = false;
  private _productsTechspec:any=[];
  constructor(private _router: Router,
    private ApiService: ApiService,
    private _activatedroute: ActivatedRoute){

    }



  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchContent){
      this.getSearchProduct(this.searchContent)
     
    }
  }
  ngOnInit(): void {
    this.TechspecCount.emit(this.ProductTechSpec.length);
  }

  get ProductTechSpec(){

    return this._productsTechspec;
  }
  getSearchProduct(value:any){
    value =  value.trim('');
    if(value){
 	  
     if(value.length>2){
       let se = value;
       let params = {
        searchContent:se,
        collectionId:ContentType.TechnicalSpecifications,
        flag:'',
      }
      
       this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsVideosBySearch)
       .subscribe((res:any) => {
        
         if (res != null) {
         
          this._productsTechspec = res.data;
          this.TechspecCount.emit(this.ProductTechSpec.length);
		   
         
		
         }
       });
     }
 
    }
 
  }

}