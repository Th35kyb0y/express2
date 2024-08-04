import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductSearchAPIPath } from '../product-search-api-path';


@Component({
  selector: 'app-search-tab-presentations',
  templateUrl: './search-tab-presentations.component.html',
  styleUrls: ['./search-tab-presentations.component.scss']
})
export class SearchTabPresentationsComponent implements OnInit,OnChanges {
  @Input() searchContent!: string;
  @Output() presentationsCount = new EventEmitter<number>();
  
  IsLoader:boolean = false;
  private _productsPresentations:any=[];
  constructor(private _router: Router, 
    
    private _activatedroute: ActivatedRoute,
    private ApiService: ApiService,){

    }



  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchContent){
      this.getSearchProduct(this.searchContent)
     
    }
  }
  ngOnInit(): void {
    this.presentationsCount.emit(this.ProductPresentations.length);
  }

  get ProductPresentations(){

    return this._productsPresentations;
  }
  getSearchProduct(value:any){
    value =  value.trim('');
    if(value){
 	  
     if(value.length>2){
      
       let se = value;
       let params = {
        searchContent:se,
        collectionId:ContentType.Presentation,
        flag:'',
      }
      
       this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsVideosBySearch)
       .subscribe((res:any) => {
        
         if (res != null) {
         
          this._productsPresentations = res.data;
          this.presentationsCount.emit(this.ProductPresentations.length);
		   
         
		
         }
       });
     }
 
    }
 
  }

}