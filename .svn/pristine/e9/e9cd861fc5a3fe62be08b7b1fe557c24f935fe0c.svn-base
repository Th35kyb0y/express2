import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/CartService';
import { ToastService } from 'src/app/services/toast.service';
import { CSModelService } from 'src/app/view/cs/cs-model.service';
import { CSAPIPath } from 'src/app/view/CustomerSupportDashboard/cs-api-path';

@Component({
  selector: 'app-cs-prospects',
  templateUrl: './cs-prospects.component.html',
  styleUrls: ['./cs-prospects.component.scss']
})
export class CsProspectsComponent implements OnInit{
  ProspectCodeList:any=[];
  UserId:any;
  constructor(
    private router:Router,
    public ApiService: ApiService ,

    private toast:ToastService,
    private CartService :CartService,
		private modalService: NgbModal,
    public csModelService:CSModelService,
    private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    debugger
    const id = this.route.snapshot.paramMap.get('userId');
    console.log('ID from snapshot:', id);
    const sub = this.route.queryParams
			.subscribe(params => {
				
				if (params['userId']) {
            this.UserId =  params['userId'];
            this.getProspect()
        }

      })
  
  }

  getProspect(){
		let Q ='&userId='+ parseInt(this.UserId)
		this.ApiService.httpget(Q, CSAPIPath.GetUserProspects).subscribe(
			(response: any) => {

				this.ProspectCodeList= response.data;
			},
			(err) => {
			}
		);

    
	}
}
