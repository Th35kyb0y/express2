import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { CommonService } from 'src/app/services/common.service';

import { ProductAPIPath } from './product-api-path';
import { Content, ContentType, DiscountType, ProductDetails } from 'src/app/models/product/product';
import { ApplicationAreas, Collection } from 'src/app/models/collection/collection';
import { CSRestAPIPath } from 'src/app/services/collection/cs-restAPI-path';
import { MetatagsService } from 'src/app/services/metatags.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileProductFilterComponent } from 'src/app/model-popups/mobile-product-filter/mobile-product-filter.component';


@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	@ViewChild('productElement', { static: false })
	public productElement: ElementRef | undefined;
	isMobile: boolean = false;
	width: number = 0;
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {

		this.width = event.target.innerWidth;
		this.isMobile = this.width < 992;
	}
	private _collections: any[] = [];
	private _collectionsType: any[] = [];
	private _applicationareas: any[] = [];
	private _collectionsFilter: any[] = [];
	private collectionF: any[] = [];
	private collectionApplicationAreaF: any[] = [];

	toggleCollection: boolean = false;
	toggleApplicationArea: boolean = false;

	productContents: any[] = [];

	private _products: any = [];
	public totalCount: any = 0;
	public pageIndex = 1;
	public pageSize = 15;

	public _collectionId: number = 0;
	public _collectionIds: any = 0;

	_searchContent: string = ''
	public noOfProForInStock = 0;
	public IsLoaderLazy = false;
	public callOneByOne = 0;

	private _noProductImage: string = '../../assets/images/ccrm_no_image.png';
	private _productFirstImage: string = '';
	showLoaderBar: boolean = false;
	@HostListener('window:scroll') onScroll(e: Event): void {
		this.onScrollLoadProduct(e);
	}
	isProductsListBlank: boolean = false;
	constructor(private ApiService: ApiService,
		public route: ActivatedRoute,
		private router: Router,
		private CommonService: CommonService,
		private modalService: NgbModal,
		private meta: MetatagsService) {

		const sub = this.route.queryParams
			.subscribe(params => {
				this._products = [];
				if (params['catId']) {

					const array = params['catId'].split(',');
					if (array.length > 0) {
						this._collectionId = Number(array[0]);
					} else {
						this._collectionId = Number(params['catId']);
					}

					this._collectionIds = params['catId'];

				}
				this._searchContent = params["searchContent"];
				if (!params['catId']) {
					this.router.navigate(['']);
				}
			})
		//this.checkSerachParam();
		this.getLeftFilterCollections(this._collectionIds);
		this.getLeftFilterApplicationCollections(this._collectionId);


	}

	onScrollLoadProduct(e: any) {
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
			this.getProducts(Number(this._collectionId), false);

		}

	}


	openFilter() {

		const modalRef = this.modalService.open(MobileProductFilterComponent, {
			//size: "xl",
			centered: true,
			fullscreen: true,
			windowClass: 'xlModal-100'
		});
		modalRef.componentInstance.collectionType = this.collectionType;
		modalRef.componentInstance.collection = this.collection;
		modalRef.componentInstance.applicationareas = this.applicationareas;
		modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

			if (receivedEntry) {
				if (receivedEntry.c.length > 0 || receivedEntry.a.length > 0) {
					this.collectionF = receivedEntry.c;
					this.collectionApplicationAreaF = receivedEntry.a;
					this.getLeftFilterApplicationCollections(this._collectionId);
					this.filterProductList();
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

	private getProducts(collectionId: number, isLoadAllApplicationArea: boolean) {


		this.showLoaderBar = true;

		let searchString = "";
		if (this._searchContent != '' && this._searchContent != undefined) {
			searchString = this._searchContent;
		}

		let UserId = 0;
		if (this.ApiService.getUserId()) {
			UserId = parseInt(this.ApiService.getUserId() + '');
		}

		let params = {
			//  userName:'',
			collectionId: collectionId + '',
			searchString: searchString,
			collectionFilterIds: this.collectionF.join(','),
			//  categoriesSecondOnly:categoriesSecondOnly,
			//  categoriesThirdDistinctOnly:categoriesThirdDistinctOnly,
			//  categoriesSpareOnly:categoriesSpareOnly,
			appArea: this.collectionApplicationAreaF.join(','),
			//  ratings:ratings,
			//  productCertificate:certificateF,
			//  productWarranty:warrantyF,
			page: this.pageIndex,
			size: this.pageSize,
			UserId: UserId
		}

		this.getLeftFilterCollectionsIfTypeSelected(this.collectionF.join(','))
		this.ApiService.httpost(params, ProductAPIPath.getProductsByCollection)
			.subscribe((result: any) => {

				this.showLoaderBar = false;
				let res = result.data;
				if (res.length == 0) {
					this.callOneByOne = 2000;
					this.IsLoaderLazy = false;
					if (this.pageIndex == 0) {
						this.isProductsListBlank = true;
					}
				}

				if (res.length > 0) {
					res.forEach((item: any) => {
						item.addToCartText = 'Add To Cart'
						item.quantity = 0

					})
					this._products = this._products.concat(res);
					if (res.length > 0) {

						this.totalCount = res[0].totalCount

						if (this.totalCount == this._products.length) {
							this.callOneByOne = 2000;
							this.IsLoaderLazy = false;
						} else {
							this.callOneByOne = 0;
							this.IsLoaderLazy = false;
						}

					}
					else {
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
		this.meta.AddMetatagDescription("")
		this.meta.AddMetatagKeywords("")

		window.scrollTo({ top: 0 });
		this.bindLocalStorage();

		try {

			this.width = window.innerWidth;
			this.isMobile = this.width < 992;

		} catch (e) { }

	}


	filterCollections(e: any, id: number, name: string, cat: any,type:string) {

	
		if (e.target.checked) {
			this.collectionF.push(id);
			try {

				if (cat.children.length > 0) {
					cat.children.forEach((e: any) => {
						this.collectionF.push(e.collectionId);
					});
				}

			} catch (e) { }

			this._collectionsType.forEach(element => {
				if (element.collectionId == id) {
					element.isSelected = true;
				}
			});

			this._collections.forEach(element => {
				if (element.collectionId == id) {
					element.isSelected = true;
				}
			});


		}
		else {
			this._collectionsType.forEach(element => {
				if (element.collectionId == id) {
					element.isSelected = false;
					const index: number = this.collectionF.indexOf(element.collectionId);
					if (index !== -1) {
						this.collectionF.splice(index, 1);
					}

				}
			});
			this._collections.forEach(element => {
				if (element.collectionId == id) {
					element.isSelected = false;
					const index: number = this.collectionF.indexOf(element.collectionId);
					if (index !== -1) {
						this.collectionF.splice(index, 1);
					}

				}
			});
			try {

				if (cat.children.length > 0) {
					cat.children.forEach((e: any) => {
						const index: number = this.collectionF.indexOf(e.collectionId);
						if (index !== -1) {
							this.collectionF.splice(index, 1);
						}
					});
				}

			} catch (e) { }
			if(type=='Type'){
				let getcl = sessionStorage.getItem("collectionF Agent");
				if(getcl!=null){
					
					let cc =  JSON.parse(getcl);
					cc.forEach((parent:any) => {
						let filteredData =  this.collectionF.filter(
							(x=>x==parent.children.some((child: any) => child.collectionId) 
							|| parent.collectionId == x
						))
						if(filteredData.length>0){
							if(parent.collectionId == filteredData[0]){	
								if (parent.children.length > 0) {
									parent.children.forEach((e: any) => {
										this.collectionF.push(e.collectionId);
									});
								}
							}else{
								this.collectionF.push(parent.collectionId)
							}
						}
					}
					);
				}

				let ff = this._collectionsType.filter((x=>x.isSelected==true))
				if(ff.length==0){
					this.getLeftFilterCollections(this._collectionIds);
				}
				
			}
		}

		if (this.collectionApplicationAreaF.length > 0) {
			this.collectionApplicationAreaF = [];
			this._applicationareas.forEach((x => {
				x.isSelected = false;
			}))
			this.getLeftFilterApplicationCollections(this._collectionId);
		}

		const unique = this.collectionF.filter((value, index, array)=> {
			return array.indexOf(value) === index;
		  });
		  this.collectionF =   unique;
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
		this.pageIndex = 0;
		if (this._collectionId) {

			let isClear: boolean = false
			try {
				let lStorageData = localStorage.getItem('filterProduct');
				let filterProduct = JSON.parse(lStorageData != null ? lStorageData : "");
				if (filterProduct != "") {
					let _collectionId = filterProduct._collectionId;
					if (this._collectionId != _collectionId) {
						isClear = true
					}
				} else {
					isClear = false
				}
			} catch (e) {
				isClear = false
			}
			if (isClear) {
				localStorage.removeItem('filterProduct');

			}

			this.getProducts(Number(this._collectionId), false);
		}
		else {
			this.getProducts(Number(this._collectionId), false);
		}

	}



	get collection(): Collection[] {
		return this._collections;
	}
	get collectionType(): Collection[] {
		return this._collectionsType;
	}

	get applicationareas(): ApplicationAreas[] {
		return this._applicationareas;
	}

	get products(): ProductDetails[] {
		return this._products;
	}


	setCollections(res: any) {

		res.forEach((e: any) => {
			e.isSelected = this.collectionF.filter(item => {
				return item == e.collectionId
			}).length > 0 ? true : false;
			//e.isSelected =  false;
		});
		let Agent = res.filter((x: any) => x.showOnFilter == true);
		let Type = res.filter((x: any) => x.showOnType == true);
		this._collections = Agent;
		sessionStorage.setItem("collectionF Agent", JSON.stringify(Agent));
		console.log(Type);
		this._collectionsType = Type;
	}
	setApplicationAreaCollections(res: any) {
		res.forEach((e: any) => {
			e.isSelected = this.collectionApplicationAreaF.filter(item => {
				return item == e.applicationAreaId
			}).length > 0 ? true : false;
			//e.isSelected =  false;
		});
		this._applicationareas = res;
	}





	filterProductList() {

		this.pageIndex = 0;
		this._products = [];
		this.createLocalStorageForFilter();
		this.getProducts(Number(this._collectionId), false);
	}

	private createLocalStorageForFilter() {
		let filterProduct = {
			collectionF: this.collectionF,
			collectionApplicationAreaF: this.collectionApplicationAreaF,
			_collectionId: this._collectionId
		}
		localStorage.setItem('filterProduct', JSON.stringify(filterProduct));
	}

	getLeftFilterCollections(collectionId: any) {

		let Q = '&collectionIds=' + collectionId
		//this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilter)
		this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilterNew)
			.subscribe(
				(response: any) => {


					//this.categories = response.data;
					this.setCollections(response.data);
				},
				(err) => {
				}
			);


	}

	setCollectionIfFilters(dt: any) {
		
		let collectionF: any = [];
		this._collectionsType.forEach(element => {

			let ff = this.collectionF.filter((x => x == element.collectionId))
			if (ff.length > 0) {
				collectionF.push(ff[0]);
			}
		});
		sessionStorage.setItem("collectionF List", JSON.stringify(this.collectionF));
		let cc = sessionStorage.getItem("collectionF List");
		if (cc != null) {
			let bb = JSON.parse(cc);
			bb.forEach((e: any) => {
				let ff = dt.filter((x: any) => x.collectionId == e)
				if (ff.length > 0) {
					collectionF.push(ff[0].collectionId);
					if (ff[0].children.length > 0) {
						ff[0].children.forEach((e: any) => {
							collectionF.push(e.collectionId);

						});
					}
				}
			});
		}
		this.collectionF = [];
		this.collectionF = this.collectionF.concat(collectionF)
		this._collections.forEach(element => {
			element.noOfProduct = 0;
			element.children = [];
		});
		let getcl:any = sessionStorage.getItem("collectionF Agent");
				if(getcl==null){
					getcl  = this._collections;
				}else {
					getcl  = JSON.parse(getcl);
				}
		dt.forEach((element: any) => {
			const filteredData = getcl.filter((parent: any) =>
				parent.children.some((child: any) => child.collectionId === element.collectionId)
				|| parent.collectionId == element.collectionId
			);
			if (filteredData.length > 0) {
				const index = getcl.findIndex
					((parent: any) =>
						parent.children.some((child: any) => child.collectionId === element.collectionId)
						|| parent.collectionId == element.collectionId
					);
				if (index != -1) {
					let collectionFilters:any=[];
					if (cc != null) {
						 collectionFilters = JSON.parse(cc);
					}else{
						collectionFilters =  collectionF;
					}
					let isselected = collectionFilters.filter((x:any)=>filteredData[0].children.some((child: any) => child.collectionId === x)
					|| collectionFilters.collectionId == filteredData[0].collectionId);

					
					//let isselected = collectionFilters.filter((x:any)=>x==filteredData.collectionId);
					if(isselected.length>0){
						element.isSelected = true;
					}else{
						element.isSelected = false;
					}
					

					this._collections[index] = element;
				}

			}
		});

		this.createLocalStorageForFilter();
	}
	getLeftFilterCollectionsIfTypeSelected(collectionIds: string) {
		if (!collectionIds) {
			return;
		}
		let Q = '&collectionIds=' + collectionIds
		//this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilter)
		this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetCollectionForLeftFilterIfTypeSelected)
			.subscribe(
				(response: any) => {
					if (response.data.length > 0) {

						let dt = response.data;
						if (this._collections.length > 0) {
							this.setCollectionIfFilters(dt);
						} else {
							setTimeout(() => {
								this.setCollectionIfFilters(dt);
							}, 2000);
						}

					}
				},
				(err) => {
				}
			);


	}

	getLeftFilterApplicationCollections(collectionId: number) {

		let Q = '&collectionId=' + collectionId


		this.ApiService.httpgetMaster(Q, CSRestAPIPath.GetApplicationAreaCollectionForLeftFilter).subscribe(
			(response: any) => {


				//this.categories = response.data;
				this.setApplicationAreaCollections(response.data);
			},
			(err) => {
			}
		);

	}



	filterAppArea(e: any, id: number, applicationAreaId: any) {
		console.log("filterAppArea")
		if (e.target.checked) {
			this.collectionApplicationAreaF.push(applicationAreaId);
			this._applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
				x.isSelected = true;
			});

		} else {
			this._applicationareas.filter((item: any) => { return item.applicationAreaId == applicationAreaId }).forEach((x: any) => {
				x.isSelected = false;
			});
			const index: number = this.collectionApplicationAreaF.indexOf(applicationAreaId);
			if (index !== -1) {
				this.collectionApplicationAreaF.splice(index, 1);
			}
		}

		//this.collectionF = [];

		this._collections.forEach(element => {
			element.isSelected = false;
		});

		if (this.collectionF.length > 0) {
			this.collectionF = [];
			this._collections.forEach((x => {
				x.isSelected = false;
			}))
			this.getLeftFilterCollections(this._collectionIds);
		}

		this.filterProductList();
	}
	clearfilter(redirect = true) {
		this.collectionApplicationAreaF = [];
		this.collectionF = [];

		this._collections.forEach(element => {
			element.isSelected = false;
		});
		this._applicationareas.forEach(element => {
			element.isSelected = false;
		});
		this._collectionsType.forEach(element => {
			element.isSelected = false;
		});
		this.filterProductList();
	}

	checkSerachParam() {
		// this.route.queryParams
		//   .subscribe((params:any) => {
		//     console.log(params);
		//     this.products = [];
		//     this.search = params.search;

		//     if(Object.keys(params).length === 0){
		//       this.getCategories(false);
		//     }

		//     if(params.clearFilter == "true"){
		//       return;
		//     }

		//     if (this.search && this.search.length > 2) {
		//       this.clearfilter(false);
		//       this.getCategories(true);
		//     }
		//     if (this.search == "") {
		//       this.ApiService.gotoURL('/')
		//     }

		//     if(params.area){
		//       this.filter.area = params.area.split(",")
		//       this.getCategories(true);
		//     }
		//   });
	}

}
