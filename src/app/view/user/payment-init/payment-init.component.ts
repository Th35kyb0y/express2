import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-payment-init',
  templateUrl: './payment-init.component.html',
  styleUrls: ['./payment-init.component.scss']
})
export class PaymentInitComponent implements OnInit {
  url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl;
  host:string="";
  paymentId:string=''
  constructor(private route: ActivatedRoute,private router:Router,public sanitizer: DomSanitizer) {

    this.urlSafe = ''
  }
  ngOnInit(): void {
    debugger
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      this.host =  "http://"+location.host;
      //alert("It's a local server!"+location.hostname);
    }else{
      this.host =  location.host
     
    }
     

    this.route.queryParams.subscribe((params) => {
      debugger
      this.paymentId = params['paymentId'];
      console.log( this.paymentId+" this.paymentId")
     
    });
    this.host = this.host+"/user/pay?paymentId="+this.paymentId;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.host);
    //this.urlSafe= this.host;
 
  }




}
