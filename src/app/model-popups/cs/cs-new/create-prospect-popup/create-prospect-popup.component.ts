import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Content, ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';
import { CSAPIPath } from 'src/app/view/CustomerSupportDashboard/cs-api-path';
import { ProductAPIPath } from 'src/app/view/products/product-api-path';

@Component({
  selector: 'app-create-prospect-popup',
  templateUrl: './create-prospect-popup.component.html',
  styleUrls: ['./create-prospect-popup.component.scss']
})
export class CreateProspectPopupComponent  implements OnInit{
  @Input() userId: any;
  @Input() companyName: string='';
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  //subscription!: Subscription
  collectins:any=[];
  collectins2:any=[];
  _products:any=[];
  _products_in_grid:any=[];
  pageIndex:number=0;
  pageSize:number=500;
  collectionId:any='';
  collectionId2:any='';
  obj:any={
    userId:null,
    companyName:null,
    pruducts:[],
  }
  IsShowLoader:boolean= false
  private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
  private _productFirstImage: string = '';
  isViewGrid:boolean=false;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ApiService:ApiService,
    private router:Router,) {
        
    this.getCategories();
  
    }
    ngOnInit(): void {
        this.obj.userId =  this.userId;
        this.obj.companyName =  this.companyName;
    }
  closeModal(msg:any) {
    this.activeModal.dismiss(msg);
  }
  getCategories() {
    this.ApiService.httpgetMaster("", CSRestAPIPath.GetCollectionForMenu).subscribe(
      (response: any) => {
        this.collectins = response.data
      },
      (err) => {
      }
    );
  }

  onSelectChangeCollection(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if(selectedValue){
        this.collectionId = selectedValue; 
      this.getLeftFilterCollections(selectedValue);
     // this.getProducts(selectedValue,'');
    }else{
      this.collectins2 = [];
      this.collectionId=''
      this.collectionId2=''
    }
    console.log('Selected value:', selectedValue);
  }
  onSelectChangeCollection2(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if(selectedValue){
      this.collectionId2=selectedValue
     // this.getProducts(this.collectionId,selectedValue);
    }else{
		this.collectionId2=''
    
    }
    console.log('Selected value:', selectedValue);
  }

  delete(item:any,index:number){
	this._products_in_grid.splice(index, 1);
  }
  AddToGrid(){
	const selectedProducts = this._products.filter((product:any) => product.selected);
	console.log('Selected products:', selectedProducts);
	if(selectedProducts.length>0){
		selectedProducts.forEach((e:any) => {
			if(!e.quantity){
				e.quantity=1;
			}
			let f = this._products_in_grid.filter((x:any)=>x.code==e.code);
			if(f.length==0){
				this._products_in_grid.push(e);
			}else{
				const index = this._products_in_grid.findIndex((user:any) => user.code === e.code);
				this._products_in_grid[index].quantity= e.quantity;
			}
		
		});
    alert("Added successfully");
    this.isViewGrid=!this.isViewGrid
		//this._products_in_grid =  this._products_in_grid.concat(selectedProducts);
	}else{
		alert("Please select products")
	}
	
  }
  ViewGrid(){

  }
  Search(){
	if(this.collectionId && this.collectionId2){
        this.getProducts(this.collectionId,this.collectionId2);
     } else if(this.collectionId){
        this.getProducts(this.collectionId,this.collectionId2);
     }else{
		this._products = []
	 }
  }
  getLeftFilterCollections(collectionId: any) {

		let Q = '&collectionIds=' + collectionId
		
		this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilterNew)
		.subscribe(
			(response: any) => {
				this.collectins2 = response.data;
			},
			(err) => {
			}
		);


	} 

  private getProducts(collectionId: any,collectionFilterIds:any) {
		
		
		let UserId=0;
        UserId = parseInt(this.userId+'');

		let params = {
			//  userName:'',
			collectionId: collectionId + '',
			searchString: '',
			collectionFilterIds: collectionFilterIds,
			
			appArea: '',
			page: this.pageIndex,
			size: this.pageSize,
			UserId:UserId
		}
		this.IsShowLoader= true;

		 this.ApiService.httpost(params, ProductAPIPath.getProductsByCollection).subscribe((result: any) => {
			
            let res = result.data;
            res.forEach((e:any) => {
                if(!e.selected){
                    e.selected=false;
                }
            });

			this._products = res;
			this.IsShowLoader= false;
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

  Submit(){
    debugger
    if(this._products_in_grid.length>0){

      let Products:any = [];
      this._products_in_grid.forEach((e:any) => {
        Products.push({
          ProductCode:e.code,
          Price:e.price+'',
          QTY:e.quantity
        })
      });

      const totalSum = this._products_in_grid.reduce((sum:any, item:any) => {
        return sum + (item.price * (item.quantity||1));
    }, 0);
      let postObj = {
        UserId:parseInt(this.userId+''),
        UserName:this.obj.companyName,
        EntryBy:this.ApiService.getCSEmpCode(),
        Expected_ClosureDate:'',
        Expected_ClosureValue:totalSum+'',
        Products:Products
      }

      this.ApiService.httpost(postObj, CSAPIPath.CreateProspect).subscribe((result: any) => {
			debugger
      alert("Prospect created successfully");
      this.closeModal('Dismissed')
    });


    }else{
      alert("Please add products");
    }
  }
   
}
