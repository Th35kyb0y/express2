import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit{
  public menuLoad: boolean = false;
 public _searchContent = ""
 products:number=0
 SparesCount:number=0
 VideoCounts:number=0
 PresentationsCounts:number=0
 BrochuresCounts:number=0
 TechspecCounts:number=0
	constructor(private _activatedroute: ActivatedRoute,private location:Location,
    private ApiService: ApiService,
	){

			const sub = this._activatedroute.queryParams
				.subscribe(async (params: any) => {
					
				
				this._searchContent = params["searchContent"];
				
				this.menuLoad = false;
				setTimeout(() => {
					this.menuLoad = true;
				}, 10);
				});

				this.ApiService.getSearchHeader().subscribe((res)=>{
					if(res){
						if(res){
							this._searchContent =  res;
						}
					}
				})

		}

		ngOnInit(): void {
			if(!this._searchContent){
				this.location.back()
			}
		}

		getProductCounts(val:number){
			this.products =  val;
		}
		getSparesCounts(val:number){
			this.SparesCount =  val;
		}
		getVideoCounts(val:number){this.VideoCounts=val}
		getPresentationsCounts(val:number){
			this.PresentationsCounts=val
		}
		getBrochuresCounts(val:number){this.BrochuresCounts=val}
		getTechspecCounts(val:number){this.TechspecCounts=val}


}
