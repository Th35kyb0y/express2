import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit{
  coupons:any=[];
  imtUrl = ""
  constructor(private ApiService: ApiService,){

  }
  ngOnInit(): void {
    this.imtUrl =  this.ApiService.getbaseURLEXP().replace('/api','/')
    this.getMyCoupons();
  }

  getMyCoupons(){
    let script  =  '&UserId='+this.ApiService.getUserId();
    this.ApiService.httpget(script,'/Coupons/UserCoupons').subscribe((res:any)=>{
this.coupons = res.data;
    })
  }
}
