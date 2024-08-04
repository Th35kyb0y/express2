import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentType } from 'src/app/models/product/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductSearchAPIPath } from '../product-search-api-path';


@Component({
  selector: 'app-search-tab-videos',
  templateUrl: './search-tab-videos.component.html',
  styleUrls: ['./search-tab-videos.component.scss']
})
export class SearchTabVideosComponent implements OnInit,OnChanges {
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  currentPlayingIndex: number | null = null;
  @Input() searchContent!: string;
  @Output() videoCount = new EventEmitter<number>();
 
  IsLoader:boolean = false;
  private _productsVideos:any=[];
  constructor(private _router: Router, 
    private ApiService: ApiService,
    private _activatedroute: ActivatedRoute){

    }

    onPlay(videoElement: HTMLVideoElement, index: number): void {
      // Pause any currently playing video
      if (this.currentPlayingIndex !== null && this.currentPlayingIndex !== index) {
        const currentlyPlayingVideo = this.videoPlayers.toArray()[this.currentPlayingIndex].nativeElement;
        currentlyPlayingVideo.pause();
      }
  
      // Update the current playing index
      this.currentPlayingIndex = index;
  
      // Add event listener to clear current playing index when video ends
      videoElement.onended = () => {
        this.currentPlayingIndex = null;
      };
    }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.searchContent){
      this.getSearchProduct(this.searchContent)
     
    }
  }
  ngOnInit(): void {
    this.videoCount.emit(this.ProductVideos.length);
  }

  get ProductVideos(){

    return this._productsVideos;
  }
  getSearchProduct(value:any){
    
    value =  value.trim('');
    if(value){
 	    //this.IsLoader =  true;
     if(value.length>2){
      let se = value;
      let params = {
        searchContent:se,
        collectionId:ContentType.VideoLinks,
       flag:'',
     }
     
      this.ApiService.httpost(params, ProductSearchAPIPath.GetProductsVideosBySearch)
      .subscribe((res:any) => {
        debugger
        
         if (res != null) {
         
          this._productsVideos = res.data;
          this.videoCount.emit(this.ProductVideos.length);
		      //this.IsLoader =  false;
         
		
           
   
         }
       });
     }
 
    }
 
  }

}
