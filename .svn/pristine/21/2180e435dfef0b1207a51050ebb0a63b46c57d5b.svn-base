import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cs-profile',
  templateUrl: './cs-profile.component.html',
  styleUrls: ['./cs-profile.component.scss',
  '../../../../../assets/CS/cs-new.scss'
  ]
})
export class CsProfileComponent implements OnInit {
 ;
	data:any = {};
  constructor( private router:Router,public ApiService: ApiService ){
    
  }

  ngOnInit(): void {
   this.data =  this.ApiService.getCSProfile()
  }
  
}
