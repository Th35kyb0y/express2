import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss']
})
export class RatingReviewComponent implements OnInit {
  ratings:any=[];
  constructor( private ApiService:ApiService) { }

  ngOnInit(): void {
    this.getUserRatings();
  }

  getUserRatings(){

    let Q= "&UserId="+parseInt(this.ApiService.getUserId()+"");;
    this.ApiService.httpget(Q, "/UserMaster/GetUserRating").subscribe(
      (response: any) => {
       debugger
       this.ratings =  response.data;
      },
      (err) => {
      }
      );
  }

}

