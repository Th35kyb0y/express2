import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['./payment-link.component.scss']
})
export class PaymentLinkComponent implements OnInit{
  private _OrderSummary:any;
  _orderId:string =''
  constructor(private ApiService: ApiService,private route: ActivatedRoute,  private router :Router,){

  }
  get OrderSummary(){
    return this._OrderSummary;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      debugger
      this._orderId = params['order'];
      if(this._orderId){
        this.getOrderSummary();
      }

  });
    
   
  }

  getOrderSummary(){
 
      debugger
      let q =  '&orderId='+this._orderId
      this.ApiService.httpget(q,'/OrderMaster/getOrderDetailsByPaymentLink')
      .subscribe((res:any)=>{
         
        if(res.length>0){
  
          this._OrderSummary= res[0];
         
        }
      })
    }
    PayNow(){
      this.router.navigate(['/payment-init'], { queryParams: { paymentId: this._OrderSummary.orderNumber, orderId: this._OrderSummary.orderNumber } });
    }
  
}
