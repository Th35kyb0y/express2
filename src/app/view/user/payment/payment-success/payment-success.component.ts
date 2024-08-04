import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    // Retrieve data from the route, e.g., payment ID, etc.
    this.route.queryParams.subscribe((params) => {
      const paymentId = params['paymentId'];
      const orderId = params['orderId'];

      // You can now use paymentId and orderId to display information or perform additional actions
      console.log('Payment ID:', paymentId);
      console.log('Order ID:', orderId);
    });

    setTimeout(() => {
      this.continue();
    }, 2000);
  }

  continue(){
this.router.navigate(['/'])
  }


}
