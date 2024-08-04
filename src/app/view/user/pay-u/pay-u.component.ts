import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pay-u',
  templateUrl: './pay-u.component.html',
  styleUrls: ['./pay-u.component.scss']
})
export class PayUComponent implements OnInit ,OnChanges{
  @Input('paymentId') paymentId:string=''
  paymentData1 = {
    amount: '',
    productInfo: '',
    firstName: '',
    email: ''
  };
  paymentData = {
    amount: '10',
    productInfo: 'Express',
    firstName: 'Imran',
    email: 'mohdimran088@gmail.com',
    phone: '8800641189',
    udf1: 'A',
    udf2: 'B',
    udf3: 'C',
    udf4: 'D',
    udf5: 'E'
  };

  payuData: any = {};
isCallAPI:boolean =  true;
payURL:string='https://sandboxsecure.payu.in'
  constructor( private ApiService:ApiService,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    
    
    // this.route.queryParams.subscribe((params) => {
    //   this.paymentId = params['paymentId'];
     
    // });
 
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.paymentId){
    this.isCallAPI =  false;
    this.onSubmit();
    }
  }

  onSubmit() {
    
    if(!this.isCallAPI){
      let p ={paymentId:this.paymentId}
      //this.ApiService.httpost(p, "/UserMaster/InitiatePayment")
      //this.ApiService.httpost(this.paymentData, "/UserMaster/InitiatePayment2")
      let Q="&OrderNumber="+this.paymentId
      this.ApiService.httpget(Q, "/UserMaster/payNow")
      .subscribe((response:any) => {
        
        this.isCallAPI =  true;
        this.payuData = response.data;
        this.payURL = response.data.payURL
        setTimeout(() => {
          this.submitPayUForm();
        }, 100);
        //this.launchPayU(response.data);
      });
    }
   
  }

  submitPayUForm() {
    
    const form = document.getElementById('payuForm') as HTMLFormElement;
    if (form) {
      form.submit();
    }
  }

  launchPayU(payUData: any) {
    (window as any).bolt.launch({
      key: payUData.key,
      txnid: payUData.txnid,
      amount: payUData.amount,
      productinfo: payUData.productInfo,
      firstname: payUData.firstName,
      email: payUData.email,
      phone: payUData.phone,
      surl: payUData.surl,
      furl: payUData.furl,
      hash: payUData.hash,
      service_provider: payUData.serviceProvider,
    }, {
      responseHandler: (BOLT: any) => {
        if (BOLT.response.txnStatus !== 'CANCEL') {
          console.log('Payment Success:', BOLT.response);
        } else {
          console.log('Payment Failed/Cancelled:', BOLT.response);
        }
      },
      catchException: (BOLT: any) => {
        console.error('Error in PayU:', BOLT.message);
      }
    });
  }

}
