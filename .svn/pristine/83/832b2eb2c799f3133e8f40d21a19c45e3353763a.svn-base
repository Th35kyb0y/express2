import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { restapiURL } from 'src/app/services/restapi-url';
import { orderBy } from 'lodash';
import { CommonService } from 'src/app/services/common.service';
import { Category } from 'src/app/models/category/category';

import { Content, ContentType, DiscountType, ProductDetails } from 'src/app/models/product/product';
import { ProductAPIPath } from 'src/app/view/products/product-api-path';
import { AddBoqEntity } from 'src/app/models/proposal/cqrs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { ApplicationAreas, Collection } from 'src/app/models/collection/collection';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';

@Component({
  selector: 'app-fire-extinguisher',
  templateUrl: './fire-extinguisher.component.html',
  styleUrls: ['./fire-extinguisher.component.scss']
})
export class FireExtinguisherComponent {
  private modalService = inject(NgbModal);
  @Input() ProspectCode:string ="";
  @Input() IID:number=0;
  showMainCategory:boolean=true;
  showProduct:boolean=false;
  showProposal:boolean=false;
  objBoqList:any=[];
  objAddBoqEntity: AddBoqEntity = new AddBoqEntity();

  @ViewChild('productElement', { static: false })
  public productElement: ElementRef | undefined;
  private _collections: any[] = [];
  private _applicationareas: any[] = [];
  private _collectionsFilter: any[] = [];
  private collectionF:any[]=[];
  private collectionApplicationAreaF:any[]=[];
  
  productContents: any[] = [];

  private _products: any = [];
  public totalCount:any = 0;
  public pageIndex = 1;
  public pageSize = 15;

  public _collectionId: number = 0;

  _searchContent:string=''
  public noOfProForInStock = 0;
  public IsLoaderLazy = false;
  public callOneByOne = 0;
  
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  private _productFirstImage: string = '';
  showLoaderBar: boolean = false;
	flag: string='Insert';
  @HostListener('window:scroll') onScroll(e: Event): void {
    this.onScrollLoadProduct(e);
  }

  collectins: any = [];
  imtUrl = "";
  editFE:boolean=false;
  constructor(private ApiService: ApiService,
     public route: ActivatedRoute, 
	 private router:Router,
     private CommonService: CommonService) { 
		this.route.params.subscribe(params => {
			if(params['flag']!=undefined)
			{
				this.flag=params['flag'];
			}
			
			if(params['proposalType']!=undefined)
			{
				
				this.editFE=true;

			}

	  
		  });
	  


     }





     onScrollLoadProduct(e:any){
		const nativeElement = this.productElement?.nativeElement;
		const container = this.productElement?.nativeElement;
		const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
	
		console.log(Math.round(document.documentElement.scrollTop) + 450 >= nativeElement.scrollHeight);
		if (nativeElement != null && Math.round(document.documentElement.scrollTop) + 450 >= nativeElement.scrollHeight && this._products.length !== this.totalCount && this.callOneByOne == 0) {
		  console.log('Imran')
		  this.IsLoaderLazy = true;
		  this.callOneByOne = 2000;
		  this.pageIndex += 1;
		  //this.getLazyProducts(this.pageIndex, this.pageSize);
		  this.getProducts(Number(this._collectionId),false);
		 
		}
  
	   }
  
	   private getProducts(collectionId: number,isLoadAllApplicationArea: boolean) {
		  debugger
		  this.showLoaderBar =  true;
		  
		   let searchString = "";
		   if (this._searchContent != '' && this._searchContent != undefined) {
			 searchString = this._searchContent;
		   }
	   
	   
	   
		   let params = {
			  //  userName:'',
				  collectionId:collectionId+'',
				  searchString:searchString,
				  collectionFilterIds:this.collectionF.join(','),
			  //  categoriesSecondOnly:categoriesSecondOnly,
			  //  categoriesThirdDistinctOnly:categoriesThirdDistinctOnly,
			  //  categoriesSpareOnly:categoriesSpareOnly,
				  appArea:this.collectionApplicationAreaF.join(','),
			  //  ratings:ratings,
			  //  productCertificate:certificateF,
			  //  productWarranty:warrantyF,
			   page:this.pageIndex,
			   size:this.pageSize,
			 }
			 
			
			
			 
			 this.ApiService.httpost(params, ProductAPIPath.getProductsByCollection).subscribe((result:any) => {
			   debugger
			   this.showLoaderBar =  false;
			   let res =  result.data;
			   if(res.length==0){
				  this.callOneByOne = 2000;
				  this.IsLoaderLazy = false;
			  }
			  
			  if (res.length>0) {
				  res.forEach((item:any) => {
				  item.addToCartText = 'Add To Proposal'
				  item.quantity = 0
			  
				  })
				  this._products=[];
				  this._products   = this._products .concat(res);
				  if(res.length>0){
				  
				  this.totalCount =  res[0].totalCount
			  
				  if(this.totalCount==this._products.length){ 
					  this.callOneByOne = 2000;
					  this.IsLoaderLazy = false;
				  }else{
					  this.callOneByOne = 0;
					  this.IsLoaderLazy = false;
				  }
			  
				  }
				  else{
					  this.callOneByOne = 2000;
					  this.IsLoaderLazy = false;
				  }
			  
			}
  
			 });
		  
		   
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


	




  ngOnInit(): void {
	if(this.editFE==true)
	{
		this.showMainCategory=false;
		this.showProduct=false;
		this.showProposal=true;
		this.getBOQList();
	}
	this.imtUrl =  this.ApiService.getbaseURLEXP().replace('/api','/')
    this.getCollection();


  }

  getCollection() {

    this.ApiService.httpgetMaster("", CSRestAPIPath.GetCollectionForDashBoard).subscribe(
      (response: any) => {
        this.collectins = response.data;
      },
      (err) => {
      }
    );
  }

  public getChildren(event: any) {
    debugger
	this._collectionId=event.collectionId;
	this.showProduct=true;
	this.showMainCategory=false;
	this.showProposal=false;

	 this.getLeftFilterCollections(event.collectionId);
	// window.scrollTo({ top: 0 });
    // this.getBOQList();
	 this.bindLocalStorage();

    // localStorage.removeItem('filterProduct');
    //this.router.navigate(['./products'], { queryParams: { catId: event.collectionId } });
  }


  filterCollections(e: any, id: number, name: string) {
	debugger
	if (e.target.checked) {
		this.collectionF.push(id);
	  this._collections.forEach(element => {
		if(element.collectionId==id){
			element.isSelected = true;
		}
	  });

	} 
	else {
		this._collections.forEach(element => {
			if(element.collectionId==id){
				element.isSelected = false;
				const index: number = this.collectionF.indexOf(element.collectionId);
				if (index !== -1) {
				this.collectionF.splice(index, 1);
				}

			}
		  });
	
		 

	}

	if(this.collectionApplicationAreaF.length>0){
		this.collectionApplicationAreaF=[];
		this._applicationareas.forEach((x=>{
			x.isSelected = false;
		}))
		this.getLeftFilterCollections(this._collectionId);
	  }

 // End 
  this.filterProductList();
  }

  private async bindLocalStorage() {
	
    if (localStorage.getItem('filterProduct')) {
      let lStorageData = localStorage.getItem('filterProduct');
      let filterProduct = JSON.parse(lStorageData != null ? lStorageData : "");
      if (filterProduct != "") {
        // this.stockF = filterProduct.stockF;
        	this.collectionF = filterProduct.collectionF;
        // this.categorySecondF = filterProduct.categorySecondF;
        // this.certificateF = filterProduct.certificateF;
        this.collectionApplicationAreaF = filterProduct.collectionApplicationAreaF;
        // this.ratingsF = filterProduct.ratingsF;
        // this.warrantyF = filterProduct.warrantyF;
        // this.categorySpareF = filterProduct.categorySpareF;
		
      }
    }
	// Code by Imran
	this.pageIndex=0;
	if(this._collectionId){
		 
		let isClear:boolean= false
		try{
			let lStorageData = localStorage.getItem('filterProduct') ;
			let filterProduct = JSON.parse(lStorageData != null ? lStorageData : "");
			if (filterProduct != ""){
				let _collectionId = filterProduct._collectionId;
				if(this._collectionId!=_collectionId){
					isClear = true
				}
			}else{
				isClear= false
			}
		}catch(e){
			isClear= false
		}
		if(isClear){
			localStorage.removeItem('filterProduct');
		
		}
		
		this.getProducts(Number(this._collectionId),false);
	}
	else{
		this.getProducts(Number(this._collectionId),false);
	}
	 
  }


  
	get collection(): Collection[] {
		return this._collections;
	}
  
	get applicationareas(): ApplicationAreas[] {
		return this._applicationareas;
	}

  get products(): ProductDetails[] {
    return this._products;
  }


  	setCollections(res:any){
		res.forEach((e:any) => {
			e.isSelected = this.collectionF.filter(item => {
			return item == e.collectionId
			}).length > 0 ? true : false;
			//e.isSelected =  false;
		});
		this._collections= res;
    }
  	setApplicationAreaCollections(res:any){
		res.forEach((e:any) => {
			e.isSelected = this.collectionApplicationAreaF.filter(item => {
			return item == e.applicationAreaId
			}).length > 0 ? true : false;
			//e.isSelected =  false;
		});
		this._applicationareas= res;
    }





	filterProductList() {

		this.pageIndex=0;
		this._products =[];
		this.createLocalStorageForFilter();
		this.getProducts(Number(this._collectionId),false);
	  }

	  private createLocalStorageForFilter() {
		let filterProduct = {
		 collectionF: this.collectionF,
		 collectionApplicationAreaF: this.collectionApplicationAreaF,
		  _collectionId:this._collectionId
		}
		localStorage.setItem('filterProduct', JSON.stringify(filterProduct));
	  }
    getLeftFilterCollections(collectionId: number) {
      
      let Q='&collectionId='+collectionId
      this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilter).subscribe(
        (response: any) => {
			debugger
			
          //this.categories = response.data;
          this.setCollections(response.data);
        },
        (err) => {
        }
      );

	  this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetApplicationAreaCollectionForLeftFilter).subscribe(
        (response: any) => {
			debugger
			
          //this.categories = response.data;
          this.setApplicationAreaCollections(response.data);
        },
        (err) => {
        }
      );


    }



	filterAppArea(e: any, id: number,applicationAreaId:any) {
		debugger
		if (e.target.checked) {
		  this.collectionApplicationAreaF.push(applicationAreaId);
		  this._applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
			x.isSelected = true;
		  });
		  
		} else {
		  this._applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
			x.isSelected = false;
		  });
		  const index: number = this.collectionApplicationAreaF.indexOf(id);
		  if (index !== -1) {
			this.collectionApplicationAreaF.splice(index, 1);
		  }
		}
	
		 this.collectionF = [];

		 this._collections.forEach(element => {
			element.isSelected = false;
		});

		let filter = this._applicationareas.filter((x=>x.isSelected==true));
		if(filter.length>0){
			filter.forEach(e=>{
				if(e.children.length>0){
					let c= e.children[0];
					let collectonF =  this._collections.filter(x=>x.collectionId == c.collectionId);
					if(collectonF.length>0){
						this.collectionF.push(c.collectionId);
						var elementPos = this._collections.map((x)=> {return x.collectionId; }).indexOf(c.collectionId);
						this._collections[elementPos].noOfProduct =  c.noOfProduct;
						this._collections[elementPos].isSelected =  true;
					}else{
						c.isSelected =  true;
						this.collectionF.push(c.collectionId)
						this._collections.push(c);
					}
				}
			})
		}
	   this.filterProductList();
	  }
  clearfilter(redirect=true){
    this.collectionApplicationAreaF =[];
	this.collectionF = [];

	this._collections.forEach(element => {
	   element.isSelected = false;
   });
   this._applicationareas.forEach(element => {
	   element.isSelected = false;
   });
   this.filterProductList();
  }
    













    getBOQList()
    {
      this.ApiService.httpgetMaster("&ProposalCode="+this.ProspectCode+"&ProductId=11&IID="+this.IID+"", "/Proposal/getBOQList").subscribe(
        (response: any) => {
          console.log(response.data);
          this.objBoqList=response.data;
        },
        (err) => {
        }
      );
    }

	  public addtoProposal(product: ProductDetails, showMessage = true as boolean) {
      if(product.addToCartText=='Add To Proposal')
      {
        if (product.quantity == 0) {
          product.quantity = product.quantity + 1;
        }
        console.log(product)
    
        this.objAddBoqEntity.productCode=product.code;
        this.objAddBoqEntity.productName = product.name;
        this.objAddBoqEntity.productDesc = product.description;
        this.objAddBoqEntity.qty = product.quantity;
        this.objAddBoqEntity.productPrice = product.price;
        this.objAddBoqEntity.productImage=this.getProductFirstImageContent(product.contents);
        this.objAddBoqEntity.flag='Insert';
        this.objAddBoqEntity.status='Pending';
        this.objAddBoqEntity.prospectCode=this.ProspectCode;
        this.objAddBoqEntity.iid=this.IID;
        this.objAddBoqEntity.productId=11;
        this.objAddBoqEntity.createdBy=this.ApiService.getUserId()!.toString();
        // this.objAddBoqEntity.unit = product.quantity;
        // this.objAddBoqEntity.gst=product.gst;
        this.objAddBoqEntity.productType='Standalone';
    
    
        this.ApiService.httpost(this.objAddBoqEntity,'/Proposal/saveUpdateDeleteBOQ')
        .subscribe((res:any)=>{
          console.log(res);
          product.addToCartText = "View Proposal";
          this.getBOQList();
    
        },(error=>{
    
        }))
      }
      else
      {
        this.showProduct=false;
        this.showMainCategory=false;
        this.showProposal=true;
      }


		// if (product.goToCart == true) {
		//   this._router.navigate(['./MyCart']);
		// } else {
		//   this.IsLoader = true;
		//   this._cartReq.productId = product.id;
		//   this._cartReq.quantity = product.quantity;
		  //this._cartService.addItemToCart(this._cartReq).subscribe((res) => {
		// 	if (res) {
		// 	  this.IsLoader = false;
		// 	  product.addToCartText = "Go to Cart";
		// 	  product.goToCart = true;
		// 	  this._cartService.updateHeaderCart();
			  
		// 	}
		//   },
		// 	error => {
		// 	  this.IsLoader = false;
		// 	  console.log(error);
		// 	});
		// }
	  }

	  public subQuantity(product: ProductDetails,) {
		//product.goToCart = false;
		if (product.quantity > 0) {
		  product.quantity = product.quantity - 1;
		}
		if (product.quantity == 0) {
		  product.addToCartText = "Add To Proposal";
		 // this.deleteItemFromCart(product)
		} else {
		  //this.addtocart(product, false);
		}
	  }


	  public addQuantity(product: ProductDetails,) {
		product.quantity = product.quantity + 1;

		// product.goToCart = false;
		// this.addtocart(product, false);
	  }


  backClicked(e:number)
  {
    if(e==1)
    {
      this.showMainCategory=true;
      this.showProduct=false;
      this.showProposal=false;
    }
    else if(e==2)
    {
      this.showMainCategory=false;
      this.showProduct=true;
      this.showProposal=false;
    }
    else if(e==e)
    {
      this.showMainCategory=false;
      this.showProduct=false;
      this.showProposal=true;
    }
  }

  ProductDelete(items:any) {
    if (confirm('Are you sure, Do you want to delete this product?')) {
      this.objAddBoqEntity = new AddBoqEntity();
      this.objAddBoqEntity = items;
      this.objAddBoqEntity.flag = 'Delete';
      this.ApiService.httpost(this.objAddBoqEntity,'/Proposal/saveUpdateDeleteBOQ')
      .subscribe((res:any)=>{
        if(res.statusCode==200)
        {
          console.log(res);
          this.objAddBoqEntity = new AddBoqEntity();
          this.getBOQList();
        }

  
      },(error=>{
  
      }))

    }
  }

  submitInputsheet()
  {

	if(this.flag=='Update')
	{
    this.ApiService.httpgetMaster("&Flag=CompletedInputSheetsNotSubmitted&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.ApiService.getUserId()+"&PID=11&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
      (response: any) => {
        console.log(response.data);
        const modalRef = this.modalService.open(ConfirmPopupComponent);
        modalRef.componentInstance.name = response.data[0].messageBox;
        modalRef.componentInstance.proposalCode=this.ProspectCode;
        modalRef.componentInstance.proposalType='System';
        //alert(response.data[0].messageBox)
      },
      (err) => {
      }
    );
	}
	else
	{
		this.ApiService.httpgetMaster("&Flag=CompletedProposal&ProspectCode=" + this.ProspectCode+"&CreatedBy="+this.ApiService.getUserId()+"&PID=11&IID="+this.IID+"", "/Proposal/submitInputsheet").subscribe(
			(response: any) => {
			  console.log(response.data);
			  // const modalRef = this.modalService.open(ConfirmPopupComponent);
			  // modalRef.componentInstance.name = response.data[0].messageBox;
			  // modalRef.componentInstance.proposalCode=this.ProspectCode;
			  // modalRef.componentInstance.proposalType='System';
			  //alert(response.data[0].messageBox)
			  this.router.navigate(['user/proposal']);
			},
			(err) => {
			}
		  );
	}

  }

  numberOnly(event:any, MaxNo:number): boolean {
	const charCode = (event.which) ? event.which : event.keyCode;

	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	if (event.currentTarget.value.length >= MaxNo) {
		return false;
	}
	return true;

}

public updateBOQ(product: any,incde:number) {

	if(incde!=-1 && incde!=1)
	{
		product.qty = incde;
	}
	else{
		product.qty = parseInt(product.qty+"") + incde;
	}

	  if (product.qty == 0) {
		product.qty = product.qty + 1;
	  }

	  this.objAddBoqEntity.boqItemDetailsID=product.boqItemDetailsID;
	  this.objAddBoqEntity.productCode=product.productCode;
	  this.objAddBoqEntity.productName = product.productName;
	  this.objAddBoqEntity.productDesc = product.productDesc;
	  this.objAddBoqEntity.qty = product.qty;
	  this.objAddBoqEntity.productPrice = product.productPrice;
	  this.objAddBoqEntity.productImage=product.productImage;
	  this.objAddBoqEntity.flag='Update';
	  this.objAddBoqEntity.status='Pending';
	  this.objAddBoqEntity.prospectCode=this.ProspectCode;
	  this.objAddBoqEntity.iid=this.IID;
	  this.objAddBoqEntity.productId=11;
	  this.objAddBoqEntity.createdBy=this.ApiService.getUserId()!.toString();
	  // this.objAddBoqEntity.unit = product.quantity;
	  // this.objAddBoqEntity.gst=product.gst;
	  this.objAddBoqEntity.productType='Standalone';
  
	  console.log(this.objAddBoqEntity)
	  this.ApiService.httpost(this.objAddBoqEntity,'/Proposal/saveUpdateDeleteBOQ')
	  .subscribe((res:any)=>{
		console.log(res);
		this.getBOQList();
  
	  },(error=>{
  
	  }))




	}

handleInputChangeQty(event: Event): void {}
}
