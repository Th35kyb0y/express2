import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Content, ContentType, ProductDetails } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { ONResize_PlatformService } from 'src/app/services/onResize-platform.service';
import { ProductSearchAPIPath } from '../product-search-api-path';

@Component({
  selector: 'app-search-tab-products',
  templateUrl: './search-tab-products.component.html',
  styleUrls: ['./search-tab-products.component.scss']
})
export class SearchTabProductsComponent implements OnInit,OnChanges {
  @Input() searchContent: string='';
  @Output() productCount = new EventEmitter<number>();

	private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
	private _productFirstImage: string = '';
	public IsLoaderLazy = false;
  showLoaderBar: boolean = false;
  isProductsListBlank:boolean=false;
  collectionsId:string=''
  page = 1;
  pageSize = 15;
  public IsLoader: boolean = false;
  private _products: any = [];
  private _collections: any = [];
  private _collectionsList: any = [];
  constructor(private _router: Router,
    private _activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    private ApiService: ApiService,
    public ONResize_PlatformService:ONResize_PlatformService){

    }
    clearFilter(){
      this.collectionsId = "";
      this.getSearchProduct(this.searchContent)
     }
  ngOnChanges(changes: SimpleChanges): void {
  
    if(this.searchContent){
      this.getSearchProduct(this.searchContent)
      this.getCollections(this.searchContent)
    }
    
  }
  ngOnInit(): void {
    
  }

  get collections():any[]{
    return this._collections;
  }

  changePage(page: number): void {
    this.page = page;
  }
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  get totalPages(): number {
    return Math.ceil(this._products.length / this.pageSize);
  }
  get paginatedData() {
    const startIndex = (this.page - 1) * this.pageSize;
    return this._products.slice(startIndex, startIndex + this.pageSize);
  }
  
	openFilter(){
		
		// const modalRef = this.modalService.open(MobileProductFilterComponent, {
		// 	//size: "xl",
		// 	centered: true,
		// 	fullscreen: true,
		// 	windowClass: 'xlModal-100'
		// });
		// modalRef.componentInstance.collectionType = this.collectionType;
		// modalRef.componentInstance.collection = this.collection;
		// modalRef.componentInstance.applicationareas = this.applicationareas;
		// modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
		// 	debugger
		// 	if (receivedEntry) {
		// 	  if(receivedEntry.c.length>0 || receivedEntry.a.length>0){
		// 		this.collectionF =  receivedEntry.c;
		// 		this.collectionApplicationAreaF =  receivedEntry.a;
		// 		this.getLeftFilterApplicationCollections(this._collectionId);
		// 		this.filterProductList();
		// 	  }
		// 	}
	  
		//   })
		//  modalRef.result.then(
		//   (result) => {
			
		//   },
		//   (reason) => {
			
		//   }
		// );


		 

	  }

    hideDropdown(){
      setTimeout(() => {
        try{
          var x = (document.getElementById("sayt")) as HTMLElement;
          x.style.display = "block";
          }catch(e){}
      }, 3000);
    
    }
    filterProduct(cat:any){
	
      let f =  this._collectionsList.filter((x:any)=>x.collectionName==cat.collectionName);
      if(f.length>0){
        let ids="";
        for(let i=0;i<f.length;i++){
          ids =  ids + f[i].collectionId+",";
        }
        ids = ids.replace(/,\s*$/, "");
        this.collectionsId = ids;
        this.getSearchProduct(this.searchContent)
      }
      }
    getCollections(value:any){

      value =  value.trim('');
      if(value){
   
       if(value.length>2){
         let se = value;
        
         let params = {
          searchContent:se,
          collectionId:'',
          flag:'withoutspare',
        }
        
         this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsCollectionBySearch)
         .subscribe((result:any) => {
          debugger
          let res =  result.data;
           if (res != null) {
        const data =  res;
        this._collections  =[]
        this._collectionsList = data;
       
        res.forEach((element:any) => {
          let dataEsixt = this._collections.filter((item:any) => { return item.collectionName == element.collectionName });
          if (dataEsixt.length <= 0) {
            this._collections.push(element)
          }else{
            const index = this._collections.findIndex((obj:any) => obj.collectionName === element.collectionName);
            if (index !== -1) {
            
              let noOfProduct = this._collections[index].noOfProduct + element.noOfProduct;;
              this._collections[index].noOfProduct = noOfProduct;
              
              } 
          }
          });
          let noOfProduct =0;
          data.forEach((e:any) => {
            noOfProduct = noOfProduct + e.noOfProduct;
          });
  
          this.hideDropdown()
        }
             
         });
       }
   
      }
  
    }
    getSearchProduct(value:any){
      value =  value.trim('');
      if(value){
     this.IsLoader =  true;
       if(value.length>2){
         let se = value;
         let userName = "";
         let params = {
          searchContent:se,
          collectionId:this.collectionsId,
          flag:'withoutspare',
        }
        
         this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsBySearch)
         .subscribe((result:any) => {
          let res = result.data;
          
            if (res.length > 0) {
              res.forEach((item: any) => {
                item.addToCartText = 'Add To Cart'
                item.quantity = 0
      
              })
            }
        this._products = res;
        this.productCount.emit(this._products.length);
        this.IsLoader =  false;
        this.hideDropdown()
      
         });
       }
   
      }
   
    }


    
	public getProductFirstImageContent(contents: Content[]): string {
		const images = contents.filter(function (content: Content) {
			return content.contentTypeId === ContentType.Image && content.isMain == true;
		});

		if (images.length > 0) {
			this._productFirstImage = images[0].link;
		}
		else {
			this._productFirstImage = this._noProductImage;
		}

		return this._productFirstImage;
	}

}
