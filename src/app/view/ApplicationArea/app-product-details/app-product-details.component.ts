import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { CategoryResponseModel } from '../../models/CategoryResponse';
import { ONResize_PlatformService } from 'src/app/services/onResize-platform.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileProductFilterComponent } from 'src/app/model-popups/mobile-product-filter/mobile-product-filter.component';

@Component({
  selector: 'app-app-product-details',
  templateUrl: './app-product-details.component.html',
  styleUrls: ['./app-product-details.component.scss']
})
export class AppProductDetailsComponent implements OnInit, OnChanges {
  @ViewChild('productElement', { static: false })
  public productElement: ElementRef | undefined;
  Products: any[] = [];
  LinkedCollection: any[] = [];
  LinkedCollectionType: any[] = [];
  private collectionApplicationAreaF: any[] = [];
  ProductsAllData: any[] = [];
  ProductsAllDataForLoop: any[] = [];
  CategoriesList: any[] = [];
  @Input() ApplicationAreaId: any;
  objCatList: CategoryResponseModel[] = [];
  objCategory1List: CategoryResponseModel[] = [];
  objCategory3List: CategoryResponseModel[] = [];
  constructor(private ApiService: ApiService, private router: Router,
    private CommonService: CommonService,
    private modalService: NgbModal,
  public onResize_PlatformService:ONResize_PlatformService) { }

    ngOnChanges(changes: SimpleChanges): void {

    }
  ngOnInit(): void {
    this.objCatList = [];
    this.objCategory1List = [];
    this.objCategory3List = [];
    this.ProductsAllData = [];
    //this.BindCategories();
    this.BindApplicationCollection();
    this.getProductMaster();
    this.getProductPageHeader()
  } 
  openFilter(){
		
		const modalRef = this.modalService.open(MobileProductFilterComponent, {
			//size: "xl",
			centered: true,
			fullscreen: true,
			windowClass: 'xlModal-100'
		});
		modalRef.componentInstance.collectionType = this.LinkedCollectionType;
		modalRef.componentInstance.collection = this.LinkedCollection;
		modalRef.componentInstance.applicationareas = [];
		modalRef.componentInstance.fromApplication = true;
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
			
			if (receivedEntry) {
			  if(receivedEntry.c.length>0 || receivedEntry.a.length>0){
				this.collectionApplicationAreaF =  receivedEntry.c;
				//this.collectionApplicationAreaF =  receivedEntry.a;
				this.getProductMaster();

			  }
			}
	  
		  })
		 modalRef.result.then(
		  (result) => {
			
		  },
		  (reason) => {
			
		  }
		);


		 

	  }

  getProductMaster() {

let collectionFilterIds: string | null  =  this.collectionApplicationAreaF.join(',');
if(!collectionFilterIds){
  collectionFilterIds =  null;
}
let ApplicationAreaId =  this.ApplicationAreaId+''
    var query1 = '&ApplicationAreaId=' + ApplicationAreaId+'&collectionFilterIds='+collectionFilterIds
    this.ApiService.httpget(query1, '/Product/getProductMasterByApplicationAreaWithCollection').subscribe((data: any) => {
      console.log(data);
      if (data.isSuccess === true) {
        data.data.forEach((item: any) => {
          item.addToCartText = 'Add To Cart'
          item.quantity = 0

        })
        this.Products = data.data;
        this.ProductsAllData = data.data;
        // this.Products.forEach(item => {
        //   let count = this.CategoriesList.filter((x: { TechnicalSpec: string; }) => x.TechnicalSpec == item.TechnicalSpec).length
        //   if (count == 0) {
        //     this.CategoriesList.push(item)
        //   }
        // })
        //this.BindCategories();
      }
    });
    return
    var query1 = '&ApplicationAreaId=' + this.ApplicationAreaId;
    this.ApiService.httpget(query1, '/Product/getAllProductMasterByApplicationArea').subscribe((data: any) => {
      console.log(data);
      if (data.isSuccess === true) {
        data.data.forEach((item: any) => {
          item.addToCartText = 'Add To Cart'
          item.quantity = 0

        })
        this.Products = data.data;
        this.ProductsAllData = data.data;
        // this.Products.forEach(item => {
        //   let count = this.CategoriesList.filter((x: { TechnicalSpec: string; }) => x.TechnicalSpec == item.TechnicalSpec).length
        //   if (count == 0) {
        //     this.CategoriesList.push(item)
        //   }
        // })
        this.BindCategories();
      }
    });
  }

  BindApplicationCollection() {
    let Q= "&Id="+this.ApplicationAreaId
		this.ApiService.httpget(Q,'/Collection/WebGetCollectionApplicationArea').subscribe((res:any)=>{

      res.data.forEach((e:any)=>{

        e.isSelected =  false;
        let f =  this.collectionApplicationAreaF.filter((x=>x==e.collectionId))
        if(f.length>0){
          e.isSelected =  true;
        }
      })
      this.LinkedCollection =  res.data.filter((x:any)=>x.showOnType==false);
      this.LinkedCollectionType =   res.data.filter((x:any)=>x.showOnType==true);

    })
  }
  BindCategories() {

    var query1 = '&AreaId=' + this.ApplicationAreaId;
    this.ApiService.httpget(query1, '/Categories/getCategoriesForApplicationArea').subscribe((data: any) => {
      console.log(data);
      if (data.isSuccess === true) {
        ;
        this.objCatList = data.data;
        console.log(this.objCatList);
        this.objCatList.map(item => {
          let count = this.objCategory3List.filter(x => x.cat3Name == item.cat3Name).length
          if (count == 0) {
            this.objCategory3List.push(item)
          }
        })
        this.objCatList.map(item => {
          let count = this.objCategory1List.filter(x => x.cat1Name == item.cat1Name).length
          if (count == 0) {
            this.objCategory1List.push(item)
          }
        })

        // this.Products = data.data;
        // this.Products.forEach(item => {
        //   let count = this.CategoriesList.filter((x: { TechnicalSpec: string; }) => x.TechnicalSpec == item.TechnicalSpec).length
        //   if (count == 0) {

        //     ;
        //     this.CategoriesList.push(item)
        //   }
        // })
      }
    });

    let Q= "&Id="+this.ApplicationAreaId
		this.ApiService.httpget(Q,'/Collection/WebGetCollectionApplicationArea').subscribe((res:any)=>{

      res.data.forEach((e:any)=>{

        e.isSelected =  false;
        let f =  this.collectionApplicationAreaF.filter((x=>x==e.collectionId))
        if(f.length>0){
          e.isSelected =  true;
        }
      })
      this.LinkedCollection =  res.data;

    })
  }
  filterCollectionProduct(e: any, applicationAreaId: number, item: any) {

		if (e.target.checked) {
			this.collectionApplicationAreaF.push(applicationAreaId);


		} else {

			const index: number = this.collectionApplicationAreaF.indexOf(applicationAreaId);
			if (index !== -1) {
				this.collectionApplicationAreaF.splice(index, 1);
			}
		}


		this.getProductMaster();
	}

  goCQRS() {
    this.router.navigateByUrl('/StartInput;id=2')
    //this.router.navigate(['/StartInput'], { queryParams: { id: 2} });

  }
  public GoToroductDetail(product: any) {
    console.log(product);
    let nc = (product.name.replaceAll(" ", "-"))+"_"+product.code
    this.router.navigate(['/product-detail',nc], { queryParams: { prodId: product.id, catId: btoa(product.categoryId) } });

  }

  filterCategory1(e: any, id: string, name: string) {
    this.Products = [];
    if (e.target.checked) {
      this.ProductsAllData.forEach(item => {
        let count = this.Products.filter((x: { Cat1Id: number; }) => x.Cat1Id == Number(id)).length
        if (count == 0) {
          this.Products.push(item)
        }
      })
    }
    else
    {
      this.getProductMaster()
    }

  }

  filterCategory3(e: any, id: string, name: string) {
    ;
    this.Products = [];
    if (e.target.checked) {
      ;
      this.ProductsAllDataForLoop = this.ProductsAllData.filter(item => Number(item.cat3Id) == Number(id));
      this.Products=this.ProductsAllDataForLoop;
      // this.ProductsAllDataForLoop.forEach(item => {
      //   let count = this.Products.filter((x: { cat3Id: number; }) => x.cat3Id == Number(id)).length
      //   if (count == 0) {
      //     this.Products.push(item)
      //   }
      // })
    }
    else
    {
      this.getProductMaster()
    }

  }








  name:any
  getProductPageHeader() {
    const query=''
    // this.apiService.getHttps('BannerBottom/getProductPageHeader', '').subscribe({
      this.ApiService.httpget(query,'/BannerBottom/getProductPageHeader').subscribe({
        next: (res: any) => {
            console.log('TTTTT', res);
            if (res.statusCode == 200) {
                const data = res?.data;
                 const header =data.filter((m:any)=>m.areaId==this.ApplicationAreaId)
                 this.name=header[0]?.header
                 console.log('oooooooo',this.name,header)
            } else {
                console.log('Something Wrong');
            }
        },
        error: (err: any) => {
            console.log('Server Error');
        },
    });
}


}
