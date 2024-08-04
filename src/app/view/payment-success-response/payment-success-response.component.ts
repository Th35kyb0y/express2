import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment-success-response',
  templateUrl: './payment-success-response.component.html',
  styleUrls: ['./payment-success-response.component.scss']
})
export class PaymentSuccessResponseComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router:Router,private ApiService:ApiService) {}
  ngOnInit(): void {
    // Retrieve data from the route, e.g., payment ID, etc.
    this.route.queryParams.subscribe((params) => {
      
      const orderId = params['orderId'];
      if(orderId){
        let response = {
          orderNumber:orderId,
          paymentId:orderId,
        }
        this.handlePaymentSuccess(response);
      }
    });

  }

  handlePaymentSuccess(response: any): void {
    let obj ={
      paymentId:response.paymentId,
      orderNumber:response.orderNumber,
      UserId:0
    }
   
    window.localStorage.removeItem('cfx_app_cart');
    this.ApiService.httpost(obj, '/OrderMaster/payment-success').subscribe((data:any) => {
     
      
      this.router.navigate(['/user/payment-success'], { queryParams: { paymentId: response.paymentId, orderId: response.orderNumber } });
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    });
  }


}
