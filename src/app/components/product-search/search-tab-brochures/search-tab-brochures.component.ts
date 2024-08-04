import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductSearchAPIPath } from '../product-search-api-path';


@Component({
  selector: 'app-search-tab-brochures',
  templateUrl: './search-tab-brochures.component.html',
  styleUrls: ['./search-tab-brochures.component.scss']
})
export class SearchTabBrochuresComponent implements OnInit,OnChanges {
  @Input() searchContent!: string;
  @Output() BrochuresCount = new EventEmitter<number>();
  blogList:any=[];
  
  IsLoader:boolean = false;
  private _productsBrochures:any=[];
  constructor(private _router: Router,private ApiService: ApiService,
    private _activatedroute: ActivatedRoute){

    }



  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchContent){
      this.getSearchProduct(this.searchContent)
     
    }
  }
  ngOnInit(): void {
    this.BrochuresCount.emit(this.ProductBrochures.length);
  }

  get ProductBrochures(){

    return this._productsBrochures;
  }
  getSearchProduct(value:any){
    value =  value.trim('');
    if(value){
 
     if(value.length>2){
       let se = value;
       let params = {
        searchContent:se,
        collectionId:ContentType.Brochure,
        flag:'',
      }
      
       this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsVideosBySearch)
       .subscribe((res:any) => {
        
         if (res != null) {
         
          this._productsBrochures = res.data;
          this.BrochuresCount.emit(this.ProductBrochures.length);
		  
         
		
         }
       });
     }
 
    }
 
  }

}